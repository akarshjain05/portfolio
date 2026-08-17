import { repoName } from "../../data/portfolioData";
import { Search } from "lucide-react";
import { useIDE } from "../../contexts/IDEContext";

export default function TitleBar() {
  const { toggleCommandPalette } = useIDE();
  return (
    <div className="titlebar">
      <div className="titlebar__dots">
        <span className="titlebar__dot titlebar__dot--red" />
        <span className="titlebar__dot titlebar__dot--yellow" />
        <span className="titlebar__dot titlebar__dot--green" />
      </div>
      <div className="titlebar__search-container" onClick={toggleCommandPalette}>
        <Search size={13} />
        <span>{repoName} :portfolio</span>
        <span className="titlebar__kbd">
          <kbd>Ctrl</kbd>
          <kbd>P</kbd>
        </span>
      </div>
      <div className="titlebar__spacer" />
    </div>
  );
}
