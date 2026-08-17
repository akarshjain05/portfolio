# Akarsh Jain — Developer Portfolio

[![Deploy to GitHub Pages](https://github.com/akarshjain05/portfolio/actions/workflows/deploy.yml/badge.svg)](https://akarshjain05.github.io/portfolio/)

Welcome to my personal developer portfolio! I am a Computer Science student at SVNIT, Surat, specializing in backend engineering, competitive programming, and robust full-stack systems.

This repository contains the source code for my portfolio website, engineered to look and feel like a modern, dark-themed code editor (VS Code).

👉 **Live Site:** [https://akarshjain05.github.io/portfolio/](https://akarshjain05.github.io/portfolio/)

## 🚀 Featured Projects

This portfolio highlights my core technical work, focusing on systems that prioritize correctness, edge cases, and performance:

- **Gym Progress Analytics**: A comprehensive fitness tracking platform that allows users to log workouts, track their lifting metrics over time, and visualize their progress with dynamic charts (React, Node.js, PostgreSQL).
- **College Resource Sharing System**: A centralized platform for college students to share, discover, and discuss academic resources and materials securely within their institution (React, Express, MongoDB).
- **Mini Code Judge**: A competitive-programming judge hosted on Render. Features GitHub OAuth, JWT blacklisting via Redis, email verification, account lockout, rate limiting, and a hardened execution sandbox (Python, FastAPI, JavaScript, Redis).

## 🛠️ Portfolio Architecture

The site itself is a fully responsive Single Page Application (SPA) built with a focus on a unique, developer-centric UX:

- **Frontend Framework:** React 19 + Vite
- **Routing:** React Router (client-side routing mapped to IDE "tabs")
- **Styling:** Pure Vanilla CSS with CSS Variables for IDE theming
- **Icons:** `lucide-react` & `react-icons` for file-tree and UI glyphs
- **Deployment:** Fully automated CI/CD via GitHub Actions to GitHub Pages

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
- **Codeforces:** [codeforces.com/profile/akarshjain05](https://codeforces.com/profile/akarshjain05)
