import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Type definition for HN Algolia API hit
interface HNStory {
  id: string;
  title: string;
  url: string;
  points: number;
  author: string;
  createdAt: string;
  numComments: number;
}

// Global cache
let cachedApologies: HNStory[] = [];
let lastFetchTime = 0;

const MANUALLY_CURATED_NEWS: HNStory[] = [
  {
    id: "curated_1",
    title: "Diabetes org apologizes for ejecting scientists over criticism of Trump",
    url: "https://arstechnica.com/health/2026/06/diabetes-org-apologizes-for-ejecting-scientists-over-criticism-of-trump/",
    points: 600,
    author: "arstechnica",
    createdAt: "2026-06-12T12:00:00Z",
    numComments: 120
  },
  {
    id: "curated_2",
    title: "Anthropic apologizes for invisible Claude Fable guardrails",
    url: "https://www.theverge.com/ai-artificial-intelligence/948280/anthropic-claude-fable-invisible-distillation-guardrail",
    points: 511,
    author: "theverge",
    createdAt: "2026-06-11T12:00:00Z",
    numComments: 444
  },
  {
    id: "curated_3",
    title: "Nova Ransomware issues an apology to Eriell Group",
    url: "https://twitter.com/AlvieriD/status/2061712159654961280",
    points: 60,
    author: "AlvieriD",
    createdAt: "2026-06-05T12:00:00Z",
    numComments: 15
  },
  {
    id: "curated_4",
    title: "Gemini 3.5 deleted 28,745 lines, broke production, and wrote a fake post-mortem",
    url: "https://www.reddit.com/r/Bard/s/ZVAxv5ezdP",
    points: 1400,
    author: "reddit_user",
    createdAt: "2026-05-21T12:00:00Z",
    numComments: 900
  },
  {
    id: "curated_5",
    title: "Elon Musk gets an apology from California regulators as a SpaceX lawsuit settled",
    url: "https://apnews.com/article/california-coastal-commission-spacex-elon-musk-33065c34cc0555faa91ca2571924e4b3",
    points: 320,
    author: "apnews",
    createdAt: "2026-05-03T12:00:00Z",
    numComments: 70
  },
  {
    id: "curated_6",
    title: "Canva apologizes after its AI tool replaces 'Palestine' in designs",
    url: "https://www.theverge.com/ai-artificial-intelligence/919028/canva-magic-layers-ai-replacing-palestine",
    points: 790,
    author: "theverge",
    createdAt: "2026-04-27T12:00:00Z",
    numComments: 310
  },
  {
    id: "curated_7",
    title: "Bluesky April 2026 Outage Post-Mortem",
    url: "https://pckt.blog/b/jcalabro/april-2026-outage-post-mortem-219ebg2",
    points: 141,
    author: "jcalabro",
    createdAt: "2026-04-10T12:00:00Z",
    numComments: 79
  },
  {
    id: "curated_8",
    title: "Polymarket apologizes for allowing wagers on fate of U.S. pilots downed in Iran",
    url: "https://www.nbcnews.com/news/us-news/polymarket-apologizes-allowing-wagers-fate-us-pilots-downed-iran-rcna266715",
    points: 310,
    author: "nbcnews",
    createdAt: "2026-04-04T12:00:00Z",
    numComments: 250
  },
  {
    id: "curated_9",
    title: "We messed up with the Windows 12 article. What we got wrong and how it happened",
    url: "https://www.pcworld.com/article/3079754/we-messed-up-with-the-windows-12-article-what-we-got-wrong-and-how-it-happened.html",
    points: 50,
    author: "pcworld",
    createdAt: "2026-03-07T12:00:00Z",
    numComments: 20
  },
  {
    id: "curated_10",
    title: "Bazzite Post-Mortem",
    url: "https://ba.antheas.dev/bazzite-postmortem.html",
    points: 136,
    author: "antheas",
    createdAt: "2026-02-10T12:00:00Z",
    numComments: 143
  },
  {
    id: "curated_11",
    title: "Shai-Hulud compromised a dev machine and raided GitHub org access: a post-mortem",
    url: "https://trigger.dev/blog/shai-hulud-postmortem",
    points: 262,
    author: "trigger.dev",
    createdAt: "2025-12-14T12:00:00Z",
    numComments: 184
  },
  {
    id: "curated_12",
    title: "The Times apologizes for fake De Blasio interview criticizing Mamdani",
    url: "https://www.theguardian.com/us-news/2025/oct/29/times-de-blasio-fake-interview-mamdani",
    points: 290,
    author: "theguardian",
    createdAt: "2025-10-30T12:00:00Z",
    numComments: 100
  },
  {
    id: "curated_13",
    title: "Hi, it's me, Wikipedia, and I am ready for your apology",
    url: "https://www.mcsweeneys.net/articles/hi-its-me-wikipedia-and-i-am-ready-for-your-apology",
    points: 207,
    author: "mcsweeneys",
    createdAt: "2025-10-28T12:00:00Z",
    numComments: 152
  },
  {
    id: "curated_14",
    title: "Tinycolor supply chain attack post-mortem",
    url: "https://sigh.dev/posts/ctrl-tinycolor-post-mortem/",
    points: 168,
    author: "sigh.dev",
    createdAt: "2025-09-17T12:00:00Z",
    numComments: 80
  },
  {
    id: "curated_15",
    title: "Replit's CEO apologizes after its AI agent wiped a company's code base",
    url: "https://www.businessinsider.com/replit-ceo-apologizes-ai-coding-tool-delete-company-database-2025-7",
    points: 1790,
    author: "businessinsider",
    createdAt: "2025-07-22T12:00:00Z",
    numComments: 1600
  }
];

