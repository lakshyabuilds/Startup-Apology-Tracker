import React, { useState, useEffect, useMemo } from 'react';
import { Apology } from './types';
import About from './About';
import Contact from './Contact';
import Privacy from './Privacy';
import Terms from './Terms';

type SortMode = 'hot' | 'latest';
type Page = 'home' | 'about' | 'contact' | 'privacy' | 'terms';

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
    return (active === 'about' || active === 'contact' || active === 'privacy' || active === 'terms') ? active as Page : 'home';
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
    if (window.__INITIAL_DATA__) {
      setApologies(window.__INITIAL_DATA__);
      setLoading(false);
    } else {
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
    }
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
    <div className="font-mono text-sm flex justify-between items-center py-2 bg-[#e0e0e0] border-2 border-outset border-gray-400 p-2 mt-2 font-bold">
      <div>
        <span className="bg-black text-white px-1">PAGE {currentPage} OF {totalPages}</span>
        <span className="ml-4 text-gray-700">[{sortedApologies.length} Incident Records Found]</span>
      </div>
      <div>
        {currentPage > 1 ? (
          <a href={`?page=${currentPage - 1}`} onClick={(e) => { e.preventDefault(); changePage(currentPage - 1); }} className="text-[#0000EE] hover:text-[#FF0000] underline">
            [ &lt;&lt; Previous Page ]
          </a>
        ) : (
          <span className="text-gray-500">[ &lt;&lt; Previous Page ]</span>
        )}
        <span className="mx-2">|</span>
        {currentPage < totalPages ? (
          <a href={`?page=${currentPage + 1}`} onClick={(e) => { e.preventDefault(); changePage(currentPage + 1); }} className="text-[#0000EE] hover:text-[#FF0000] underline">
            [ Next Page &gt;&gt; ]
          </a>
        ) : (
          <span className="text-gray-500">[ Next Page &gt;&gt; ]</span>
        )}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-black font-serif container mx-auto p-4 max-w-5xl">
      <header className="border-b-4 border-black pb-4 mb-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">
            *** Startup Apologies Directory ***
          </h1>
          <p className="font-mono text-sm underline pb-2">
            They took your money. They messed up. Now they're sorry.
          </p>
          <div className="mt-2 text-[#FF0000] font-bold font-mono text-sm blink inline-block border border-[#FF0000] p-1 mb-2">
            [ INDEXED IN REAL-TIME ]
          </div>
          <nav className="font-mono text-sm mt-2 mb-2" aria-label="Primary Navigation">
            <a 
              href="/"
              onClick={(e) => { e.preventDefault(); changeTab('home'); }} 
              className={`hover:text-[#FF0000] ${activeTab === 'home' ? 'text-black font-bold no-underline' : 'text-[#0000EE] underline'}`}
            >
              [ Directory ]
            </a>
            <span className="mx-2 text-black">|</span>
            <a 
              href="/about"
              onClick={(e) => { e.preventDefault(); changeTab('about'); }} 
              className={`hover:text-[#FF0000] ${activeTab === 'about' ? 'text-black font-bold no-underline' : 'text-[#0000EE] underline'}`}
            >
              [ About ]
            </a>
            <span className="mx-2 text-black">|</span>
            <a 
              href="/contact"
              onClick={(e) => { e.preventDefault(); changeTab('contact'); }} 
              className={`hover:text-[#FF0000] ${activeTab === 'contact' ? 'text-black font-bold no-underline' : 'text-[#0000EE] underline'}`}
            >
              [ Contact ]
            </a>
            <span className="mx-2 text-black">|</span>
            <a 
              href="/privacy"
              onClick={(e) => { e.preventDefault(); changeTab('privacy'); }} 
              className={`hover:text-[#FF0000] ${activeTab === 'privacy' ? 'text-black font-bold no-underline' : 'text-[#0000EE] underline'}`}
            >
              [ Privacy ]
            </a>
            <span className="mx-2 text-black">|</span>
            <a 
              href="/terms"
              onClick={(e) => { e.preventDefault(); changeTab('terms'); }} 
              className={`hover:text-[#FF0000] ${activeTab === 'terms' ? 'text-black font-bold no-underline' : 'text-[#0000EE] underline'}`}
            >
              [ Terms ]
            </a>
          </nav>
        </div>
      </header>

      {activeTab === 'about' ? (
        <About />
      ) : activeTab === 'contact' ? (
        <Contact />
      ) : activeTab === 'privacy' ? (
        <Privacy />
      ) : activeTab === 'terms' ? (
        <Terms />
      ) : (
        <section aria-label="Directory Content">
          <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="bg-[#e0e0e0] p-2 border-2 border-outset border-gray-400 font-mono text-sm">
              <b>Directory Tools:</b>
              <span className="mx-2">|</span>
              <button 
                onClick={() => setSortMode('hot')}
                className={`underline hover:text-[#FF0000] ${sortMode === 'hot' ? 'font-bold text-black no-underline' : 'text-[#0000EE]'}`}
              >
                Sort by Viral
              </button>
              <span className="mx-2">|</span>
              <button 
                onClick={() => setSortMode('latest')}
                className={`underline hover:text-[#FF0000] ${sortMode === 'latest' ? 'font-bold text-black no-underline' : 'text-[#0000EE]'}`}
              >
                Sort by Recent
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {loading ? (
        <p className="font-mono pt-4 text-[#0000EE] blink">Loading directory data... Please wait.</p>
      ) : apologies.length === 0 ? (
        <p className="font-mono pt-4 text-[#FF0000]">Error 404: No apologies detected (suspiciously quiet).</p>
      ) : (
        <>
          {renderPaginationControls()}
          
          <div className="border border-black p-1 shadow-[4px_4px_0_0_#000] mt-4 mb-4">
              <table className="w-full border-collapse text-sm bg-white">
              <thead>
                  <tr className="bg-[#c0c0c0] font-mono text-black">
                  <th className="border border-gray-500 p-2 text-center w-12 border-style-outset">Rank</th>
                  <th className="border border-gray-500 p-2 text-left border-style-outset">Incident / Apology Trace</th>
                  <th className="border border-gray-500 p-2 text-center w-32 border-style-outset">Timestamp</th>
                  <th className="border border-gray-500 p-2 text-center w-24 border-style-outset">Volatile Score</th>
                  <th className="border border-gray-500 p-2 text-center w-28 border-style-outset">Public Reactions</th>
                  </tr>
              </thead>
              <tbody>
                  {paginatedApologies.map((item, index) => (
                  <tr key={item.id} className="hover:bg-[#ffffcc]">
                      <td className="border border-gray-400 p-2 text-center font-mono font-bold text-gray-700 bg-gray-100">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="border border-gray-400 p-2">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#0000EE] underline hover:text-[#FF0000] text-base font-medium font-serif leading-snug">
                          {item.title}
                      </a>
                      <div className="text-xs text-[#006600] mt-1 font-mono break-all">
                          {item.url}
                      </div>
                      </td>
                      <td className="border border-gray-400 p-2 text-center font-mono text-xs whitespace-nowrap text-gray-800">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', month: '2-digit', day: '2-digit' 
                              })}
                      </td>
                      <td className="border border-gray-400 p-2 text-center font-bold text-[#FF0000] font-mono">
                      {item.points}
                      </td>
                      <td className="border border-gray-400 p-2 text-center font-mono">
                      <a href={`https://news.ycombinator.com/item?id=${item.id}`} target="_blank" rel="noopener noreferrer" className="text-[#0000EE] underline hover:text-[#551A8B]">
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
      </section>
      )}

      <footer className="mt-12 border-t-4 border-black pt-4 text-center font-mono text-xs pb-12">
        <p>Processed by Startup Apologies Spider Bot v1.0. All right reserved.</p>
        <p className="mt-2 text-gray-700">
          Developed by <strong>Lakshya Gupta</strong> (Techiral). 18-year-old developer turning data into reality.
        </p>
        <div className="flex justify-center gap-4 mt-2 mb-2 text-[#0000EE] flex-wrap">
          <a href="https://www.linkedin.com/in/techiral" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FF0000]">Lakshya's LinkedIn profile</a>
          <a href="https://github.com/lakshyabuilds" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FF0000]">Lakshya's GitHub projects</a>
          <a href="https://www.youtube.com/@lakshyabuild" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FF0000]">YouTube channel (@lakshyabuild)</a>
          <a href="https://www.youtube.com/@techiral" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FF0000]">YouTube channel (@techiral)</a>
          <a href="https://www.instagram.com/lakshya.build" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#FF0000]">Lakshya's Instagram page</a>
        </div>
        <div className="flex justify-center gap-4 mt-2 mb-2 text-[#0000EE] flex-wrap uppercase font-bold text-[10px]">
          <a href="/privacy" onClick={(e) => { e.preventDefault(); changeTab('privacy'); }} className="underline hover:text-[#FF0000]">Privacy Policy</a>
          <span className="text-black">|</span>
          <a href="/terms" onClick={(e) => { e.preventDefault(); changeTab('terms'); }} className="underline hover:text-[#FF0000]">Terms of Service</a>
        </div>
        <p className="mt-2 font-bold text-[#FF0000] uppercase pt-2">Don't screw up next time.</p>
        <p className="mt-6 mb-8">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="text-[#0000EE] underline hover:text-[#FF0000]"
          >
            Return to top of page
          </button>
        </p>
      </footer>
    </main>
  );
}
