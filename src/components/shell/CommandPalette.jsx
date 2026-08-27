import { useState, useRef, useEffect } from "react";
import { useIDE } from "../../contexts/IDEContext";
import { Search, Sparkles } from "lucide-react";
import { files } from "../../data/portfolioData";
import { FileTypeIcon } from "../icons";

export default function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette, openTab, toggleCopilot } = useIDE();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (commandPaletteOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery("");
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const filteredFiles = files.filter(
    (f) =>
      f.label.toLowerCase().includes(query.toLowerCase()) ||
      f.path.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (file) => {
    if (file.isDownload) {
      const link = document.createElement("a");
      link.href = file.downloadUrl;
      link.download = file.label;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      openTab(file.path);
    }
    toggleCommandPalette();
  };

  return (
    <div className="palette-overlay" onClick={toggleCommandPalette}>
      <div
        className="palette-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="palette-input-row">
          <span className="palette-prompt">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className="palette-input"
            placeholder="Go to file or run command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="palette-esc">Esc</span>
        </div>

        <div className="palette-content">
          <div className="palette-section-title">COMMANDS</div>
          <div className="palette-item palette-item--highlight" onClick={() => {
            toggleCopilot();
            toggleCommandPalette();
          }}>
            <Sparkles size={14} color="#b794f6" />
            <span>Open Akarsh&apos;s Copilot</span>
            <span className="palette-shortcut">Ctrl+Shift+C</span>
          </div>

          <div className="palette-section-title">FILES</div>
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="palette-item"
              onClick={() => handleSelect(file)}
            >
              <FileTypeIcon type={file.icon} />
              <span>{file.label}</span>
              <span className="palette-path">{file.path.split('/').filter(Boolean)[0] || 'src'}/</span>
            </div>
          ))}
          {filteredFiles.length === 0 && (
            <div className="palette-empty">No matching results</div>
          )}
        </div>
        
        <div className="palette-footer">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>Esc close</span>
          <span style={{ marginLeft: "auto" }}>Tip: type "copilot" to open AI chat</span>
        </div>
      </div>
    </div>
  );
}
