import { useState, useRef, useEffect } from "react";
import { useIDE } from "../../contexts/IDEContext";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const { openTab, closeTab, closeAllTabs, toggleSidebar, toggleTerminal } = useIDE();
  const navigate = useNavigate();

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
      { label: "Close Tab", shortcut: "Ctrl+W", action: () => closeTab(window.location.pathname) },
      { label: "Close All Tabs", action: () => closeAllTabs() },
      { divider: true },
      { label: "Download Resume", action: () => window.open("https://akarshjain05.github.io/portfolio/Aahana_Bobade_Resume.pdf", "_blank") },
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
      { label: "About Author", action: () => window.open("https://github.com/akarshjain05", "_blank") },
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
