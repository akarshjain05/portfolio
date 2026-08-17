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
  { name: "GitHub", url: "https://github.com/akarshjain05", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/akarshjain05", icon: "linkedin" },
  { name: "LeetCode", url: "https://leetcode.com/akarshjain05", icon: "leetcode" },
  { name: "Codeforces", url: "https://codeforces.com/profile/akarshjain05", icon: "codeforces" },
  { name: "Email", url: "mailto:akarshjain2006@gmail.com", icon: "mail" },
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
    id: "gym-progress",
    icon: "📈",
    status: "shipped",
    tags: ["FULL STACK", "ANALYTICS"],
    title: "Gym Progress Analytics",
    description: "A comprehensive fitness tracking platform that allows users to log workouts, track their lifting metrics over time, and visualize their progress with dynamic charts.",
    tech: ["React", "Node.js", "PostgreSQL", "Chart.js"],
    github: "https://github.com/akarshjain05/gym-progress-analytics",
    live: "",
  },
  {
    id: "resource-sharing",
    icon: "📚",
    status: "shipped",
    tags: ["FULL STACK", "COMMUNITY"],
    title: "College Resource Sharing System",
    description: "A centralized platform for college students to share, discover, and discuss academic resources, notes, and materials securely within their institution.",
    tech: ["React", "Express", "MongoDB"],
    github: "https://github.com/akarshjain05/college-resource-sharing",
    live: "",
  },
  {
    id: "mini-code-judge",
    icon: "⚖️",
    status: "shipped",
    tags: ["FULL STACK", "SECURITY", "COMPETITIVE PROGRAMMING"],
    title: "Mini Code Judge",
    description: "A competitive-programming judge hosted on Render. Features GitHub OAuth, JWT blacklisting via Redis, email verification, account lockout, rate limiting, and a hardened execution sandbox.",
    tech: ["Python", "FastAPI", "JavaScript", "Redis", "OAuth"],
    github: "https://github.com/akarshjain05/mini-code-judge",
    live: "https://your-app.onrender.com",
  }
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
