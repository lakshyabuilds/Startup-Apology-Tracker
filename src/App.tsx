import React, { useState, useEffect, useMemo } from 'react';
import { Apology } from './types';
import About from './About';
import Contact from './Contact';
import Privacy from './Privacy';
import Terms from './Terms';
import Thesis from './Thesis';
import Architecture from './Architecture';

type SortMode = 'hot' | 'latest';
type Page = 'home' | 'about' | 'contact' | 'privacy' | 'terms' | 'thesis' | 'architecture';

const AdsterraAd = () => {
  const bannerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!bannerRef.current) return;
    if (bannerRef.current.firstChild) return;

    const conf = document.createElement('script');
    const script = document.createElement('script');

    conf.type = 'text/javascript';
    conf.innerHTML = `atOptions = {
      'key' : 'f14c6a3108e0b7ec6f2387833f85f8b3',
      'format' : 'iframe',
      'height' : 600,
      'width' : 160,
      'params' : {}
    };`;

    script.type = 'text/javascript';
    script.src = 'https://www.highperformanceformat.com/f14c6a3108e0b7ec6f2387833f85f8b3/invoke.js';

    bannerRef.current.appendChild(conf);
    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div 
      ref={bannerRef} 
      className="w-[160px] h-[600px] mx-auto flex items-center justify-center border border-black bg-gray-100 text-xs text-black font-mono text-center overflow-hidden" 
    />
  );
};

