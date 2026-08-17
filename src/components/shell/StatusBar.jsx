import { useLocation } from "react-router-dom";
import { GitBranch, RefreshCw, AlertTriangle, Sparkles, Clock } from "lucide-react";
import { files, repoName } from "../../data/portfolioData";
import useClock from "../../hooks/useClock";

export default function StatusBar() {
  const { pathname } = useLocation();
  const time = useClock();
  const active =
    files.find((f) => (f.path === "/" ? pathname === "/" : pathname.startsWith(f.path))) ||
    files[0];

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
        <span className="statusbar__item statusbar__hide-sm">
          <Sparkles size={12} />
          Copilot
        </span>
        <span className="statusbar__item">{active.lang}</span>
        <span className="statusbar__item statusbar__hide-xs">UTF-8</span>
        <span className="statusbar__item statusbar__hide-sm">Prettier</span>
        <span className="statusbar__item statusbar__hide-xs">{repoName} Dark</span>
        <span className="statusbar__item">
          <Clock size={12} />
          {time}
        </span>
      </div>
    </div>
  );
}
