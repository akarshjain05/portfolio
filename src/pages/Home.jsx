import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FolderKanban, User, Mail } from "lucide-react";
import { profile, stats, socials } from "../data/portfolioData";
import SocialLink from "../components/SocialLink";

export default function Home() {
  useEffect(() => {
    document.title = "akarsh : portfolio";
  }, []);

  return (
    <div className="page">
      <span className="comment">// hello world !! Welcome to my portfolio</span>

      <h1 className="hero__name">
        <span className="hero__firstname">{profile.name.split(' ')[0]}</span>
        <br />
        <span className="hero__lastname">{profile.name.split(' ').slice(1).join(' ')}</span>
      </h1>
      <div className="hero__underline" />

      <div className="badge-row">
        {profile.roles.map((role, idx) => {
          const dotColors = ["#5eead4", "#f472b6", "#60a5fa"];
          return (
            <span className="badge" key={role}>
              <span className="badge__dot" style={{ background: dotColors[idx % dotColors.length] }} />
              {role}
            </span>
          );
        })}
        <span className="badge badge--accent">
          <span className="badge__dot" style={{ background: "#f472b6" }} />
          {profile.affiliationBadge}
        </span>
      </div>

      <p className="lede">{profile.summary}</p>

      <div className="btn-row">
        <Link to="/projects" className="btn btn--primary">
          <FolderKanban size={16} />
          Projects
        </Link>
        <Link to="/about" className="btn">
          <User size={16} />
          About Me
        </Link>
        <Link to="/contact" className="btn">
          <Mail size={16} />
          Contact
        </Link>
      </div>

      <div className="stat-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-card__value">{stat.value}</div>
            <div className="stat-card__label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="social-row">
        {socials.map((s) => (
          <SocialLink social={s} key={s.name} />
        ))}
      </div>
    </div>
  );
}
