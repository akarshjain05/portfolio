import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GitBranch, RefreshCw, AlertTriangle, Sparkles, Clock, Palette } from "lucide-react";
import { files, repoName } from "../../data/portfolioData";
import useClock from "../../hooks/useClock";
import { useIDE } from "../../contexts/IDEContext";

const THEMES = [
  { id: "akarsh-dark", name: "Akarsh Dark", icon: "💜" },
  { id: "midnight-hacker", name: "Midnight Hacker", icon: "💻" },
  { id: "crimson-forge", name: "Crimson Forge", icon: "🔥" },
  { id: "cobalt-blue", name: "Cobalt Blue", icon: "🌊" },
  { id: "amethyst", name: "Amethyst", icon: "🔮" }
];

export default function StatusBar() {
  const { pathname } = useLocation();
  const time = useClock();
  const { toggleCopilot, theme, setTheme } = useIDE();
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const themeMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setThemePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const active =
    files.find((f) => (f.path === "/" ? pathname === "/" : pathname.startsWith(f.path))) ||
    files[0];

  const currentTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div className="statusbar">
      <div className="statusbar__side">
        <span className="statusbar__item">
          <AlertTriangle size={12} />0
        </span>
        <span className="statusbar__item statusbar__hide-xs">
          <GitBranch size={12} />
          main
        </span>
        <span className="statusbar__item statusbar__hide-sm">
          <RefreshCw size={12} />
        </span>
        <span className="statusbar__item statusbar__hide-sm">Akarsh&rsquo;s Portfolio</span>
      </div>
      <div className="statusbar__side">
        <span className="statusbar__item statusbar__hide-sm" onClick={toggleCopilot} style={{ cursor: 'pointer' }}>
          <Sparkles size={12} />
          Copilot
        </span>
        <span className="statusbar__item">{active.lang}</span>
        <span className="statusbar__item statusbar__hide-xs">UTF-8</span>
        <span className="statusbar__item statusbar__hide-sm">Prettier</span>
        
        <div style={{ position: "relative" }} ref={themeMenuRef}>
          <span 
            className="statusbar__item statusbar__hide-xs" 
            style={{ color: "var(--purple)", cursor: "pointer" }}
            onClick={() => setThemePickerOpen(!themePickerOpen)}
          >
            {currentTheme.icon} {currentTheme.name}
          </span>
          
          {themePickerOpen && (
            <div className="settings-menu" style={{ bottom: "100%", right: "0", left: "auto", marginBottom: "5px", width: "200px" }}>
              <div className="settings-menu__group">
                <div className="settings-menu__title">COLOR THEME</div>
                {THEMES.map(t => (
                  <button 
                    key={t.id} 
                    className={`settings-menu__item ${theme === t.id ? "active" : ""}`}
                    onClick={() => { setTheme(t.id); setThemePickerOpen(false); }}
                  >
                    <div className={`theme-circle theme-circle--${t.id}`}></div>
                    <span>{t.icon} {t.name}</span>
                    {theme === t.id && <span className="settings-menu__check">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <span className="statusbar__item">
          <Clock size={12} />
          {time}
        </span>
      </div>
    </div>
  );
}
