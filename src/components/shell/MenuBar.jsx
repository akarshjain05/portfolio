import { useState, useRef, useEffect } from "react";
import { useIDE } from "../../contexts/IDEContext";
import { useLocation } from "react-router-dom";
import { profile, socials, files } from "../../data/portfolioData";

export default function MenuBar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const { openTab, closeTab, closeAllTabs, toggleSidebar, toggleTerminal, recentFiles, toggleCommandPalette } = useIDE();
  const { pathname } = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (item) => {
    if (activeMenu === item) {
      setActiveMenu(null);
    } else {
      setActiveMenu(item);
    }
  };

  const executeAction = (action) => {
    action();
    setActiveMenu(null);
  };

  const MENUS = {
    File: [
      { label: "New File", shortcut: "Ctrl+N", action: () => openTab("/") },
      { label: "Open File...", shortcut: "Ctrl+P", action: () => toggleCommandPalette() },
      { divider: true },
      ...recentFiles.map(rf => {
        const fileObj = files.find(f => f.path === rf);
        return { label: `Open Recent: ${fileObj ? fileObj.label : rf}`, action: () => openTab(rf) };
      }),
      { divider: true },
      { label: "Close Tab", shortcut: "Ctrl+W", action: () => closeTab(pathname) },
      { label: "Close All Tabs", action: () => closeAllTabs() },
      { divider: true },
      { label: "Download Resume", action: () => window.open(profile.resumeUrl, "_blank") },
    ],
    Edit: [
      { label: "Undo", shortcut: "Ctrl+Z", action: () => {} },
      { label: "Redo", shortcut: "Ctrl+Y", action: () => {} },
      { divider: true },
      { label: "Cut", shortcut: "Ctrl+X", action: () => {} },
      { label: "Copy", shortcut: "Ctrl+C", action: () => {} },
      { label: "Paste", shortcut: "Ctrl+V", action: () => {} },
    ],
    View: [
      { label: "Command Palette", shortcut: "Ctrl+P", action: () => toggleCommandPalette() },
      { divider: true },
      { label: "Toggle Sidebar", shortcut: "Ctrl+B", action: () => toggleSidebar() },
      { label: "Toggle Terminal", shortcut: "Ctrl+`", action: () => toggleTerminal() },
      { divider: true },
      { label: "Enter Full Screen", shortcut: "F11", action: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }},
    ],
    Go: [
      { label: "Go to Home", action: () => openTab("/") },
      { label: "Go to About", action: () => openTab("/about") },
      { label: "Go to Projects", action: () => openTab("/projects") },
      { label: "Go to Skills", action: () => openTab("/skills") },
      { label: "Go to Contact", action: () => openTab("/contact") },
      { label: "Go to Readme", action: () => openTab("/readme") },
    ],
    Run: [
      { label: "Start Terminal", action: () => toggleTerminal() },
      { label: "Run Build Task", shortcut: "Ctrl+Shift+B", action: () => toggleTerminal() },
    ],
    Terminal: [
      { label: "New Terminal", shortcut: "Ctrl+Shift+`", action: () => toggleTerminal() },
    ],
    Help: [
      { label: "Welcome", action: () => openTab("/") },
      { label: "About Author", action: () => window.open(socials.find(s => s.name === "GitHub")?.url, "_blank") },
    ],
  };

  return (
    <div className="menubar" ref={menuRef}>
      {Object.keys(MENUS).map((item) => (
        <div key={item} style={{ position: "relative" }}>
          <span
            className={`menubar__item ${activeMenu === item ? "menubar__item--active" : ""}`}
            onClick={() => handleMenuClick(item)}
            onMouseEnter={() => activeMenu && setActiveMenu(item)}
          >
            {item}
          </span>
          {activeMenu === item && (
            <div className="menu-dropdown">
              {MENUS[item].map((menuItem, idx) =>
                menuItem.divider ? (
                  <div key={`div-${idx}`} className="menu-divider" />
                ) : (
                  <div
                    key={menuItem.label}
                    className="menu-option"
                    onClick={() => executeAction(menuItem.action)}
                  >
                    <span>{menuItem.label}</span>
                    {menuItem.shortcut && <span className="menu-shortcut">{menuItem.shortcut}</span>}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
