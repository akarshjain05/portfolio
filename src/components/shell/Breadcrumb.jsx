import { ChevronRight } from "lucide-react";
import { repoName } from "../../data/portfolioData";
import { useActiveFile } from "../../hooks/useActiveFile";

export default function Breadcrumb() {
  const { activeFile } = useActiveFile();

  const crumbs = [repoName, "src", "pages", activeFile.label];

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
