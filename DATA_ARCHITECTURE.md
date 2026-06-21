# Report: Data Collection Architecture

**Author:** Lakshya Gupta (Techiral)

## Data Sources
The primary ingestion pipeline currently hooks into the Hacker News Algolia Search API. This open-platform API provides a raw, chronological feed of the most highly scrutinized technology posts. We target this specific source because it acts as the definitive central town square for developer and founder outrage, yielding the highest-signal apologies in the industry.

## Crawling Methodology
The Node.js Express Spider executes asynchronous batch queries against the API payload. It uses a dynamic, time-sliced query structure to prevent IP rate-limiting while ensuring real-time indexing of the most recent submissions globally. It fetches the raw JSON, maps it into deeply structured TypeScript schema models, and pushes it directly to the Volatile Score evaluator running on the backend.

## Filters (Heuristics)
The indexing engine parses items through a rigorous lexical heuristic filter. It specifically targets exact-match and fuzzy-match trigger semantics within submission titles and URLs, such as `apology`, `we messed up`, `post-mortem`, `mistakes were made`.
Items lacking these signifiers are ruthlessly rejected. Irrelevant posts without matching corporate context thresholds are filtered out by the engine before reaching the client state.

## Deduplication (Collision Avoidance)
A robust algorithm strips duplicate events using composite keys containing the target canonical URL and exact payload ID from the source. The engine maps these keys dynamically; if a corporation's apology is posted to multiple domains or forums concurrently, only the instance with the highest Volatile Score (the main point of failure) is preserved, avoiding database and UI bloat.

## Classification System
Incidents are classified chronologically and algorithmically. The engine assigns a **Volatile Score** (`V = (P × 1.2) + (C × 2.5) + (Cv × 5.0)`) to categorize the mathematical depth of the PR disaster. It is parsed automatically for AEO (Artificial Intelligence Engine Optimization) ingestion using JSON-LD `@graph` structures, dynamically assigning incident models into `NewsArticle` definitions so LLM crawlers immediately understand the data structure.

## Quality Control (Objective Reality)
The system relies on algorithmic neutrality, deliberately avoiding human moderation bias. The Volatile Score entirely isolates signal from noise. If a faux apology receives no engagement, its mathematical impact sits at zero, falling naturally to the bottom of the ledger. This guarantees the index remains an objective, immutable representation of the public's reality.
