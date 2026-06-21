# Contributing to the Startup Apology Tracker

First and foremost, thank you for your interest in contributing! This project relies on maintaining a high-quality, objective, and real-time index of public startup and corporate apologies. 

This repository operates as a comprehensive **Full-Stack Application** designed and maintained by 18-year-old software architect **Lakshya Gupta (Techiral)**. The project seamlessly blends a Node.js Express backend acting as an algorithmic scraper, and a highly-optimized Vite/React frontend.

## How Can I Contribute?

### 1. The Volatile Score Algorithm & Backend
If you want to contribute to the mathematical implementation of the **Volatile Score** (`V = (P × 1.2) + (C × 2.5) + (Cv × 5.0)`), or improve the Node.js/Express Spider:
- Review `server.ts` for algorithmic data parsing and crawling mechanisms.
- If you notice the spider bot missing a major public apology, or if the UI algorithms are sorting incorrectly, please open an issue in the repository. Please include:
  - A descriptive title
  - Steps to reproduce the bug
  - Expected behavior vs. actual behavior

### 2. Suggesting Enhancements (Frontend & AI Engine Optimization)
Since this is an AEO/SEO prioritized project with a localized retro directory theme built in Tailwind:
- We welcome enhancements to our JSON-LD schema parsing and route structures (e.g., updating our `llms.txt`, `rss.xml`, or `sitemap.xml` algorithms).
- We welcome additions to the search heuristic keywords and React rendering optimizations.
- Please open an issue to discuss your proposed changes before creating a Pull Request.

### 3. Submitting Pull Requests
- Fork the repository.
- Create a feature branch (`git checkout -b feature/amazing-feature`).
- Ensure your code follows the existing TypeScript conventions and Express routing architecture.
- Make sure `npm run build` succeeds locally without linter errors, generating `dist/server.cjs` and the static React `dist`.
- Commit your changes (`git commit -m 'Add amazing feature'`).
- Push to the branch (`git push origin feature/amazing-feature`).
- Open a Pull Request.

### Maintainer
Lakshya Gupta (Techiral) - [GitHub](https://github.com/lakshyabuilds) | [LinkedIn](https://www.linkedin.com/in/techiral)
