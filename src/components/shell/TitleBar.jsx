import { repoName } from "../../data/portfolioData";

export default function TitleBar() {
  return (
    <div className="titlebar">
      <div className="titlebar__dots">
        <span className="titlebar__dot titlebar__dot--red" />
        <span className="titlebar__dot titlebar__dot--yellow" />
        <span className="titlebar__dot titlebar__dot--green" />
      </div>
      <div className="titlebar__title">{repoName} — Akarsh</div>
      <div className="titlebar__spacer" />
    </div>
  );
}
