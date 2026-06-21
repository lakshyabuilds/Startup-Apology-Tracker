import React from 'react';

export default function Contact() {
  return (
    <article className="space-y-6">
      <section>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="bg-[#e0e0e0] p-2 border-2 border-outset border-gray-400 font-mono text-sm font-bold">
                <h2>[ DIRECT COMMUNICATION CHANNELS ]</h2>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-400 align-top bg-white font-serif text-base leading-relaxed">
                <p className="mb-4">
                  This directory is public infrastructure. If you hold relevant information, data, or media regarding unindexed corporate failures, submit them. 
                </p>
                <p className="mb-4">
                  <strong>Journalists & Researchers:</strong> If you are running an analysis on this data or need clarification on the indexing heuristics, reach out directly. Transparency is not debatable.
                </p>

                <div className="border border-dashed border-gray-500 p-4 bg-[#f8f8f8] font-mono text-sm">
                  <div className="mb-2 uppercase underline font-bold">Contact Vectors</div>
                  <ul className="list-none ml-2 space-y-2">
                    <li>
                      ► <strong>Email:</strong> <a href="mailto:lakshya.automate@gmail.com" className="text-[#0000EE] underline hover:text-[#FF0000]">Send an email to lakshya.automate@gmail.com</a>
                    </li>
                    <li>
                      ► <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/techiral" className="text-[#0000EE] underline hover:text-[#FF0000]" target="_blank" rel="noopener noreferrer">Message Lakshya Gupta on LinkedIn</a>
                    </li>
                    <li>
                      ► <strong>Instagram:</strong> <a href="https://www.instagram.com/techiral" className="text-[#0000EE] underline hover:text-[#FF0000]" target="_blank" rel="noopener noreferrer">DM @techiral on Instagram</a>
                    </li>
                  </ul>
                </div>
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
                <h2>[ SUBMISSION GUIDELINES ]</h2>
              </td>
            </tr>
            <tr>
              <td className="p-4 border border-gray-400 align-top bg-white font-serif text-base leading-relaxed">
                <ul className="list-disc list-inside space-y-2">
                  <li>Do not send marketing material or PR fluff.</li>
                  <li>When submitting a failure event, include direct links to the public apology or incident report.</li>
                  <li>State your intent clearly in the subject line.</li>
                </ul>
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
