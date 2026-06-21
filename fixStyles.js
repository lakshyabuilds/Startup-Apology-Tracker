const fs = require('fs');

const files = ['src/Privacy.tsx', 'src/Terms.tsx', 'src/Thesis.tsx', 'src/Architecture.tsx', 'src/Contact.tsx', 'src/About.tsx'];

files.forEach(file => {
  let text = fs.readFileSync(file, 'utf8');
  
  // Table
  text = text.replace(/<table className="w-full\s+mb-8">/g, '<table className="w-full border-collapse border border-black bg-white mb-8">');
  text = text.replace(/<table className="w-full\s*">/g, '<table className="w-full border-collapse border border-black bg-white mb-4">');

  // Title row
  text = text.replace(/<td className="p-2\s+font-mono text-lg font-bold text-center uppercase tracking-wide">/g, '<td className="p-2 bg-gray-100 border-b border-black font-mono text-lg font-bold text-center uppercase tracking-wide">');
  text = text.replace(/<td className="p-2\s+font-mono text-sm font-bold">/g, '<td className="p-2 bg-gray-100 border-b border-black font-mono text-sm font-bold">');
  
  // Section headers
  text = text.replace(/<h2 className="font-bold font-mono\s+p-1\s+mt-6 mb-2">/g, '<h2 className="font-bold font-mono bg-gray-100 border border-black p-1 mt-6 mb-2">');
  text = text.replace(/<h2 className="font-bold font-mono\s+p-1\s+mb-2">/g, '<h2 className="font-bold font-mono bg-gray-100 border border-black p-1 mt-6 mb-2">');
  text = text.replace(/<h2 className="font-bold font-mono\s+p-1\s+uppercase mb-4">/g, '<h2 className="font-bold font-mono bg-gray-100 border border-black p-1 mb-4 uppercase">');
  
  // Body cell
  text = text.replace(/<td className="p-4\s+align-top\s+font-serif/g, '<td className="p-4 align-top font-serif');
  text = text.replace(/<td className="p-4\s+align-top\s+font-mono/g, '<td className="p-4 align-top font-mono');
  
  // Blockquotes / special texts
  text = text.replace(/<p className="mb-4 text-gray-700 font-mono text-sm\s+pl-2">/g, '<p className="mb-4 text-gray-700 font-mono text-sm border-l-2 border-black pl-2">');
  text = text.replace(/<div className="p-3 mb-4 font-mono text-sm\s*">/g, '<div className="p-3 mb-4 font-mono text-sm border-l-2 border-black bg-gray-50">');
  text = text.replace(/<div className="p-4 font-mono text-sm mt-8\s+text-center">/g, '<div className="p-4 border border-black bg-gray-50 font-mono text-sm mt-8 text-center">');
  text = text.replace(/<div className="p-4\s+bg-\[#f8f8f8\] font-mono text-sm">/g, '<div className="p-4 border border-black bg-gray-50 font-mono text-sm">');
  text = text.replace(/<div className="p-3\s+bg-\[#f8f8f8\]">/g, '<div className="p-3 border border-black bg-gray-50">');
  
  fs.writeFileSync(file, text);
});
console.log('Fixed styles.');
