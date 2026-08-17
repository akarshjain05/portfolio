import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { files, repoName } from "../../data/portfolioData";

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const active =
    files.find((f) => (f.path === "/" ? pathname === "/" : pathname.startsWith(f.path))) ||
    files[0];

  const crumbs = [repoName, "src", "pages", active.label];

  return (
    <div className="breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={crumb + i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <ChevronRight size={11} />}
          <span>{crumb}</span>
        </span>
      ))}
    </div>
  );
}
