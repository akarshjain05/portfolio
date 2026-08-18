import { useState, useRef, useEffect } from "react";
import { Files, Search, GitBranch, Sparkles, Settings, Palette, Command, TerminalSquare, Maximize } from "lucide-react";
import { useIDE } from "../../contexts/IDEContext";

const THEMES = [
  { id: "akarsh-dark", name: "Akarsh Dark", icon: "💜" },
  { id: "midnight-hacker", name: "Midnight Hacker", icon: "💻" },
  { id: "crimson-forge", name: "Crimson Forge", icon: "🔥" },
  { id: "cobalt-blue", name: "Cobalt Blue", icon: "🌊" },
  { id: "amethyst", name: "Amethyst", icon: "🔮" }
];

export default function ActivityBar({ sidebarOpen, onToggleSidebar }) {
  const { toggleCommandPalette, copilotOpen, toggleCopilot, toggleTerminal, theme, setTheme } = useIDE();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setSettingsOpen(false);
  };

  return (
    <div className="activitybar">
      <button
        type="button"
        className={`activitybar__btn ${sidebarOpen ? "activitybar__btn--active" : ""}`}
        onClick={onToggleSidebar}
        aria-label="Toggle file explorer"
        aria-pressed={sidebarOpen}
      >
        <Files size={19} />
      </button>
      <button 
        type="button" 
        className="activitybar__btn" 
        onClick={toggleCommandPalette}
        aria-label="Search" 
        tabIndex={-1}
      >
        <Search size={19} />
      </button>
      <button type="button" className="activitybar__btn" aria-label="Source control" tabIndex={-1}>
        <GitBranch size={19} />
      </button>
      <button 
        type="button" 
        className={`activitybar__btn ${copilotOpen ? "activitybar__btn--active" : ""}`}
        onClick={toggleCopilot}
        aria-label="Copilot" 
        tabIndex={-1}
      >
        <Sparkles size={19} />
      </button>
      <div className="activitybar__spacer" />
      
      <div className="activitybar__settings-container" ref={menuRef}>
        <button 
          type="button" 
          className={`activitybar__btn ${settingsOpen ? "activitybar__btn--active" : ""}`}
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-label="Settings" 
          tabIndex={-1}
        >
          <Settings size={19} />
        </button>

        {settingsOpen && (
          <div className="settings-menu">
            <div className="settings-menu__group">
              <div className="settings-menu__title">🎨 COLOR THEME</div>
              {THEMES.map(t => (
                <button 
                  key={t.id} 
                  className={`settings-menu__item ${theme === t.id ? "active" : ""}`}
                  onClick={() => { setTheme(t.id); setSettingsOpen(false); }}
                >
                  <div className={`theme-circle theme-circle--${t.id}`}></div>
                  <span>{t.icon} {t.name}</span>
                  {theme === t.id && <span className="settings-menu__check">✓</span>}
                </button>
              ))}
            </div>

            <div className="settings-menu__group">
              <div className="settings-menu__title">⚡ QUICK ACTIONS</div>
              <button className="settings-menu__item" onClick={() => { toggleCommandPalette(); setSettingsOpen(false); }}>
                <Command size={14} /> Command Palette <span className="settings-menu__shortcut">Ctrl+P</span>
              </button>
              <button className="settings-menu__item" onClick={() => { toggleTerminal(); setSettingsOpen(false); }}>
                <TerminalSquare size={14} /> Toggle Terminal <span className="settings-menu__shortcut">Ctrl+`</span>
              </button>
              <button className="settings-menu__item" onClick={() => { toggleCopilot(); setSettingsOpen(false); }}>
                <Sparkles size={14} /> Copilot Chat
              </button>
              <button className="settings-menu__item" onClick={toggleFullscreen}>
                <Maximize size={14} /> Toggle Fullscreen <span className="settings-menu__shortcut">F11</span>
              </button>
            </div>

            <div className="settings-menu__group settings-menu__footer">
              <div className="settings-menu__title">⌨ KEYBOARD SHORTCUTS</div>
              <div className="settings-shortcut"><span className="key">Ctrl P</span> Go to file (command palette)</div>
              <div className="settings-shortcut"><span className="key">Ctrl `</span> Toggle terminal</div>
              <div className="settings-shortcut"><span className="key">Ctrl B</span> Toggle sidebar</div>
              <div className="settings-shortcut"><span className="key">Esc</span> Close overlay</div>
            </div>
            
            <div className="settings-menu__credit">
              Portfolio v1.0 • React + Vite<br />
              Made with 💜 by <b>Akarsh Jain</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
