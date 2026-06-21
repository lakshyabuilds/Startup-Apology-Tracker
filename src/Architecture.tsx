import React from 'react';

export default function Architecture() {
  return (
    <div>
      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" align="center" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ REPORT: DATA COLLECTION ARCHITECTURE ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 1. DATA SOURCES ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                The primary ingestion pipeline currently hooks into the Hacker News Algolia Search API. This open-platform API provides a raw, chronological feed of the most highly scrutinized technology posts. We target this specific source because it acts as the definitive central town square for developer and founder outrage, yielding the highest-signal apologies in the industry.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 2. CRAWLING METHODOLOGY ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                The Node.js Express Spider executes asynchronous batch queries against the API payload. It uses a dynamic, time-sliced query structure to prevent IP rate-limiting while ensuring real-time indexing of the most recent submissions globally. It fetches the raw JSON, maps it into deeply structured TypeScript schema models, and pushes it directly to the Volatile Score evaluator running on the backend.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 3. FILTERS AND HEURISTICS ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                The indexing engine parses items through a rigorous lexical heuristic filter. It specifically targets exact-match and fuzzy-match trigger semantics within submission titles and URLs, such as:
                <br /><br />
                <code style={{ backgroundColor: '#eeeeee', padding: '2px' }}>apology</code>{" "}
                <code style={{ backgroundColor: '#eeeeee', padding: '2px' }}>we messed up</code>{" "}
                <code style={{ backgroundColor: '#eeeeee', padding: '2px' }}>post-mortem</code>{" "}
                <code style={{ backgroundColor: '#eeeeee', padding: '2px' }}>mistakes were made</code>
                <br /><br />
                Items lacking these signifiers are ruthlessly rejected. Irrelevant posts (like "post-mortem on a movie") without matching corporate context thresholds are filtered out by the engine before reaching the client state.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 4. DEDUPLICATION (COLLISION AVOIDANCE) ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                A robust algorithm strips duplicate events using composite keys containing the target canonical URL and exact payload ID from the source. The engine maps these keys dynamically; if a corporation's apology is posted to multiple domains or forums concurrently, only the instance with the highest Volatile Score (the main point of failure) is preserved, avoiding database and UI bloat.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 5. CLASSIFICATION SYSTEM ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                Incidents are classified chronologically and algorithmically. The engine assigns a <b>Volatile Score</b> to categorize the mathematical depth of the PR disaster. It is parsed automatically for AEO (Artificial Intelligence Engine Optimization) ingestion using JSON-LD `@graph` structures, dynamically assigning incident models into `NewsArticle` definitions so LLM crawlers immediately understand the data structure.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 6. QUALITY CONTROL (OBJECTIVE REALITY) ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                The system relies on algorithmic neutrality, deliberately avoiding human moderation bias. The Volatile Score entirely isolates signal from noise. If a faux apology receives no engagement, its mathematical impact sits at zero, falling naturally to the bottom of the ledger. This guarantees the index remains an objective, immutable representation of the public's reality.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
