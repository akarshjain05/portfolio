# Akarsh Jain — Developer Portfolio
Welcome to my personal developer portfolio! I am a Computer Science student at SVNIT, Surat, specializing in backend engineering, competitive programming, and robust full-stack systems.

This repository contains the source code for my portfolio website, engineered to look and feel like a modern, dark-themed code editor (VS Code).
👉 **Live Site:** Hosted on Vercel
## 🚀 Featured Projects

This portfolio highlights my core technical work, focusing on systems that prioritize correctness, edge cases, and performance:

- **IronLog – Gym Progress Analytics Platform**: A multi-user fitness tracker that computes Epley 1RM, Mifflin-St Jeor BMR/TDEE, and a true maintenance-calorie figure back-calculated from each user's own logged intake vs. real weight change, plus regression-based weight-trend and goal-ETA forecasting (FastAPI, SQLAlchemy, JWT, Vanilla JS PWA, AWS EC2).
- **Campus Resource Sharing System**: A campus-only marketplace where students, faculty, and clubs list, borrow, and return shared resources; models the full borrow lifecycle across 4 RBAC roles. Shipped 17 REST routers with CSRF-hardened, Redis rate-limited auth (FastAPI, Redis, Celery, React).
- **Mini Code Judge**: A competitive-programming judge in the spirit of Codeforces/LeetCode that runs untrusted C/C++/Java/Python submissions in resource-capped, network-isolated Docker sandboxes with an automatic OS-level fallback, returning verdicts via Redis/RQ-queued, horizontally-scalable workers. Includes Gemini-powered AI code review (FastAPI, PostgreSQL, Redis, Docker).

## 🛠️ Portfolio Architecture

The site itself is a fully responsive Single Page Application (SPA) built with a focus on a unique, developer-centric UX:

- **Frontend Framework:** React 19 + Vite
- **Routing:** React Router (client-side routing mapped to IDE "tabs")
- **Styling:** Pure Vanilla CSS with CSS Variables for IDE theming
- **Icons:** `lucide-react` & `react-icons` for file-tree and UI glyphs
- **Deployment:** Vercel Serverless API and Edge Network

The entire data layer (projects, skills, bio, links) is decoupled from the UI components and driven by a central configuration file (`src/data/portfolioData.js`), making it incredibly easy to update content without touching the React logic.

## 💻 Running Locally

To spin up this portfolio on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/akarshjain05/portfolio.git

# 2. Navigate into the directory
cd portfolio

# 3. Install dependencies
npm install

# 4. Start the Vite development server
npm run dev
```

Visit `http://localhost:5173` to see the site running locally.

## 📫 Let's Connect

I am always building, learning, and grinding Codeforces. If you want to talk about backend systems, security, or competitive programming, feel free to reach out:

- **Email:** akarshjain2006@gmail.com
- **LinkedIn:** [linkedin.com/in/akarshjain05](https://linkedin.com/in/akarshjain05)
- **GitHub:** [github.com/akarshjain05](https://github.com/akarshjain05)
