import React from 'react';

export default function Thesis() {
  return (
    <div>
      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" align="center" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ PRODUCT THESIS REPORT ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 1. WHY THIS PROBLEM EXISTS ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                The tech industry operates on a cycle of "move fast and break things," but the "breaking" often involves user data, financial security, or foundational trust. When the inevitable fallout occurs, companies deploy highly sanitized PR apologies. Once the news cycle shifts, these apologies fade into the abyss of algorithmic decay. The overarching problem is the absolute lack of an immutable, easily accessible ledger for corporate failures that resists time-decay.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 2. WHY APOLOGIES AND POST-MORTEMS MATTER ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                Post-mortems and apologies are the closest the industry gets to an empirical admission of guilt. They contain the technical timeline of failure and the public measurement of consumer outrage. By tracking these autonomously, we establish a permanent benchmark for corporate fallibility and engineering accountability before PR firms can sanitize history.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 3. WHY FOUNDERS WOULD USE IT ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                Founders utilize this directory as a defensive, high-signal research tool. By studying the historical PR failures of their competitors or predecessors, they learn what breaks, how consumers realistically react, and what language escalates or diffuses tension. It acts as a catalog of lethal anti-patterns in corporate communication, engineering, and trust.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 4. WHY JOURNALISTS WOULD USE IT ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                Investigative journalists require historical precedent. When a company fails repeatedly, this directory instantly provides the raw, indexed history of their previous apologies, complete with the Volatile Score (the metric of public outrage at the exact time of the event). It fundamentally prevents corporations from rewriting their narrative history.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 5. WHY RESEARCHERS WOULD USE IT ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                Academic analysts, algorithmic auditors, and security researchers use this normalized data to observe systemic trends in software infrastructure failures. It provides a robust, pre-cleaned dataset for linguistic analysis of PR evasion tactics and quantitative analysis of community trust mechanics.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 6. WHY THE NICHE IS LARGE ENOUGH ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                Corporate failure is not a niche; it is an inevitability of scale. Thousands of startups and enterprises face multi-million dollar liabilities annually. The "apology economy" is a persistent, high-stakes element of tech culture. A centralized tech-brutalist database indexing this exact failure state holds massive long-term value for a B2B audience spanning PR firms, VC due diligence analysts, and competitive intelligence teams.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
