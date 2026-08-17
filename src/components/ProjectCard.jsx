import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card__top">
        <span className="project-card__icon" aria-hidden="true">
          {project.icon}
        </span>
        <div className="project-card__links">
          {project.github && (
            <a
              className="pill-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={12} /> GitHub
            </a>
          )}
          {project.live && (
            <a
              className="pill-link pill-link--live"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={12} /> Live
            </a>
          )}
        </div>
      </div>

      <div className="project-card__tags">
        {project.tags.join(" · ")}
        <span className={`status-dot status-dot--${project.status}`}>
          <i />
          {project.status === "shipped" ? "shipped" : "building"}
        </span>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="tech-row">
        {project.tech.map((t) => (
          <span className="tech-chip" key={t}>
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
