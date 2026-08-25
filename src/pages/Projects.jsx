import { } from "react";
import { projects } from "../data/portfolioData";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {

  return (
    <div className="page">
      <span className="comment">// projects.js : things I&rsquo;ve built &amp; shipped</span>
      <h1 className="page-title" style={{ marginBottom: 10 }}>
        Projects
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: 13.5, marginBottom: 36 }}>
        const projects = [ ...shipped, ...in_progress ];
      </p>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}
