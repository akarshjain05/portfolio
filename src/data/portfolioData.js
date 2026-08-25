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
  name: "Akarsh Jain",
  roles: ["Full-Stack Developer", "AI/ML Engineer", "Competitive Programmer"],
  affiliationBadge: "@ SVNIT",
  heroLine: "Building backend & AI systems that hold up under pressure.",
  summary:
    "I work at the intersection of backend engineering, applied AI, and competitive programming. I care about the things demos usually skip past — correctness, edge cases, and performance — not just something that works once on stage.",
  bio: "Hi, I'm Akarsh — a Computer Science undergraduate at SVNIT Surat who builds robust systems that actually hold up under pressure. My work sits at the intersection of backend engineering, applied AI, and competitive programming. I specialize in taking systems all the way to production—from designing secure REST APIs to containerizing background job pipelines on AWS EC2. I'd much rather spend an extra evening hardening a codebase with Pytest and Redis rate-limiting than ship a fragile demo that only survives the happy path.",
  location: "India",
};

export const stats = [
  { value: "2+", label: "YEARS" },
  { value: "4+", label: "PROJECTS" },
  { value: "∞", label: "CURIOSITY" },
  { value: "↑", label: "ALWAYS LEARNING" },
];

// icon values map to lucide-react components in SocialLink.jsx
export const socials = [
  { name: "GitHub", url: "https://github.com/akarshjain05", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/akarshjain05", icon: "linkedin" },
  { name: "Instagram", url: "https://instagram.com/akarsh_jain05", icon: "instagram" },
  { name: "LeetCode", url: "https://leetcode.com/akarsh_jain05", icon: "leetcode" },
  { name: "Codeforces", url: "https://codeforces.com/profile/akarsh_jain05", icon: "codeforces" },
  { name: "CodeChef", url: "https://codechef.com/users/akarshjain05", icon: "codechef" },
  { name: "Email", url: "mailto:akarshjain2006@gmail.com", icon: "mail" },
  { name: "Phone", url: "tel:+917321019524", icon: "phone" },
];

export const currentFocus = [
  {
    icon: "🛡️",
    text: "Building SentinelReview — a 7-agent AI pipeline that reviews GitHub PRs for security issues (0.900 precision, 1.000 recall on GHSA benchmark)",
  },
  {
    icon: "🧠",
    text: "Grinding Data Structures, Algorithms, and Codeforces to master competitive problem-solving",
  },
  {
    icon: "🚀",
    text: "Exploring advanced RAG architectures and vector databases for my next big AI integration",
  }
];

export const education = [
  {
    school: "SVNIT — Sardar Vallabhbhai National Institute of Technology",
    location: "Surat, India",
    degree: "B.Tech, Computer Science",
    period: "2024 - 2028",
    notes: "Current CGPA: 7.55",
  },
  {
    school: "St. Xaviers School",
    location: "Hazaribagh, India",
    degree: "Primary & Higher Secondary Education",
    period: "2011 - 2024",
    notes: "Class 12th: 91.0% | Class 10th: 90.0%",
  },
];

export const projects = [
  {
    id: "gym-progress",
    icon: "📈",
    status: "shipped",
    tags: ["FULL STACK", "ANALYTICS"],
    title: "IronLog – Gym Progress Analytics Platform",
    description: "A multi-user fitness tracker that computes Epley 1RM, Mifflin-St Jeor BMR/TDEE, and a true maintenance-calorie figure back-calculated from each user's own logged intake vs. real weight change, plus regression-based weight-trend and goal-ETA forecasting.",
    tech: ["FastAPI", "SQLAlchemy", "JWT", "Vanilla JS PWA", "Chart.js", "Docker", "AWS EC2", "Caddy", "GitHub Actions"],
    github: "https://github.com/akarshjain05/gym-progress-analytics",
    live: "https://ironlog.in",
  },
  {
    id: "resource-sharing",
    icon: "📚",
    status: "shipped",
    tags: ["FULL STACK", "COMMUNITY"],
    title: "Campus Resource Sharing System",
    description: "A campus-only marketplace where students, faculty, and clubs list, borrow, and return shared resources; models the full borrow lifecycle across 4 RBAC roles. Shipped 17 REST routers on FastAPI/SQLAlchemy 2.0 with CSRF-hardened, Redis rate-limited auth, covered by 70+ Pytest cases.",
    tech: ["FastAPI", "SQLAlchemy 2.0", "PostgreSQL", "Alembic", "Redis", "Celery", "JWT/RBAC", "React 18", "Tailwind CSS", "Docker Compose"],
    github: "https://github.com/akarshjain05/College-Resource-Sharing-System",
    live: "https://13-48-123-128.sslip.io/",
  },
  {
    id: "mini-code-judge",
    icon: "⚖️",
    status: "shipped",
    tags: ["FULL STACK", "SECURITY", "COMPETITIVE PROGRAMMING"],
    title: "Mini Code Judge",
    description: "A competitive-programming judge in the spirit of Codeforces/LeetCode that runs untrusted C/C++/Java/Python submissions in resource-capped, network-isolated Docker sandboxes with an automatic OS-level fallback, returning verdicts via Redis/RQ-queued, horizontally-scalable workers. Includes Gemini-powered AI code review.",
    tech: ["FastAPI", "PostgreSQL", "Docker", "Redis/RQ", "JWT", "Gemini API", "OAuth"],
    github: "https://github.com/akarshjain05/mini-code-judge",
    live: "https://mini-code-judge-frontend.onrender.com",
  },
  {
    id: "ai-software-factory",
    icon: "🏭",
    status: "shipped",
    tags: ["AI", "ORCHESTRATION", "FULL STACK"],
    title: "Autonomous AI Software Factory",
    description: "An agentic platform that takes natural-language requirements and autonomously plans, decomposes, implements, tests, and integrates them. Uses a stateful LangGraph orchestrator with a deterministic task DAG, model router, and isolated Docker sandbox to optimize reasoning and token usage.",
    tech: ["FastAPI", "React/TypeScript", "Vite", "LangGraph", "Docker", "PostgreSQL", "LiteLLM"],
    github: "https://github.com/akarshjain05/autonomous-ai-software-factory",
    live: null,
  }
];

export const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "C++", level: 90 },
      { name: "C", level: 85 },
      { name: "Python", level: 88 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "FastAPI", level: 90 },
      { name: "REST API Design", level: 85 },
      { name: "JWT / OAuth2", level: 88 },
      { name: "LangGraph", level: 75 },
      { name: "Pydantic", level: 85 },
      { name: "RBAC", level: 82 },
    ],
  },
  {
    title: "Testing & Tools",
    skills: [
      { name: "Pytest", level: 85 },
      { name: "Unit & Integration Testing", level: 82 },
      { name: "Git", level: 88 },
      { name: "Docker", level: 85 },
      { name: "Postman", level: 80 },
    ],
  },
  {
    title: "Deployment & Infra",
    skills: [
      { name: "AWS EC2", level: 80 },
      { name: "Docker Compose", level: 85 },
      { name: "Render", level: 78 },
      { name: "Caddy", level: 75 },
      { name: "GitHub Actions", level: 82 },
    ],
  },
  {
    title: "Core CS",
    skills: [
      { name: "Data Structures & Algorithms", level: 92 },
      { name: "Object Oriented Programming", level: 85 },
      { name: "DBMS", level: 85 },
      { name: "Operating Systems", level: 80 },
      { name: "Computer Networks", level: 80 },
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

export const repoName = "akarsh jain";
