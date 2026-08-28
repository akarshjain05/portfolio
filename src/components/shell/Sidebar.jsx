import { NavLink } from "react-router-dom";
import { Sparkles, Settings } from "lucide-react";
import { files, repoName } from "../../data/portfolioData";
import { FileTypeIcon } from "../icons";
import { useIDE } from "../../contexts/IDEContext";

export default function Sidebar({ open, onNavigate }) {
  const { toggleCopilot } = useIDE();
  return (
    <>
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
        <div className="sidebar__header">{repoName.toUpperCase()}</div>
        <nav className="sidebar__list">
          {files.map((file) => {
            if (file.isDownload) {
              return (
                <a
                  key={file.id}
                  href={file.downloadUrl}
                  download={file.label}
                  className="sidebar__item"
                >
                  <span className="sidebar__icon">
                    <FileTypeIcon type={file.icon} />
                  </span>
                  <span className="sidebar__label">{file.label}</span>
                </a>
              );
            }
            return (
              <NavLink
                key={file.id}
                to={file.path}
                end={file.path === "/"}
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onNavigate();
                  }
                }}
                className={({ isActive }) =>
                  `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
                }
              >
                <span className="sidebar__icon">
                  <FileTypeIcon type={file.icon} />
                </span>
                <span className="sidebar__label">{file.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <div className="sidebar__copilot" onClick={toggleCopilot} style={{cursor: 'pointer'}}>
          <Sparkles size={14} color="#b794f6" />
          <span>Akarsh&rsquo;s Copilot</span>
          <span className="sidebar__copilot-badge">AI</span>
        </div>

      </aside>
      <div
        className={`sidebar__overlay ${open ? "sidebar__overlay--visible" : ""}`}
        onClick={onNavigate}
        aria-hidden="true"
      />
    </>
  );
}
