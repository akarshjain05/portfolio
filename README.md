# Akarsh Jain — Developer Portfolio

Welcome to my personal developer portfolio! I am a Computer Science student at SVNIT, Surat, specializing in backend engineering, systems architecture, and robust full-stack applications.

This repository contains the source code for my portfolio website, engineered to look and feel like a modern, dark-themed code editor (VS Code).

👉 **Live Site:** [https://portfolio-akarsh10.vercel.app/](https://portfolio-akarsh10.vercel.app/)

## 🚀 Featured Projects

This portfolio highlights my core technical work, focusing on systems that prioritize correctness, performance, and security:

- **Itinero — Agentic AI Trip Planner**: A multi-agent LangGraph workflow that researches destinations, flights, hotels, and food in parallel to assemble a costed itinerary. Features a Critic node that conditionally rejects and re-runs specific agents for targeted rework (FastAPI, LangGraph, React 19, Python).
- **Vellumiq – Enterprise RAG Architecture**: A production-grade Retrieval-Augmented Generation pipeline built to solve temporal hallucinations and high token costs. Features Anthropic Contextual Retrieval, semantic caching, Corrective RAG (CRAG) fallback logic, and temporal hybrid search (FastAPI, Qdrant, Claude 3.5, Docker, Langfuse).
- **IronLog – Gym Progress Analytics Platform**: A multi-user fitness tracker that computes Epley 1RM, Mifflin-St Jeor BMR/TDEE, and a true maintenance-calorie figure back-calculated from each user's logged intake vs. real weight change, plus regression-based weight forecasting (FastAPI, SQLAlchemy, JWT, Vanilla JS PWA, AWS EC2).
- **Campus Resource Sharing System**: A campus-only marketplace where students, faculty, and clubs list, borrow, and return shared resources; models the full borrow lifecycle across 4 RBAC roles. Shipped 17 REST routers with CSRF-hardened, Redis rate-limited auth (FastAPI, Redis, Celery, React).
- **NostroQ – Quantum-Ready Liquidity Intelligence**: A cross-border payments prototype modeling nostro pre-funding as a QUBO problem, solved via a from-scratch simulated annealing implementation and graph-aware QAOA decomposition. Paired with a deterministic agentic layer and hardened with strict RBAC, IP rate-limiting, and structured logging (Python, FastAPI, Qiskit Aer, SQLite).
- **SentinelReview**: An agentic security code review tool for GitHub Pull Requests powered by a 7-agent LangGraph architecture. It grounds vulnerability claims in authoritative sources like OWASP, autonomously generates patches in a secure sandbox, and posts actionable reviews directly to GitHub (FastAPI, React/Vite, LangGraph, LiteLLM, Docker, PostgreSQL/pgvector).
- **Mini Code Judge**: A competitive-programming judge in the spirit of Codeforces/LeetCode that runs untrusted C/C++/Java/Python submissions in resource-capped, network-isolated Docker sandboxes with an automatic OS-level fallback, returning verdicts via Redis/RQ-queued, horizontally-scalable workers. Includes Gemini-powered AI code review (FastAPI, PostgreSQL, Redis, Docker, Gemini API).
- **Evenly – Real-Time Expense Splitter**: A private, real-time expense splitting PWA for small groups. Features a debt simplification engine that mathematically minimizes the number of settlements, flexible splitting modes, Web Push notifications, and CSV export. Deploys serverless on Vercel with Supabase Postgres (FastAPI, SQLAlchemy, PostgreSQL, JWT, Vanilla JS PWA).
- **Cedar Merge Gatekeeper**: A serverless merge gatekeeper that enforces complex PR approval policies via AWS Verified Permissions (Cedar). Handles self-approval bans, path-based ownership, line-count thresholds, time-based freezes, and senior break-glass overrides — all as hot-swappable Cedar policies, no redeploy needed (AWS Lambda, API Gateway, DynamoDB, Cedar/AVP, AWS SAM, Python).

## 🛠️ Portfolio Architecture

The site itself is a fully responsive Single Page Application (SPA) built with a focus on a unique, developer-centric UX:

- **Frontend Framework:** React 19 + Vite
- **Routing:** React Router (client-side routing mapped to IDE "tabs")
- **Styling:** Pure Vanilla CSS with CSS Variables for IDE theming
- **Icons:** `lucide-react` & `react-icons` for file-tree and UI glyphs
- **Backend & Database:** Vercel Serverless Functions (`/api/messages.js`) connected to an Upstash Redis database for contact form submissions.
- **Security:** Built-in IP-based rate limiting (via Upstash Redis) to prevent contact form spam.
- **Analytics:** Integrated with `@vercel/analytics`.

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

I am always building, learning, and tackling complex problems. If you want to talk about backend systems, security, or engineering challenges, feel free to reach out:

- **Email:** akarshjain2006@gmail.com
- **LinkedIn:** [linkedin.com/in/akarshjain05](https://linkedin.com/in/akarshjain05)
- **GitHub:** [github.com/akarshjain05](https://github.com/akarshjain05)
