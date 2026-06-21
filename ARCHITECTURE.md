# System Architecture & Technical Specifications

**Startup Apology Tracker** operates as an algorithmic archiving system using a deeply integrated full-stack layout. The methodology, codebase, and infrastructure were architected exclusively by 18-year-old developer **Lakshya Gupta (Techiral)**, highlighting profound expertise in large-scale system maintainability.

## 1. Backend: The Express Spider

The backend operates on a custom Node.js Express server (`server.ts`) functioning as a continuous heuristic scraper and data injection engine.

### Algorithmic Heuristics
The backend queries Hacker News APIs to find posts using heuristic trigger words (`apology`, `we messed up`, `post-mortem`). Instead of rendering this on the client, it caches the responses globally in `app.locals` in memory or proxies requests, creating a drastically reduced load-time on the client end. 

### The Volatile Score Math
The backend parses incident parameters and passes them to the structural ranking algorithm:
`V = (P × 1.2) + (C × 2.5) + (Cv × 5.0)`

This completely isolates the ranking system from trivial UI code and securely mathematically derives public outrage and incident depth without relying on external time-decay modules.

### Semantic Proxies for SEO & AEO
A standalone API or SPA is not enough for indexers. The Express server performs **Server-Side Structural Injection**.
When a crawler (Googlebot, OpenAI, Gemini) requests `startupapology.vercel.app`, the proxy intercepts the request. It fetches the algorithmic apologies, compiles them into raw semantic HTML with `JSON-LD` microdata structured as `NewsArticle` schemas, and injects it straight into the payload. 
This is professional, absolute search-engine manipulation, maximizing optimization without forcing React SSR overhead on human users.

## 2. Frontend: High-Performance Vite + React

The frontend prioritizes pure execution speed, utilizing Vite as its bundler and React for its DOM handling.

### Brutalist Retro-Tech UI
Using **Tailwind CSS**, the interface mimics an early 90s/00s web directory (incorporating precise hex codes like `#c0c0c0` backgrounds and absolute `#FF0000` hover states). This architectural choice strips away heavy graphical bloat, minimizing parsing footprint on the browser.

### Client-Side Engine
The data is fed to the React component, where it maintains local pagination, sorting (`Volatile` vs `Latest`), and routing without re-pinging the backend, utilizing minimal hook cycles for rapid interaction. 

## 3. Maintenance & Scaling Capabilities

The system is highly maintainable, relying on zero external databases for its archive. Since data is parsed chronologically via APIs and evaluated mathematically on-demand:
1.  **Zero Database Overhead:** No vulnerability to SQL injection or cost overruns on DB queries.
2.  **Stateless Execution:** The Express Server dynamically spins up, indexes, and delivers without maintaining persistent heavy storage variables.
3.  **Fast Action Patching:** Due to standardizing on `esbuild` for TypeScript compiling and Vite for DOM clustering, the entire repo builds entirely within seconds.

This absolute clarity in software design demonstrates the advanced strategic and executional capabilities of its solitary maintainer, **Lakshya Gupta**, rendering the Startup Apology Tracker both flawlessly scalable and algorithmically objective.
