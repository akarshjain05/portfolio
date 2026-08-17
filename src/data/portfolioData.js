// ─────────────────────────────────────────────────────────────────
// portfolioData.js
//
// Every editable piece of content in this portfolio lives here:
// your name, bio, links, projects, and skills. Update this one
// file and it flows through the whole site — you shouldn't need
// to touch component files just to change copy or links.
//
// Anywhere you see "your-username" / "your.email@..." / "#" is a
// placeholder — swap in your real links.
// ─────────────────────────────────────────────────────────────────

export const profile = {
  name: "Akarsh",
  roles: ["Full-Stack Developer", "AI/ML Engineer", "Competitive Programmer"],
  affiliationBadge: "@ SVNIT",
  heroLine: "Building backend & AI systems that hold up under pressure.",
  summary:
    "I work at the intersection of backend engineering, applied AI, and competitive programming. I care about the things demos usually skip past — correctness, edge cases, and performance — not just something that works once on stage.",
  bio: "Hi! I'm Akarsh — a computer science student at SVNIT, building toward the 2026 job market one project at a time. My work spans full-stack development, AI engineering, and competitive programming, and I'd rather spend an extra evening hardening something than ship a version that only works in the happy path.",
  location: "India",
};

export const stats = [
  { value: "3+", label: "PROJECTS BUILT" },
  { value: "7-Agent", label: "AI REVIEW PIPELINE" },
  { value: "SVNIT", label: "COMPUTER SCIENCE" },
  { value: "∞", label: "ALWAYS LEARNING" },
];

// icon values map to lucide-react components in SocialLink.jsx
export const socials = [
  { name: "GitHub", url: "https://github.com/your-username", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/your-username", icon: "linkedin" },
  { name: "LeetCode", url: "https://leetcode.com/your-username", icon: "leetcode" },
  { name: "Codeforces", url: "https://codeforces.com/profile/your-username", icon: "codeforces" },
  { name: "Email", url: "mailto:your.email@example.com", icon: "mail" },
];

export const currentFocus = [
  {
    icon: "🛡️",
    text: "Building SentinelReview — a 7-agent AI pipeline that reviews GitHub PRs for security issues",
  },
  {
    icon: "⚖️",
    text: "Hardening Mini Code Judge end to end — OAuth, JWT blacklisting, rate limiting, sandboxing",
  },
  {
    icon: "🧠",
    text: "Grinding Codeforces in C++ — number theory, tree algorithms, game theory",
  },
  {
    icon: "🚩",
    text: "Competing in CTFs and picking apart web app security",
  },
];

export const education = [
  {
    school: "SVNIT — Sardar Vallabhbhai National Institute of Technology",
    location: "Surat, India",
    degree: "B.Tech, Computer Science",
    period: "In progress",
    notes:
      "Coursework spanning computer networks, microprocessors (8085/8086), and algorithms",
  },
];

export const projects = [
  {
    id: "sentinelreview",
    icon: "🛡️",
    status: "shipped",
    tags: ["AGENTIC AI", "SECURITY", "FULL STACK"],
    title: "SentinelReview",
    description:
      "An agentic AI system that reviews GitHub pull requests for security issues. Seven LangGraph agents work each PR together, backed by RAG over CWE, OWASP, and GHSA data, plus static analysis from Bandit and Semgrep. Ships with a real benchmark harness reporting precision, recall, and F1 — not just a demo.",
    tech: ["LangGraph", "RAG", "Bandit", "Semgrep", "React", "Docker Compose"],
    github: "https://github.com/your-username/sentinelreview",
    live: "",
  },
  {
    id: "mini-code-judge",
    icon: "⚖️",
    status: "shipped",
    tags: ["FULL STACK", "SECURITY", "COMPETITIVE PROGRAMMING"],
    title: "Mini Code Judge",
    description:
      "A competitive-programming judge hosted on Render. Refactored the original monolithic vanilla-JS frontend into a modular structure, then hardened it end to end — GitHub OAuth, JWT blacklisting via Redis, email verification, account lockout, rate limiting, tightened CORS, and a hardened execution sandbox.",
    tech: ["Python", "FastAPI", "JavaScript", "Redis", "OAuth"],
    github: "https://github.com/your-username/mini-code-judge",
    live: "https://your-app.onrender.com",
  },
  {
    id: "e-boe",
    icon: "🧾",
    status: "building",
    tags: ["FULL STACK", "FASTAPI", "IN PROGRESS"],
    title: "E-BoE — Electronic Bills of Exchange",
    description:
      "A management system for electronic bills of exchange, with role-based auth across a FastAPI backend and React frontend. Currently mid-build — backend and auth are in place, frontend pages are still being written.",
    tech: ["FastAPI", "React", "Role-Based Auth"],
    github: "https://github.com/your-username/e-boe",
    live: "",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 90 },
      { name: "C++", level: 85 },
      { name: "JavaScript", level: 78 },
      { name: "HTML / CSS", level: 75 },
    ],
  },
  {
    title: "AI & Agentic Systems",
    skills: [
      { name: "LangGraph", level: 80 },
      { name: "RAG Pipelines", level: 82 },
      { name: "Multi-Agent Design", level: 78 },
      { name: "Eval & Benchmarking", level: 75 },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "FastAPI", level: 88 },
      { name: "REST API Design", level: 85 },
      { name: "Auth & JWT", level: 82 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    title: "Security",
    skills: [
      { name: "Static Analysis", level: 78 },
      { name: "Web App Security", level: 75 },
      { name: "Auth Hardening", level: 80 },
      { name: "CTFs", level: 72 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 78 },
      { name: "Git", level: 88 },
      { name: "Render / Deploys", level: 75 },
    ],
  },
  {
    title: "Competitive Programming",
    skills: [
      { name: "Tree Algorithms", level: 82 },
      { name: "Number Theory", level: 80 },
      { name: "Game Theory", level: 78 },
      { name: "Codeforces Problem Solving", level: 85 },
    ],
  },
];

// Drives the sidebar file tree, the tab bar, breadcrumbs, and the
// status-bar language label. Add a new page by adding an entry here
// AND a matching <Route> in App.jsx.
export const files = [
  { id: "home", label: "home.jsx", path: "/", lang: "JavaScript JSX", icon: "component" },
  { id: "about", label: "about.html", path: "/about", lang: "HTML", icon: "html" },
  { id: "projects", label: "projects.js", path: "/projects", lang: "JavaScript", icon: "js" },
  { id: "skills", label: "skills.json", path: "/skills", lang: "JSON", icon: "json" },
  { id: "contact", label: "contact.css", path: "/contact", lang: "CSS", icon: "css" },
  { id: "readme", label: "README.md", path: "/readme", lang: "Markdown", icon: "markdown" },
];

export const repoName = "akarsh-portfolio";
