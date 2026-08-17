import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { files } from "../../data/portfolioData";
import { FileTypeIcon } from "../icons";

export default function TabBar() {
  return (
    <div className="tabbar">
      {files.map((file) => (
        <NavLink
          key={file.id}
          to={file.path}
          end={file.path === "/"}
          className={({ isActive }) => `tab ${isActive ? "tab--active" : ""}`}
        >
          <FileTypeIcon type={file.icon} size={13} />
          {file.label}
          <X size={12} className="tab__close" />
        </NavLink>
      ))}
    </div>
  );
}
