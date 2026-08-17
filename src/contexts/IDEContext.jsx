import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { files } from "../data/portfolioData";

const IDEContext = createContext(null);

export function IDEProvider({ children }) {
  // Initialize with all files open by default, mimicking standard IDE startup behavior
  const [openTabs, setOpenTabs] = useState(() => files.map(f => f.path));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure current location is always in open tabs
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath !== "*" && currentPath !== "/empty" && !openTabs.includes(currentPath)) {
      // Validate it's a known file
      if (files.some(f => f.path === currentPath)) {
        setOpenTabs(prev => [...prev, currentPath]);
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

  return (
    <IDEContext.Provider
      value={{
        openTabs,
        openTab,
        closeTab,
        closeAllTabs,
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        terminalOpen,
        setTerminalOpen,
        toggleTerminal
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
