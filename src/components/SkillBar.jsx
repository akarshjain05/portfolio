export default function SkillBar({ name, level, color }) {
  return (
    <div className="skill-row">
      <div className="skill-row__top">
        <span className="skill-row__name">{name}</span>
        <span className="skill-row__pct">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar__fill"
          style={{ width: `${level}%`, background: color }}
        />
      </div>
    </div>
  );
}
