import React from 'react';

export default function Privacy() {
  return (
    <section aria-label="Privacy Policy" className="mt-8">
      <table className="w-full border-collapse shadow-[4px_4px_0_0_#000] border border-black mb-8 bg-white">
        <tbody>
          <tr>
            <td className="bg-[#e0e0e0] p-2 border-2 border-outset border-gray-400 font-mono text-lg font-bold text-center uppercase tracking-wide">
              <h1>[ AUTOMATED PRIVACY POLICY ]</h1>
            </td>
          </tr>
          <tr>
            <td className="p-4 border border-gray-400 align-top bg-white font-serif text-base leading-relaxed">
              <p className="mb-4 text-gray-700 font-mono text-sm border-l-4 border-black pl-2">
                Last Indexed & Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              
              <h2 className="font-bold font-mono bg-[#c0c0c0] p-1 border border-gray-500 mt-6 mb-2">[ 1. DATA COLLECTION PROTOCOLS ]</h2>
              <p className="mb-4">
                The Startup Apologies Directory, sustained by Lakshya Gupta (Techiral), functions as an algorithmic read-only archiver. Unlike the corporations listed in this directory, we do not monetize hidden background telemetry.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 font-mono text-sm mb-4">
                <li><strong>Log Analysis:</strong> Vercel handles fundamental edge-network request routing.</li>
                <li><strong>Zero Client-Side Tracking:</strong> No Google Analytics, no Facebook Pixels, no silent tracking cookies.</li>
                <li><strong>Public Indexing:</strong> All stored apologies are harvested from open public API routes (e.g., Hacker News Algolia DB). No private user communications are logged.</li>
              </ul>
              
              <h2 className="font-bold font-mono bg-[#c0c0c0] p-1 border border-gray-500 mt-6 mb-2">[ 2. THE RIGHT TO BE FORGOTTEN (DENIED) ]</h2>
              <p className="mb-4">
                A core tenet of this directory is algorithmic accountability. When a technology executive issues a public apology, it enters the public domain as a benchmark of consumer trust failure. 
                We do not honor automated takedown requests for PR sanitation. The Volatile Score is immutable. If you broke it, you own it.
              </p>

              <h2 className="font-bold font-mono bg-[#c0c0c0] p-1 border border-gray-500 mt-6 mb-2">[ 3. THIRD-PARTY INFRASTRUCTURE ]</h2>
              <p className="mb-4">
                The architecture relies on Vercel for hosting and Algolia for historical indexing constraints. Please consult their respective security disclosures for edge-network logging protocols.
              </p>
              
              <div className="bg-gray-100 p-4 font-mono text-sm mt-8 border-2 border-dashed border-gray-400 text-center">
                <strong>INQUIRIES?</strong> Contact the architect: lakshya.automate@gmail.com
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
