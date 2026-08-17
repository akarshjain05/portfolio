import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { files } from "../data/portfolioData";

const IDEContext = createContext(null);

export function IDEProvider({ children }) {
  // Initialize with all files open by default, mimicking standard IDE startup behavior
  const [openTabs, setOpenTabs] = useState(() => files.map(f => f.path));
  const [recentFiles, setRecentFiles] = useState(() => files.map(f => f.path));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure current location is always in open tabs and recent files
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath !== "*" && currentPath !== "/empty") {
      if (files.some(f => f.path === currentPath)) {
        if (!openTabs.includes(currentPath)) {
          setOpenTabs(prev => [...prev, currentPath]);
        }
        setRecentFiles(prev => {
          const filtered = prev.filter(p => p !== currentPath);
          return [currentPath, ...filtered].slice(0, 5); // Keep top 5 recent
        });
      }
    }
  }, [location.pathname, openTabs]);

  const openTab = useCallback((path) => {
    if (!openTabs.includes(path)) {
      setOpenTabs(prev => [...prev, path]);
    }
    navigate(path);
  }, [openTabs, navigate]);

  const closeTab = useCallback((path, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    
    setOpenTabs(prev => {
      const newTabs = prev.filter(p => p !== path);
      
      // If closing the active tab, navigate to the adjacent one
      if (location.pathname === path) {
        if (newTabs.length > 0) {
          const closedIndex = prev.indexOf(path);
          // Prefer navigating to the left, fallback to right
          const nextIndex = closedIndex > 0 ? closedIndex - 1 : 0;
          navigate(newTabs[nextIndex]);
        } else {
          navigate("/empty");
        }
      }
      
      return newTabs;
    });
  }, [location.pathname, navigate]);

  const closeAllTabs = useCallback(() => {
    setOpenTabs([]);
    navigate("/empty");
  }, [navigate]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(v => !v);
  }, []);

  const toggleTerminal = useCallback(() => {
    setTerminalOpen(v => !v);
  }, []);

  const toggleCommandPalette = useCallback(() => {
    setCommandPaletteOpen(v => !v);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Ctrl+P or Cmd+P
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        toggleCommandPalette();
      }
      // Esc to close palette
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [toggleCommandPalette]);

  return (
    <IDEContext.Provider
      value={{
        openTabs,
        recentFiles,
        openTab,
        closeTab,
        closeAllTabs,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        terminalOpen,
        setTerminalOpen,
        toggleTerminal,
        commandPaletteOpen,
        setCommandPaletteOpen,
        toggleCommandPalette
      }}
    >
      {children}
    </IDEContext.Provider>
  );
}

export function useIDE() {
  const context = useContext(IDEContext);
  if (!context) {
    throw new Error("useIDE must be used within an IDEProvider");
  }
  return context;
}
