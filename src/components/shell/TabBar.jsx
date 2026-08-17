import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { files } from "../../data/portfolioData";
import { FileTypeIcon } from "../icons";
import { useIDE } from "../../contexts/IDEContext";

export default function TabBar() {
  const { openTabs, closeTab } = useIDE();
  
  const activeFiles = files.filter(f => openTabs.includes(f.path));

  return (
    <div className="tabbar">
      {activeFiles.map((file) => (
        <NavLink
          key={file.id}
          to={file.path}
          end={file.path === "/"}
          className={({ isActive }) => `tab ${isActive ? "tab--active" : ""}`}
        >
          <FileTypeIcon type={file.icon} size={13} />
          {file.label}
          <div className="tab__close-btn" onClick={(e) => closeTab(file.path, e)}>
            <X size={12} className="tab__close" />
          </div>
        </NavLink>
      ))}
    </div>
  );
}
