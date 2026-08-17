import { Search } from "lucide-react";
import { repoName } from "../../data/portfolioData";

export default function CommandBar() {
  return (
    <div className="commandbar">
      <div className="commandbar__pill">
        <Search size={13} />
        <span>
          {repoName} : portfolio
        </span>
        <span className="commandbar__kbd">
          <kbd>Ctrl</kbd>
          <kbd>P</kbd>
        </span>
      </div>
    </div>
  );
}
