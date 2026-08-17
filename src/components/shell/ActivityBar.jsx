import { Files, Search, GitBranch, Sparkles, Settings } from "lucide-react";

// Only "Explorer" is wired to something real (it toggles the sidebar,
// which matters on small screens). The rest mirror a real editor's
// activity bar for the theme, same as the menu bar above.
export default function ActivityBar({ sidebarOpen, onToggleSidebar }) {
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
      <button type="button" className="activitybar__btn" aria-label="Search" tabIndex={-1}>
        <Search size={19} />
      </button>
      <button type="button" className="activitybar__btn" aria-label="Source control" tabIndex={-1}>
        <GitBranch size={19} />
      </button>
      <button type="button" className="activitybar__btn" aria-label="Copilot" tabIndex={-1}>
        <Sparkles size={19} />
      </button>
      <div className="activitybar__spacer" />
      <button type="button" className="activitybar__btn" aria-label="Settings" tabIndex={-1}>
        <Settings size={19} />
      </button>
    </div>
  );
}
