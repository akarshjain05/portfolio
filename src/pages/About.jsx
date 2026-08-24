import { useEffect } from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { profile, currentFocus, education } from "../data/portfolioData";

export default function About() {
  useEffect(() => {
    document.title = "Akarsh Jain";
  }, []);

  return (
    <div className="page">
      <span className="comment">// who I am · what I do · where I build</span>
      <h1 className="page-title">About Me</h1>

      <div className="bio-card" style={{ marginTop: 28 }}>
        {profile.bio}
      </div>

      <h2 className="section-heading">CURRENT FOCUS</h2>
      <div className="focus-card">
        <div className="focus-grid">
          {currentFocus.map((item) => (
            <div className="focus-item" key={item.text}>
              <span className="focus-item__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="section-heading">EDUCATION</h2>
      <div className="edu-list">
        {education.map((edu) => (
          <div className="edu-card" key={edu.school}>
            <div className="edu-card__top">
              <span className="edu-card__school">
                <GraduationCap size={17} color="#007acc" />
                {edu.school}
              </span>
              <span className="edu-card__period">{edu.period}</span>
            </div>
            <div className="edu-card__loc">
              <MapPin size={12} style={{ display: "inline", marginRight: 4, verticalAlign: -1 }} />
              {edu.location}
            </div>
            <div className="edu-card__degree">{edu.degree}</div>
            <div className="edu-card__notes">{edu.notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