export default function App() {
  const [apologies, setApologies] = useState<Apology[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>('hot');
  const getInitialPage = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = parseInt(params.get('page') || '1', 10);
      return isNaN(p) ? 1 : p;
    }
    return 1;
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const getTabFromHash = (): Page => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.replace('/', '');
    const hash = window.location.hash.replace('#', '');
    const active = path || hash;
    return (active === 'about' || active === 'contact' || active === 'privacy' || active === 'terms' || active === 'thesis' || active === 'architecture') ? active as Page : 'home';
  };

  const [activeTab, setActiveTab] = useState<Page>(getTabFromHash());
  const itemsPerPage = 25;

  // Sync state with hash changes
  useEffect(() => {
    const onHashChange = () => {
      setActiveTab(getTabFromHash());
    };
    const onPopState = () => {
      setCurrentPage(getInitialPage());
      setActiveTab(getTabFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // Update location when tab changes
  const changeTab = (tab: Page) => {
    const newPath = tab === 'home' ? '/' : `/${tab}`;
    window.history.pushState({}, '', newPath);
    setActiveTab(tab);
  };

  const changePage = (p: number) => {
    setCurrentPage(p);
    const url = new URL(window.location.href);
    url.searchParams.set('page', p.toString());
    window.history.pushState({}, '', url.toString());
  };

  // SEO Update Effect
  useEffect(() => {
    let title = 'Startup Apologies Directory | Track Corporate Failures | Techiral';
    let description = 'Founders take your money, they mess up, then they apologize. We index their failures in real-time so they cannot be forgotten. By Lakshya Gupta (Techiral).';
    let keywords = 'startup apologies, post-mortems, tech corporate failures, vc fund failures, lakshya gupta, techiral, accountability tracker';

    if (activeTab === 'about') {
      title = 'Why We Track Startup Apologies | The Abstract | Lakshya Gupta';
      description = 'They break things, write a PR apology, and expect you to forget. The Startup Apology Directory is an immutable ledger to hold them accountable.';
      keywords = 'startup accountability, tracker methodology, techiral lakshya gupta bio, why we index apologies, corporate pr failures';
    } else if (activeTab === 'contact') {
      title = 'Submit a Startup Apology | Contact Techiral';
      description = 'Did a company drop the ball? Submit their public apology. Direct communication channels for journalists, researchers, and whistleblowers.';
      keywords = 'contact lakshya gupta, submit startup apology, report tech failure, whistleblowing PR failures, techiral contact';
    } else if (activeTab === 'privacy') {
      title = 'Privacy Policy | Track Corporate Failures | Techiral';
      description = 'Privacy Policy for the Startup Apology Tracker. Algorithmic transparency and accountability protocols.';
      keywords = 'privacy policy, techiral accountability protocol, strict data logs';
    } else if (activeTab === 'terms') {
      title = 'Terms of Service | Track Corporate Failures | Techiral';
      description = 'Terms of Service for the Startup Apologies Tracker. Immutable ledger rules and regulations.';
      keywords = 'terms of service, techiral rules, PR disaster algorithms';
    } else if (activeTab === 'thesis') {
      title = 'Product Thesis | Track Corporate Failures | Techiral';
      description = 'Product Thesis Report for the Startup Apology Tracker. Why this problem exists and why we index the apology economy.';
      keywords = 'startup apologies, product thesis, b2b directory, PR accountability, techiral thesis, lakshya gupta research';
    } else if (activeTab === 'architecture') {
      title = 'Data Collection Architecture | Techiral';
      description = 'Data Collection Architecture Report. Exploring the algorithms, heuristics, and deduplication systems of our crawler.';
      keywords = 'spider algorithm, heuristic scraper, volatile score math, techiral architecture, data pipeline, lakshya gupta API proxy';
    }

    document.title = title;

    // Helper to update meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    
    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', window.location.href, true);
    
    // Twitter
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
  }, [activeTab]);

  // Reset page when sorting changes
  const isFirstMount = React.useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    changePage(1);
  }, [sortMode]);

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/apologies')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setApologies(data);
          } else {
            console.error("Data fetched is not an array:", data);
            setApologies([]);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    if (window.__INITIAL_DATA__) {
      setApologies(window.__INITIAL_DATA__);
      setLoading(false);
    } else {
      fetchData();
    }

    // Poll every 15 seconds for real-time effect
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const sortedApologies = useMemo(() => {
    return [...apologies].sort((a, b) => {
      if (sortMode === 'hot') {
        return b.points - a.points;
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [apologies, sortMode]);

  const totalPages = Math.max(1, Math.ceil(sortedApologies.length / itemsPerPage));
  const paginatedApologies = sortedApologies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPaginationControls = () => (
    <div className="w-full overflow-x-auto">
      <table width="100%" border={0} cellPadding={4} cellSpacing={0} style={{ minWidth: '500px', borderTop: '1px solid #000000', borderBottom: '1px solid #000000', marginTop: '10px', marginBottom: '10px', fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold' }}>
        <tbody>
          <tr>
            <td align="left">
              <span>PAGE {currentPage} OF {totalPages}</span>
              <span style={{ marginLeft: '10px', color: '#666666' }}>[{sortedApologies.length} Incident Records Found]</span>
            </td>
            <td align="right">
              {currentPage > 1 ? (
                <a href={`?page=${currentPage - 1}`} onClick={(e) => { e.preventDefault(); changePage(currentPage - 1); }}>
                  [ &lt;&lt; Previous Page ]
                </a>
              ) : (
                <span style={{ color: '#999999' }}>[ &lt;&lt; Previous Page ]</span>
              )}
              {" | "}
              {currentPage < totalPages ? (
                <a href={`?page=${currentPage + 1}`} onClick={(e) => { e.preventDefault(); changePage(currentPage + 1); }}>
                  [ Next Page &gt;&gt; ]
                </a>
              ) : (
                <span style={{ color: '#999999' }}>[ Next Page &gt;&gt; ]</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <table width="100%" border={0} cellPadding={0} cellSpacing={0} align="center" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <tbody>
          <tr>
            {/* Left Ad */}
            <td valign="top" width="160" className="hidden xl:table-cell pt-8">
              <div align="center" style={{ fontSize: '10px', color: '#666666', marginBottom: '5px', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '2px' }}>Advertisement</div>
              <AdsterraAd />
            </td>
            
            <td width="50" className="hidden xl:table-cell"></td>

            {/* Main Content */}
            <td valign="top" align="center" className="p-2 sm:p-5" style={{ width: '100%', maxWidth: '900px' }}>
              <div align="center" style={{ width: '100%', maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
                <center>
                  <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    Startup Apologies Directory
                  </h1>
                  <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>
                    They took your money. They messed up. Now they're sorry.
                  </p>
                  <p className="blink" style={{ color: '#ff0000', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '12px', marginBottom: '10px' }}>
                    [ INDEXED IN REAL-TIME ]
                  </p>
                </center>
                
                {/* Classic Nav Table */}
                <div className="w-full overflow-x-auto">
                  <table width="100%" bgcolor="#eeeeee" border={1} bordercolor="#cccccc" cellPadding={4} cellSpacing={0} style={{ minWidth: '400px', marginBottom: '20px' }}>
                    <tbody>
                      <tr>
                        <td align="center" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }}>
                          <a 
                            href="/"
                            onClick={(e) => { e.preventDefault(); changeTab('home'); }} 
                            style={{ textDecoration: activeTab === 'home' ? 'none' : 'underline', color: activeTab === 'home' ? '#000000' : '#0000ee', fontWeight: activeTab === 'home' ? 'bold' : 'normal', display: 'inline-block', margin: '0 4px' }}
                          >
                            Directory
                          </a>
                          {" | "}
                          <a 
                            href="/about"
                            onClick={(e) => { e.preventDefault(); changeTab('about'); }} 
                            style={{ textDecoration: activeTab === 'about' ? 'none' : 'underline', color: activeTab === 'about' ? '#000000' : '#0000ee', fontWeight: activeTab === 'about' ? 'bold' : 'normal', display: 'inline-block', margin: '0 4px' }}
                          >
                            About
                          </a>
                          {" | "}
                          <a 
                            href="/contact"
                            onClick={(e) => { e.preventDefault(); changeTab('contact'); }} 
                            style={{ textDecoration: activeTab === 'contact' ? 'none' : 'underline', color: activeTab === 'contact' ? '#000000' : '#0000ee', fontWeight: activeTab === 'contact' ? 'bold' : 'normal', display: 'inline-block', margin: '0 4px' }}
                          >
                            Contact
                          </a>
                          {" | "}
                          <a 
                            href="/privacy"
                            onClick={(e) => { e.preventDefault(); changeTab('privacy'); }} 
                            style={{ textDecoration: activeTab === 'privacy' ? 'none' : 'underline', color: activeTab === 'privacy' ? '#000000' : '#0000ee', fontWeight: activeTab === 'privacy' ? 'bold' : 'normal', display: 'inline-block', margin: '0 4px' }}
                          >
                            Privacy
                          </a>
                          {" | "}
                          <a 
                            href="/terms"
                            onClick={(e) => { e.preventDefault(); changeTab('terms'); }} 
                            style={{ textDecoration: activeTab === 'terms' ? 'none' : 'underline', color: activeTab === 'terms' ? '#000000' : '#0000ee', fontWeight: activeTab === 'terms' ? 'bold' : 'normal', display: 'inline-block', margin: '0 4px' }}
                          >
                            Terms
                          </a>
                          {" | "}
                          <a 
                            href="/thesis"
                            onClick={(e) => { e.preventDefault(); changeTab('thesis'); }} 
                            style={{ textDecoration: activeTab === 'thesis' ? 'none' : 'underline', color: activeTab === 'thesis' ? '#000000' : '#0000ee', fontWeight: activeTab === 'thesis' ? 'bold' : 'normal', display: 'inline-block', margin: '0 4px' }}
                          >
                            Thesis
                          </a>
                          {" | "}
                          <a 
                            href="/architecture"
                            onClick={(e) => { e.preventDefault(); changeTab('architecture'); }} 
                            style={{ textDecoration: activeTab === 'architecture' ? 'none' : 'underline', color: activeTab === 'architecture' ? '#000000' : '#0000ee', fontWeight: activeTab === 'architecture' ? 'bold' : 'normal', display: 'inline-block', margin: '0 4px' }}
                          >
                            Architecture
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {activeTab === 'about' ? (
                <About />
              ) : activeTab === 'contact' ? (
                <Contact />
              ) : activeTab === 'privacy' ? (
                <Privacy />
              ) : activeTab === 'terms' ? (
                <Terms />
              ) : activeTab === 'thesis' ? (
                <Thesis />
              ) : activeTab === 'architecture' ? (
                <Architecture />
              ) : (
                <div>
                  <div className="w-full overflow-x-auto">
                    <table width="100%" bgcolor="#eeeeee" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ minWidth: '400px', marginBottom: '10px' }}>
                      <tbody>
                        <tr>
                          <td align="left" style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                            <b>Directory Tools:</b>
                            {" | "}
                            <button 
                              onClick={() => setSortMode('hot')}
                              style={{ background: 'none', border: 'none', padding: 0, textDecoration: sortMode === 'hot' ? 'none' : 'underline', color: sortMode === 'hot' ? '#000000' : '#0000ee', fontWeight: sortMode === 'hot' ? 'bold' : 'normal', cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                              Sort by Viral
                            </button>
                            {" | "}
                            <button 
                              onClick={() => setSortMode('latest')}
                              style={{ background: 'none', border: 'none', padding: 0, textDecoration: sortMode === 'latest' ? 'none' : 'underline', color: sortMode === 'latest' ? '#000000' : '#0000ee', fontWeight: sortMode === 'latest' ? 'bold' : 'normal', cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                              Sort by Recent
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {loading ? (
                    <p style={{ fontFamily: 'monospace', color: '#0000ee' }} className="blink">Loading directory data... Please wait.</p>
                  ) : apologies.length === 0 ? (
                    <p style={{ fontFamily: 'monospace', color: '#ff0000' }}>Error 404: No apologies detected (suspiciously quiet).</p>
                  ) : (
                    <>
                      {renderPaginationControls()}
                      
                      <div className="w-full overflow-x-auto">
                        <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ minWidth: '600px', backgroundColor: '#ffffff', fontSize: '14px', marginTop: '10px', marginBottom: '10px' }}>
                          <thead>
                            <tr bgcolor="#cccccc" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                              <th width="50" align="center">Rank</th>
                              <th align="left">Incident / Apology Trace</th>
                              <th width="100" align="center">Timestamp</th>
                              <th width="80" align="center">Volatile Score</th>
                              <th width="100" align="center">Public Reactions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedApologies.map((item, index) => (
                              <tr key={item.id}>
                                <td align="center" style={{ fontWeight: 'bold' }}>
                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td align="left">
                                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                  </a>
                                  <br />
                                  <span style={{ fontSize: '10px', color: '#006600', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                    {item.url}
                                  </span>
                                </td>
                                <td align="center" style={{ fontSize: '12px' }}>
                                  {new Date(item.createdAt).toLocaleDateString('en-US', { 
                                    year: 'numeric', month: '2-digit', day: '2-digit' 
                                  })}
                                </td>
                                <td align="center" style={{ color: '#ff0000', fontWeight: 'bold', fontFamily: 'monospace' }}>
                                  {item.points}
                                </td>
                                <td align="center" style={{ fontFamily: 'monospace' }}>
                                  <a href={`https://news.ycombinator.com/item?id=${item.id}`} target="_blank" rel="noopener noreferrer">
                                    [{item.numComments} cmts]
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {renderPaginationControls()}
                    </>
                  )}
                </div>
              )}

              <hr size="1" color="#000000" style={{ marginTop: '20px', marginBottom: '10px' }} />
              <div align="center" style={{ fontSize: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                <p>Processed by Startup Apologies Spider Bot v1.0. All rights reserved.</p>
                <p>Developed by <b>Lakshya Gupta</b> (Techiral).</p>
                <p>
                  <a href="https://www.linkedin.com/in/techiral" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
                  <a href="https://github.com/lakshyabuilds" target="_blank" rel="noopener noreferrer">GitHub</a> | 
                  <a href="https://www.youtube.com/@lakshyabuild" target="_blank" rel="noopener noreferrer">YouTube 1</a> | 
                  <a href="https://www.youtube.com/@techiral" target="_blank" rel="noopener noreferrer">YouTube 2</a> | 
                  <a href="https://www.instagram.com/lakshya.build" target="_blank" rel="noopener noreferrer">Instagram</a>
                </p>
                <p>
                  <a href="/thesis" onClick={(e) => { e.preventDefault(); changeTab('thesis'); }}>Product Thesis</a> | 
                  <a href="/architecture" onClick={(e) => { e.preventDefault(); changeTab('architecture'); }}>Architecture</a> | 
                  <a href="/privacy" onClick={(e) => { e.preventDefault(); changeTab('privacy'); }}>Privacy Policy</a> | 
                  <a href="/terms" onClick={(e) => { e.preventDefault(); changeTab('terms'); }}>Terms of Service</a>
                </p>
                <p style={{ color: '#ff0000', fontWeight: 'bold' }}>
                  Don't screw up next time.
                </p>
                <p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: '#0000ee', textDecoration: 'underline', cursor: 'pointer' }}>
                    Return to top of page
                  </button>
                </p>
              </div>
            </td>

            {/* Spacer */}
            <td width="50" className="hidden xl:table-cell"></td>

            {/* Right Ad */}
            <td valign="top" width="160" className="hidden xl:table-cell pt-8">
              <div align="center" style={{ fontSize: '10px', color: '#666666', marginBottom: '5px', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '2px' }}>Advertisement</div>
              <AdsterraAd />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
