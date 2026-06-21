import React from 'react';

export default function Privacy() {
  return (
    <div>
      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" align="center" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ AUTOMATED PRIVACY POLICY ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <p style={{ margin: '10px 0', fontFamily: 'monospace', fontSize: '12px', color: '#666666' }}>
                Last Indexed & Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              
              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 1. DATA COLLECTION PROTOCOLS ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                The Startup Apologies Directory, sustained by Lakshya Gupta (Techiral), functions as an algorithmic read-only archiver. Unlike the corporations listed in this directory, we do not monetize hidden background telemetry.
              </p>
              <ul style={{ margin: '10px 0', paddingLeft: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
                <li><b>Log Analysis:</b> Vercel handles fundamental edge-network request routing.</li>
                <li><b>Zero Client-Side Tracking:</b> No Google Analytics, no Facebook Pixels, no silent tracking cookies.</li>
                <li><b>Public Indexing:</b> All stored apologies are harvested from open public API routes (e.g., Hacker News Algolia DB). No private user communications are logged.</li>
              </ul>
              
              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 2. THE RIGHT TO BE FORGOTTEN (DENIED) ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                A core tenet of this directory is algorithmic accountability. When a technology executive issues a public apology, it enters the public domain as a benchmark of consumer trust failure. 
                We do not honor automated takedown requests for PR sanitation. The Volatile Score is immutable. If you broke it, you own it.
              </p>

              <h3 style={{ fontFamily: 'monospace', fontSize: '14px', margin: '20px 0 10px 0', textDecoration: 'underline' }}>
                [ 3. THIRD-PARTY INFRASTRUCTURE ]
              </h3>
              <p style={{ margin: '10px 0' }}>
                The architecture relies on Vercel for hosting and Algolia for historical indexing constraints. Please consult their respective security disclosures for edge-network logging protocols.
              </p>
              
              <div align="center" style={{ margin: '20px 0', padding: '10px', border: '1px solid #999999', backgroundColor: '#f9f9f9', fontFamily: 'monospace', fontSize: '12px' }}>
                <b>INQUIRIES?</b> Contact the architect: lakshya.automate@gmail.com
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
