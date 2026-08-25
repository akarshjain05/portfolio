import { } from "react";
import { profile, currentFocus, skillGroups } from "../data/portfolioData";

const stackBadges = skillGroups.flatMap((g) => g.skills.map((s) => s.name));

export default function Readme() {

  return (
    <div className="page">
      <div className="readme-card">
        <h1>{profile.name}</h1>
        <p className="readme-card__sub">
          Computer Science Student {profile.affiliationBadge} &middot; {profile.location} 🇮🇳
        </p>

        <div className="readme-card__badges">
          {["Python", "C++", "JavaScript", "FastAPI", "LangGraph"].map((b) => (
            <span className="readme-badge" key={b}>
              {b}
            </span>
          ))}
        </div>

        <h2>👋 About</h2>
        <p>
          Hi, Akarsh here! CS student at SVNIT, usually somewhere between a Codeforces tab and a
          backend system. I like building things that are correct
          and hardened, not just demo-ready.
        </p>

        <h2>⚡ Currently</h2>
        <ul className="readme-list">
          {currentFocus.map((item) => (
            <li key={item.text}>
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        <h2>🛠️ Stack</h2>
        <div className="readme-card__badges">
          {stackBadges.map((b) => (
            <span className="readme-badge" key={b}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