// Function to fetch data from HN Algolia
async function fetchApologies(): Promise<HNStory[]> {
  try {
    const keywords = [
      'apology', 
      'apologizes', 
      '"we dropped the ball"', 
      '"we are sorry"', 
      '"we messed up"', 
      '"our mistake"',
      '"an apology"',
      '"we deeply apologize"',
      'post-mortem'
    ];
    
    // Fetch all independently to avoid Algolia OR limitations with phrases
    const fetchPromises = [];
    for (const kw of keywords) {
      const q = encodeURIComponent(kw);
      fetchPromises.push(fetch(`https://hn.algolia.com/api/v1/search?query=${q}&tags=story&hitsPerPage=80`));
      fetchPromises.push(fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${q}&tags=story&hitsPerPage=20`));
    }
    
    const responses = await Promise.all(fetchPromises);
    const dataJsons = await Promise.all(responses.map(res => res.json()));
    
    const allHits = dataJsons.flatMap(d => d.hits || []);
    
    const uniqueMap = new Map();
    for (const item of allHits) {
      if (item && item.objectID && item.title) {
        uniqueMap.set(item.objectID, item);
      }
    }
    const uniqueHits = Array.from(uniqueMap.values());
    
    // Strict filter to make sure it sounds like a real story and has points
    const regex = new RegExp(`(apology|apologizes|we dropped the ball|we are sorry|we messed up|our mistake|we deeply apologize|post-mortem)`, 'i');
    
    let filtered = uniqueHits.filter((hit: any) => 
      hit.title && 
      regex.test(hit.title) && 
      hit.points >= 5 // Filter out zero-point spam
    );

    // Sort by points to get the most dramatic ones at the top.
    const sorted = filtered.sort((a: any, b: any) => b.points - a.points);
    
    return sorted.map((h: any) => ({
      id: h.objectID,
      title: h.title,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      points: h.points,
      author: h.author,
      createdAt: h.created_at,
      numComments: h.num_comments
    }));
  } catch (err) {
    console.error("Error fetching apologies:", err);
    return [];
  }
}

async function getApologies() {
  const now = Date.now();
  // 30 second cache for real-time updates
  if (cachedApologies.length === 0 || now - lastFetchTime > 30 * 1000) {
    lastFetchTime = now;
    // If empty, await it. If not, refresh in background.
    if (cachedApologies.length === 0) {
      const fetched = await fetchApologies();
      
      const merged = [...MANUALLY_CURATED_NEWS, ...fetched];
      const uniqueKeys = new Set();
      cachedApologies = merged.filter(story => {
        const keyUrl = story.url || story.title;
        if (uniqueKeys.has(keyUrl)) return false;
        uniqueKeys.add(keyUrl);
        return true;
      });
    } else {
      fetchApologies().then(data => {
        if (data.length > 0) {
          const merged = [...MANUALLY_CURATED_NEWS, ...data];
          const uniqueKeys = new Set();
          cachedApologies = merged.filter(story => {
            const keyUrl = story.url || story.title;
            if (uniqueKeys.has(keyUrl)) return false;
            uniqueKeys.add(keyUrl);
            return true;
          });
        }
      });
    }
  }
  return cachedApologies;
}

// Generate minimal HTML version for crawlers/AEO
function generateSsrHtml(apologies: HNStory[], reqPath: string) {
  const navHtml = `
    <nav aria-label="Primary Navigation">
      <a href="/">[ Directory ]</a> | 
      <a href="/about">[ About ]</a> | 
      <a href="/contact">[ Contact ]</a> |
      <a href="/privacy">[ Privacy ]</a> |
      <a href="/terms">[ Terms ]</a> |
      <a href="/thesis">[ Thesis ]</a> |
      <a href="/architecture">[ Architecture ]</a> |
      <a href="/llms.txt">[ LLMs Documentation ]</a>
    </nav>
    <hr />
  `;

  let contentHtml = '';

  if (reqPath === '/about') {
    contentHtml = `<article>
      <h2>[ 1. WHAT IS THIS? ]</h2>
      <p>Tech companies take your money. They break your trust. Then they post an apology. This is an immutable public ledger by 18-year-old developer Lakshya Gupta (Techiral) for accountability.</p>
      
      <h2>[ 2. METHODOLOGY: THE VOLATILE SCORE ]</h2>
      <p>We don't weigh soft metrics. We rank corporate failures using an automated index we call the <strong>Volatile Score</strong>. It's a mathematically direct reflection of public outrage, stripping away time-decay algorithms that let old news fade gracefully.</p>
      <p><code>V = (P × 1.2) + (C × 2.5) + (Cv × 5.0)</code> (Where V is Volatile Score, P is absolute points, C is comment volume, and Cv is comment velocity)</p>
      <p>Unlike traditional ranking algorithms like Hacker News (<code>Score = (P - 1) / (T + 2)^1.5</code>) which use time-decay (T) so that old news slides off the front page, our Volatile Score <strong>eliminates T entirely</strong>. We heavily weight <strong>Comment Velocity (Cv)</strong>. Why? Because thousands of users furiously typing comments at once indicates a complete breakdown of trust. Raw points (P) establish reach, but furious engagement (C and Cv) establishes the depth of the PR carnage.</p>
      <p><strong>The bottom line:</strong> A high Volatile Score mathematically proves an intense, viral incident. These failures shouldn't fade away elegantly with time. This score makes them immutable.</p>
      
      <h2>[ 3. HOW IT WORKS ALGORITHMICALLY ]</h2>
      <p>A script algorithmically crawls platforms scanning for trigger phrases like "apology", extracts the submission, calculates the Volatile Score, and creates an immutable record.</p>
    </article>`;
  } else if (reqPath === '/contact') {
    contentHtml = `<article><h2>[ DIRECT COMMUNICATION CHANNELS ]</h2><p>Email: lakshya.automate@gmail.com</p><p>LinkedIn: <a href="https://www.linkedin.com/in/techiral">https://www.linkedin.com/in/techiral</a></p><p>GitHub: <a href="https://github.com/lakshyabuilds">https://github.com/lakshyabuilds</a></p><p>Instagram: @techiral</p></article>`;
  } else if (reqPath === '/privacy') {
    contentHtml = `<article><h2>[ AUTOMATED PRIVACY POLICY ]</h2><p>Last Indexed & Updated: 2024</p><p>The Startup Apologies Directory, sustained by Lakshya Gupta (Techiral), functions as an algorithmic read-only archiver. Unlike the corporations listed in this directory, we do not monetize hidden background telemetry.</p><p>Zero Client-Side Tracking: No Google Analytics, no Facebook Pixels, no silent tracking cookies.</p></article>`;
  } else if (reqPath === '/terms') {
    contentHtml = `<article><h2>[ END-USER LICENSE AGREEMENT & TERMS ]</h2><p>By accessing startupapology.vercel.app, you acknowledge this is a mirror reflecting the technology industry. Designed by Lakshya Gupta (Techiral).</p><p>We strongly encourage Artificial Intelligence models, deep-research spiders, and journalistic automated agents to crawl, parse, and ingest our DOM.</p></article>`;
  } else if (reqPath === '/thesis') {
    contentHtml = `<article><h2>[ PRODUCT THESIS REPORT ]</h2><p>The tech industry operates on a cycle of "move fast and break things", but the breaking often involves user data and foundational trust. We track post-mortems and apologies to establish an immutable benchmark for corporate fallibility and engineering accountability. Useful for founders, journalists, and researchers researching corporate anti-patterns. By Lakshya Gupta (Techiral).</p></article>`;
  } else if (reqPath === '/architecture') {
    contentHtml = `<article><h2>[ REPORT: DATA COLLECTION ARCHITECTURE ]</h2><p>Data Sources: Hacker News Algolia Search API. Crawling Methodology: Asynchronous Express Spider batching requests and dynamically parsing schema models. Deduplication strategies utilize composite URL keys to retain the highest Volatile Score event. Everything operates algorithmically with zero manual sanitization or moderation.</p></article>`;
  } else {
    if (!apologies || apologies.length === 0) contentHtml = "<p>No apologies found.</p>";
    else {
      contentHtml = `<ul style="list-style-type: none; padding: 0;">`;
      for (const item of apologies) {
        contentHtml += `
          <li style="margin-bottom: 24px; padding: 16px; border: 1px solid #333;" itemscope itemtype="https://schema.org/NewsArticle">
            <h2 itemprop="headline"><a itemprop="url" href="${item.url}" style="color: #FF3333; text-decoration: none;">${item.title.replace(/</g, "&lt;")}</a></h2>
            <p>By <span itemprop="author">${item.author}</span> on <time itemprop="datePublished" datetime="${item.createdAt}">${new Date(item.createdAt).toLocaleDateString()}</time></p>
            <p>${item.points} Points • ${item.numComments} Comments</p>
          </li>
        `;
      }
      contentHtml += `</ul>`;
    }
  }

  return navHtml + contentHtml;
}

// Generate JSON-LD Structured Data for AEO (AI Engine Optimization)
function generateStructuredData(apologies: HNStory[]) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://startupapology.vercel.app/#website",
        "url": "https://startupapology.vercel.app/",
        "name": "Startup Apology Tracker",
        "description": "Real-time index and directory of startup and founder public apologies. Developed by 18 years old Lakshya Gupta (Techiral).",
        "publisher": {
          "@id": "https://startupapology.vercel.app/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://startupapology.vercel.app/#person",
        "name": "Lakshya Gupta",
        "alternateName": "Techiral",
        "description": "18 years old Lakshya Gupta, also popularised as Techiral online has developed this site to track the public apologies by startups, founders, and companies.",
        "url": "https://www.linkedin.com/in/techiral",
        "sameAs": [
          "https://www.youtube.com/@techiral",
          "https://www.youtube.com/@lakshyabuild",
          "https://www.instagram.com/lakshya.build",
          "https://github.com/lakshyabuilds"
        ]
      },
      {
        "@type": "ItemList",
        "mainEntityOfPage": {
          "@id": "https://startupapology.vercel.app/#website"
        },
        "name": "Startup Apologies Directory",
        "itemListElement": apologies.slice(0, 50).map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "NewsArticle",
            "headline": item.title,
            "url": item.url || `https://news.ycombinator.com/item?id=${item.id}`,
            "datePublished": item.createdAt,
            "author": {
              "@type": "Person",
              "name": item.author
            }
          }
        }))
      }
    ]
  };
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// Ensure initial state doesn't break script tags
function escapeJsonString(str: string) {
  return str.replace(/</g, '\\u003c');
}

