import React from 'react';

export default function About() {
  return (
    <article className="space-y-6">
      <section>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="bg-[#e0e0e0] p-2 border-2 border-outset border-gray-400 font-mono text-sm font-bold">
                <h2>[ 1. WHAT IS THIS? ]</h2>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-400 align-top bg-white font-serif text-base leading-relaxed">
                <p className="mb-4">
                  Tech companies take your money. They break your trust. Then they post an apology.
                </p>
                <p>
                  The <strong>Startup Apologies Directory</strong> tracks this exact cycle. Founders raise capital, push garbage updates, experience catastrophic failures, and then try to save face. The core measurement is simple: <em>"They took your money. They messed up. Now they're sorry."</em>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="bg-[#e0e0e0] p-2 border-2 border-outset border-gray-400 font-mono text-sm font-bold">
                <h2>[ 2. WHY THIS EXISTS ]</h2>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-400 align-top bg-white font-serif text-base leading-relaxed">
                <p className="mb-4">
                  Startups ship fast and break things. When they break things badly, they write a post-mortem to control the PR damage. Then the internet forgets.
                </p>
                <p>
                  This directory stops the amnesia. It’s an immutable public ledger. Once a company drops the ball and admits it, we log it forever. No escaping your track record. It serves as a reminder to investors, users, and whoever else cares that these companies are inherently flawed.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="bg-[#e0e0e0] p-2 border-2 border-outset border-gray-400 font-mono text-sm font-bold">
                <h2>[ 3. METHODOLOGY: THE VOLATILE SCORE ]</h2>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-400 align-top bg-white font-serif text-base leading-relaxed">
                <p className="mb-4">
                  We don't weigh soft metrics. We rank corporate failures using an automated index we call the <strong>Volatile Score</strong>. It's a mathematically direct reflection of public outrage, stripping away time-decay algorithms that let old news fade gracefully.
                </p>
                <div className="bg-gray-100 p-3 mb-4 font-mono text-sm border-l-4 border-red-500">
                  V = (P × 1.2) + (C × 2.5) + (Cv × 5.0)
                  <br />
                  <br />
                  Where:
                  <br />
                  - <strong>V</strong>: Volatile Score (Raw Crisis Magnitude)
                  <br />
                  - <strong>P</strong>: Absolute Hacker News Points (Upvotes - Downvotes)
                  <br />
                  - <strong>C</strong>: Total Comment Volume (Absolute Engagement)
                  <br />
                  - <strong>Cv</strong>: Comment Velocity (Comments per hour during peak outrage)
                </div>
                <p className="mb-4">
                  Unlike traditional ranking algorithms like Hacker News (<code>Score = (P - 1) / (T + 2)^1.5</code>) which use time-decay (T) so that old news slides off the front page, our Volatile Score <strong>eliminates T entirely</strong>. 
                </p>
                <p className="mb-4">
                  We heavily weight <strong>Comment Velocity (Cv)</strong>. Why? Because thousands of users furiously typing comments at once indicates a complete breakdown of trust, not just a casual upvote in passing. Raw points (P) establish reach, but furious engagement (C and Cv) establishes the depth of the PR carnage.
                </p>
                <p>
                  <strong>The bottom line:</strong> A high Volatile Score mathematically proves an intense, viral incident. These failures shouldn't fade away elegantly with time. This score makes them immutable.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="bg-[#e0e0e0] p-2 border-2 border-outset border-gray-400 font-mono text-sm font-bold">
                <h2>[ 4. HOW IT WORKS ALGORITHMICALLY ]</h2>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-400 align-top bg-white font-serif text-base leading-relaxed">
                <p className="mb-4">
                  There is no manual curation. It's fully automated by a bot.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2 font-mono text-sm">
                  <li><strong>The Scanner:</strong> A script constantly crawls platforms scanning for trigger phrases like <span className="bg-gray-200 px-1 border border-gray-400">"apology"</span>, <span className="bg-gray-200 px-1 border border-gray-400">"we messed up"</span>, and <span className="bg-gray-200 px-1 border border-gray-400">"post-mortem"</span>.</li>
                  <li><strong>The Indexer:</strong> We calculate the <strong>Volatile Score</strong>, cross-relate it with comment volume, and generate an immutable record.</li>
                  <li><strong>The Filter:</strong> We ignore boring product updates. We only log failures big enough to force a founder to publicly apologize.</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="bg-[#e0e0e0] p-2 border-2 border-outset border-gray-400 font-mono text-sm font-bold">
                <h2>[ 5. WHO BUILT THIS? ]</h2>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-400 align-top bg-white font-mono text-sm leading-relaxed">
                <p className="mb-2"><strong>Name:</strong> Lakshya Gupta</p>
                <p className="mb-2"><strong>Alias:</strong> Techiral</p>
                <p className="mb-4"><strong>Focus:</strong> I build agentic infrastructure, startups, and safe AI. I translate technical jargon for non-technical people, and I focus on creating projects that actually matter in real life.</p>
                
                <div className="border border-dashed border-gray-500 p-3 bg-[#f8f8f8]">
                  <strong>CONTACT:</strong>
                  <ul className="list-none ml-2 mt-2 space-y-1">
                    <li>► <a href="https://www.linkedin.com/in/techiral" className="text-[#0000EE] underline hover:text-[#FF0000]" target="_blank" rel="noopener noreferrer">View Lakshya's LinkedIn profile</a></li>
                    <li>► <a href="https://www.instagram.com/techiral" className="text-[#0000EE] underline hover:text-[#FF0000]" target="_blank" rel="noopener noreferrer">Follow Techiral on Instagram</a></li>
                    <li>► <a href="mailto:lakshya.automate@gmail.com" className="text-[#0000EE] underline hover:text-[#FF0000]">Send an email to lakshya.automate@gmail.com</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <div className="text-center font-mono text-xs text-gray-500 mt-8 mb-4 uppercase tracking-widest">
        End of Document
      </div>
    </article>
  );
}
