import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GitBranch, RefreshCw, AlertTriangle, Sparkles, Clock, Palette } from "lucide-react";
import { repoName } from "../../data/portfolioData";
import useClock from "../../hooks/useClock";
import { useIDE } from "../../contexts/IDEContext";
import { useActiveFile } from "../../hooks/useActiveFile";
import ThemePicker, { THEMES } from "../ThemePicker";

export default function StatusBar() {
  const time = useClock();
  const { toggleCopilot, theme } = useIDE();
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
  
  const { activeFile } = useActiveFile();

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
        <span className="statusbar__item">{activeFile.lang}</span>
        <span className="statusbar__item statusbar__hide-xs">UTF-8</span>
        <span className="statusbar__item statusbar__hide-sm">Prettier</span>
        
        <div style={{ position: "relative" }} ref={themeMenuRef}>
          <span 
            className="statusbar__item statusbar__hide-xs" 
            style={{ color: "#ffffff", cursor: "pointer" }}
            onClick={() => setThemePickerOpen(!themePickerOpen)}
          >
            {currentTheme.icon} {currentTheme.name}
          </span>
          
          {themePickerOpen && (
            <div className="settings-menu" style={{ bottom: "100%", right: "0", left: "auto", marginBottom: "5px", width: "200px" }}>
              <div className="settings-menu__group">
                <div className="settings-menu__title">COLOR THEME</div>
                <ThemePicker onSelect={() => setThemePickerOpen(false)} />
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
