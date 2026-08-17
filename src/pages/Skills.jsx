import { useEffect } from "react";
import { skillGroups } from "../data/portfolioData";
import SkillBar from "../components/SkillBar";

const GROUP_COLORS = [
  "#5eead4", // Languages — cyan
  "#b794f6", // AI & Agentic Systems — purple
  "#60a5fa", // Backend & APIs — blue
  "#f87171", // Security — red
  "#fb923c", // DevOps & Tools — orange
  "#4ade80", // Competitive Programming — green
];

export default function Skills() {
  useEffect(() => {
    document.title = "skills.json : portfolio";
  }, []);

  return (
    <div className="page">
      <span className="comment">// skills.json — tech stack &amp; tools I actually use</span>
      <h1 className="page-title" style={{ marginBottom: 14 }}>
        Skills
      </h1>
      <p className="skills-intro">
        {"{ "}
        <span className="k">&quot;status&quot;</span>: <span className="v">&quot;always_learning&quot;</span>,{" "}
        <span className="k">&quot;passion&quot;</span>: <span className="v">&quot;immeasurable&quot;</span>
        {" }"}
      </p>

      <div className="skill-grid">
        {skillGroups.map((group, i) => (
          <div key={group.title}>
            <h2 className="skill-group__title">{group.title.toUpperCase()}</h2>
            {group.skills.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={GROUP_COLORS[i % GROUP_COLORS.length]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
