import React from 'react';

export default function Contact() {
  return (
    <div>
      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ DIRECT COMMUNICATION CHANNELS ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <p style={{ margin: '10px 0' }}>
                This directory is public infrastructure. If you hold relevant information, data, or media regarding unindexed corporate failures, submit them. 
              </p>
              <p style={{ margin: '10px 0' }}>
                <b>Journalists & Researchers:</b> If you are running an analysis on this data or need clarification on the indexing heuristics, reach out directly. Transparency is not debatable.
              </p>

              <table border={1} bordercolor="#999999" cellPadding={5} cellSpacing={0} bgcolor="#f9f9f9" style={{ margin: '10px 0', width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                      <p style={{ margin: '0 0 5px 0', textDecoration: 'underline', fontWeight: 'bold', textTransform: 'uppercase' }}>Contact Vectors</p>
                      ► <b>Email:</b> <a href="mailto:lakshya.automate@gmail.com">Send an email to lakshya.automate@gmail.com</a><br />
                      ► <b>LinkedIn:</b> <a href="https://www.linkedin.com/in/techiral" target="_blank" rel="noopener noreferrer">Message Lakshya Gupta on LinkedIn</a><br />
                      ► <b>Instagram:</b> <a href="https://www.instagram.com/techiral" target="_blank" rel="noopener noreferrer">DM @techiral on Instagram</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      <table width="100%" border={1} bordercolor="#000000" cellPadding={4} cellSpacing={0} style={{ marginBottom: '15px' }}>
        <tbody>
          <tr>
            <td bgcolor="#eeeeee" style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              [ SUBMISSION GUIDELINES ]
            </td>
          </tr>
          <tr>
            <td style={{ fontFamily: 'Times New Roman, Times, serif', fontSize: '14px', backgroundColor: '#ffffff' }}>
              <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                <li>Do not send marketing material or PR fluff.</li>
                <li>When submitting a failure event, include direct links to the public apology or incident report.</li>
                <li>State your intent clearly in the subject line.</li>
              </ul>
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
