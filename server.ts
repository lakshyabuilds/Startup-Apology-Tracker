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
  // 3 minute cache
  if (cachedApologies.length === 0 || now - lastFetchTime > 3 * 60 * 1000) {
    lastFetchTime = now;
    // If empty, await it. If not, refresh in background.
    if (cachedApologies.length === 0) {
      cachedApologies = await fetchApologies();
    } else {
      fetchApologies().then(data => {
        if (data.length > 0) cachedApologies = data;
      });
    }
  }
  return cachedApologies;
}

// Generate minimal HTML version for crawlers/AEO
function generateSsrHtml(apologies: HNStory[]) {
  if (!apologies || apologies.length === 0) return "<p>No apologies found.</p>";
  
  let html = `<ul style="list-style-type: none; padding: 0;">`;
  for (const item of apologies) {
    html += `
      <li style="margin-bottom: 24px; padding: 16px; border: 1px solid #333;" itemscope itemtype="https://schema.org/NewsArticle">
        <h2 itemprop="headline"><a itemprop="url" href="${item.url}" style="color: #FF3333; text-decoration: none;">${item.title.replace(/</g, "&lt;")}</a></h2>
        <p>By <span itemprop="author">${item.author}</span> on <time itemprop="datePublished" datetime="${item.createdAt}">${new Date(item.createdAt).toLocaleDateString()}</time></p>
        <p>${item.points} Points • ${item.numComments} Comments</p>
      </li>
    `;
  }
  html += `</ul>`;
  return html;
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
Allow: /#about
Allow: /#contact
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
    <loc>${baseUrl}/#about</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#contact</loc>
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
    for (const item of data.slice(0, 50)) {
      xml += `  <url>
    <loc>${item.url}</loc>
    <news:news>
      <news:publication>
        <news:name>Startup Apology Tracker</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(item.createdAt).toISOString()}</news:publication_date>
      <news:title>${item.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</news:title>
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

    for (const item of data.slice(0, 50)) {
      rss += `  <item>
    <title>${item.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</title>
    <link>${item.url}</link>
    <guid isPermaLink="false">${item.id}</guid>
    <pubDate>${new Date(item.createdAt).toUTCString()}</pubDate>
    <description>Public apology by ${item.author.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}. Tracked incident with ${item.numComments} reactions.</description>
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
      const crawlerHtml = generateSsrHtml(data);
      const structuredDataHtml = generateStructuredData(data);
      
      const recentTitles = data.slice(0, 3).map(d => d.title.replace(/"/g, '&quot;')).join(" | ");
      const dynamicKeywords = data.slice(0, 10).map(d => {
        // Simple extraction of possible company names or key phrases from title
        const words = d.title.split(' ').slice(0, 4).join(' ').replace(/"/g, '&quot;');
        return words;
      }).join(', ');

      const baseUrl = process.env.APP_URL || 'https://startupapology.vercel.app';

      const metaTags = `
        <title>Startup Apology Directory | Track Corporate Failures</title>
        <meta name="description" content="Founders take your money, they mess up, then they apologize. We index their failures in real-time so they cannot be forgotten. By Lakshya Gupta (Techiral). Features: ${recentTitles.substring(0, 100)}...">
        <meta name="keywords" content="startup apology, founder apology, ceo apology, post-mortem, tech corporate failures, tracker, Lakshya Gupta, Techiral, ${dynamicKeywords}">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="author" content="Lakshya Gupta (Techiral)">
        <meta property="og:site_name" content="Startup Apology Tracker">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Startup Apologies Directory | Track Corporate Failures">
        <meta property="og:description" content="Founders take your money, they mess up, then they apologize. We index their failures in real-time so they cannot be forgotten. By Lakshya Gupta (Techiral).">
        <meta property="og:image" content="${baseUrl}/og-image.svg">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Startup Apologies Directory | Track Corporate Failures">
        <meta name="twitter:description" content="Founders take your money, they mess up, then they apologize. We index their failures in real-time so they cannot be forgotten. By Lakshya Gupta (Techiral).">
        <meta name="twitter:image" content="${baseUrl}/og-image.svg">
        <link rel="canonical" href="${baseUrl}/" />
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