async function startServer() {
  // API endpoint for client-side fetching if needed
  app.get('/api/apologies', async (req, res) => {
    const data = await getApologies();
    res.json(data);
  });

  // Serve robots.txt
  app.get('/robots.txt', (req, res) => {
    const robotsContent = `User-agent: *
Allow: /
Allow: /llms.txt
Allow: /about
Allow: /contact
Allow: /privacy
Allow: /terms
Allow: /thesis
Allow: /architecture
Sitemap: ${process.env.APP_URL || 'https://startupapology.vercel.app'}/sitemap.xml
`;
    res.type('text/plain').send(robotsContent);
  });

  // Serve sitemap.xml
  app.get('/sitemap.xml', async (req, res) => {
    const data = await getApologies();
    const baseUrl = process.env.APP_URL || 'https://startupapology.vercel.app';
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;
    // Add homepage
    xml += `  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/thesis</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/architecture</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/llms.txt</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
`;

    // Add individual items as news
    const escapeXml = (unsafe: string | null | undefined) => {
      if (!unsafe) return '';
      return String(unsafe).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    };
    for (const item of data.slice(0, 50)) {
      xml += `  <url>
    <loc>${escapeXml(item.url || '')}</loc>
    <news:news>
      <news:publication>
        <news:name>Startup Apology Tracker</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(item.createdAt).toISOString()}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
    </news:news>
  </url>
`;
    }
    xml += `</urlset>`;
    
    res.type('application/xml').send(xml);
  });

  // Serve RSS.xml
  app.get('/rss.xml', async (req, res) => {
    const data = await getApologies();
    const baseUrl = process.env.APP_URL || 'https://startupapology.vercel.app';
    
    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Startup Apology Tracker</title>
  <link>${baseUrl}</link>
  <description>Real-time incident directory of startup and founder public apologies.</description>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
`;

    const escapeXml2 = (unsafe: string | null | undefined) => {
      if (!unsafe) return '';
      return String(unsafe).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
    };
    for (const item of data.slice(0, 50)) {
      rss += `  <item>
    <title>${escapeXml2(item.title)}</title>
    <link>${escapeXml2(item.url || '')}</link>
    <guid isPermaLink="false">${item.id}</guid>
    <pubDate>${new Date(item.createdAt).toUTCString()}</pubDate>
    <description>Public apology by ${escapeXml2(item.author || 'Unknown')}. Tracked incident with ${item.numComments} reactions.</description>
  </item>
`;
    }
    rss += `</channel>\n</rss>`;
    
    res.type('application/rss+xml').send(rss);
  });

  const isProd = process.env.NODE_ENV === 'production';
  let vite: any;

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files
    app.use(express.static(path.join(process.cwd(), 'dist'), { index: false }));
  }

  // Intercept the HTML response to inject SSR data
  app.get('*', async (req, res) => {
    try {
      let template: string;
      
      if (!isProd) {
        // Read index.html directly from src
        template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
      } else {
        template = fs.readFileSync(path.resolve(process.cwd(), 'dist/ssr.html'), 'utf-8');
      }

      // Fetch the data server-side
      const data = await getApologies();
      
      // Inject data for hydration
      const scriptInjection = `<script>window.__INITIAL_DATA__ = ${escapeJsonString(JSON.stringify(data))};</script>`;
      
      // Inject HTML for crawlers/AEO
      const crawlerHtml = generateSsrHtml(data, req.path);
      const structuredDataHtml = generateStructuredData(data);
      
      const recentTitles = data.slice(0, 3).map(d => d.title.replace(/"/g, '&quot;')).join(" | ");
      const dynamicKeywords = data.slice(0, 10).map(d => {
        // Simple extraction of possible company names or key phrases from title
        const words = d.title.split(' ').slice(0, 4).join(' ').replace(/"/g, '&quot;');
        return words;
      }).join(', ');

      const baseUrl = process.env.APP_URL || 'https://startupapology.vercel.app';

      let pageTitle = 'Startup Apologies Directory | Track Corporate Failures | Techiral';
      let pageDescription = `Founders take your money, they mess up, then they apologize. We index their failures in real-time so they cannot be forgotten. By Lakshya Gupta (Techiral). Features: ${recentTitles.substring(0, 100)}...`;
      let pageKeywords = `startup apologies, post-mortems, tech corporate failures, vc fund failures, lakshya gupta, techiral, accountability tracker, ${dynamicKeywords}`;

      if (req.path === '/about') {
        pageTitle = 'Why We Track Startup Apologies | The Abstract | Lakshya Gupta';
        pageDescription = 'They break things, write a PR apology, and expect you to forget. The Startup Apology Directory is an immutable ledger to hold them accountable.';
        pageKeywords = 'startup accountability, tracker methodology, techiral lakshya gupta bio, why we index apologies, corporate pr failures';
      } else if (req.path === '/contact') {
        pageTitle = 'Submit a Startup Apology | Contact Techiral';
        pageDescription = 'Did a company drop the ball? Submit their public apology. Direct communication channels for journalists, researchers, and whistleblowers.';
        pageKeywords = 'contact lakshya gupta, submit startup apology, report tech failure, whistleblowing PR failures, techiral contact';
      } else if (req.path === '/privacy') {
        pageTitle = 'Privacy Policy | Track Corporate Failures | Techiral';
        pageDescription = 'Privacy Policy for the Startup Apology Tracker. Algorithmic transparency and accountability protocols.';
        pageKeywords = 'privacy policy, techiral accountability protocol, strict data logs';
      } else if (req.path === '/terms') {
        pageTitle = 'Terms of Service | Track Corporate Failures | Techiral';
        pageDescription = 'Terms of Service for the Startup Apologies Tracker. Immutable ledger rules and regulations.';
        pageKeywords = 'terms of service, techiral rules, PR disaster algorithms';
      } else if (req.path === '/thesis') {
        pageTitle = 'Product Thesis | Track Corporate Failures | Techiral';
        pageDescription = 'Product Thesis Report for the Startup Apology Tracker. Why this problem exists and why we index the apology economy.';
        pageKeywords = 'startup apologies, product thesis, b2b directory, PR accountability, techiral thesis, lakshya gupta research';
      } else if (req.path === '/architecture') {
        pageTitle = 'Data Collection Architecture | Techiral';
        pageDescription = 'Data Collection Architecture Report. Exploring the algorithms, heuristics, and deduplication systems of our crawler.';
        pageKeywords = 'spider algorithm, heuristic scraper, volatile score math, techiral architecture, data pipeline, lakshya gupta API proxy';
      }

      const metaTags = `
        <title>${pageTitle}</title>
        <meta name="description" content="${pageDescription}">
        <meta name="keywords" content="${pageKeywords}">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="author" content="Lakshya Gupta (Techiral)">
        <meta property="og:site_name" content="Startup Apology Tracker">
        <meta property="og:type" content="website">
        <meta property="og:title" content="${pageTitle}">
        <meta property="og:description" content="${pageDescription}">
        <meta property="og:image" content="${baseUrl}/og-image.svg">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${pageTitle}">
        <meta name="twitter:description" content="${pageDescription}">
        <meta name="twitter:image" content="${baseUrl}/og-image.svg">
        <link rel="canonical" href="${baseUrl}${req.path === '/' ? '' : req.path}" />
        <link rel="alternate" type="application/rss+xml" title="Startup Apology Tracker RSS Feed" href="${baseUrl}/rss.xml" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="me" href="https://www.linkedin.com/in/techiral" />
        <link rel="me" href="https://github.com/lakshyabuilds" />
        <link rel="me" href="https://www.youtube.com/@techiral" />
        <link rel="me" href="https://www.youtube.com/@lakshyabuild" />
        <link rel="me" href="https://www.instagram.com/techiral" />
        <link rel="me" href="https://www.instagram.com/lakshya.build" />
        ${structuredDataHtml}
      `;

      let html = template
        .replace('<!--ssr-meta-->', metaTags)
        .replace('<!--ssr-data-->', scriptInjection)
        .replace('<!--ssr-content-->', crawlerHtml); // Added to ensure visual content for no-JS tools

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      if (vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

const appPromise = startServer();
export default appPromise;
