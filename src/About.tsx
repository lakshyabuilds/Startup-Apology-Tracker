import React from 'react';

export default function About() {
  return (
    <div>
      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ 1. WHAT IS THIS? ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <p style={{ margin: '10px 0' }}>
                Tech companies take your money. They break your trust. Then they post an apology.
              </p>
              <p style={{ margin: '10px 0' }}>
                The <b>Startup Apologies Directory</b> tracks this exact cycle. Founders raise capital, push garbage updates, experience catastrophic failures, and then try to save face. The core measurement is simple: <i>"They took your money. They messed up. Now they're sorry."</i>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ 2. WHY THIS EXISTS ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <p style={{ margin: '10px 0' }}>
                Startups ship fast and break things. When they break things badly, they write a post-mortem to control the PR damage. Then the internet forgets.
              </p>
              <p style={{ margin: '10px 0' }}>
                This directory stops the amnesia. It's an immutable public ledger. Once a company drops the ball and admits it, we log it forever. No escaping your track record. It serves as a reminder to investors, users, and whoever else cares that these companies are inherently flawed.
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ 3. METHODOLOGY: THE VOLATILE SCORE ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <p style={{ margin: '10px 0' }}>
                We don't weigh soft metrics. We rank corporate failures using an automated index we call the <b>Volatile Score</b>. It's a mathematically direct reflection of public outrage, stripping away time-decay algorithms that let old news fade gracefully.
              </p>
              <table border={1} bordercolor="#999999" cellPadding={5} cellSpacing={0} bgcolor="#f9f9f9" style={{ margin: '10px 0', fontFamily: 'monospace', fontSize: '12px', width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      V = (P × 1.2) + (C × 2.5) + (Cv × 5.0)
                      <br /><br />
                      Where:<br />
                      - <b>V</b>: Volatile Score (Raw Crisis Magnitude)<br />
                      - <b>P</b>: Absolute Hacker News Points (Upvotes - Downvotes)<br />
                      - <b>C</b>: Total Comment Volume (Absolute Engagement)<br />
                      - <b>Cv</b>: Comment Velocity (Comments per hour during peak outrage)
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={{ margin: '10px 0' }}>
                Unlike traditional ranking algorithms like Hacker News (<code>Score = (P - 1) / (T + 2)^1.5</code>) which use time-decay (T) so that old news slides off the front page, our Volatile Score <b>eliminates T entirely</b>. 
              </p>
              <p style={{ margin: '10px 0' }}>
                We heavily weight <b>Comment Velocity (Cv)</b>. Why? Because thousands of users furiously typing comments at once indicates a complete breakdown of trust, not just a casual upvote in passing. Raw points (P) establish reach, but furious engagement (C and Cv) establishes the depth of the PR carnage.
              </p>
              <p style={{ margin: '10px 0' }}>
                <b>The bottom line:</b> A high Volatile Score mathematically proves an intense, viral incident. These failures shouldn't fade away elegantly with time. This score makes them immutable.
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ 4. HOW IT WORKS ALGORITHMICALLY ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <p style={{ margin: '10px 0' }}>
                There is no manual curation. It's fully automated by a bot.
              </p>
              <ul style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                <li><b>The Scanner:</b> A script constantly crawls platforms scanning for trigger phrases like "apology", "we messed up", and "post-mortem".</li>
                <li><b>The Indexer:</b> We calculate the <b>Volatile Score</b>, cross-relate it with comment volume, and generate an immutable record.</li>
                <li><b>The Filter:</b> We ignore boring product updates. We only log failures big enough to force a founder to publicly apologize.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ 5. WHO BUILT THIS? ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'monospace', fontSize: '12px', backgroundColor: '#ffffff' }}>
              <p style={{ margin: '5px 0' }}><b>Name:</b> Lakshya Gupta</p>
              <p style={{ margin: '5px 0' }}><b>Alias:</b> Techiral</p>
              <p style={{ margin: '5px 0' }}><b>Focus:</b> I build agentic infrastructure, startups, and safe AI. I translate technical jargon for non-technical people, and I focus on creating projects that actually matter in real life.</p>
              
              <table border={1} bordercolor="#999999" cellPadding={5} cellSpacing={0} bgcolor="#f9f9f9" style={{ margin: '10px 0', width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <b>CONTACT:</b><br />
                      ► <a href="https://www.linkedin.com/in/techiral" target="_blank" rel="noopener noreferrer">View Lakshya's LinkedIn profile</a><br />
                      ► <a href="https://www.instagram.com/techiral" target="_blank" rel="noopener noreferrer">Follow Techiral on Instagram</a><br />
                      ► <a href="mailto:lakshya.automate@gmail.com">Send an email to lakshya.automate@gmail.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div align="center" style={{ fontFamily: 'monospace', fontSize: '10px', color: '#666666', marginTop: '20px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>
        End of Document
      </div>
    </div>
  );
}
