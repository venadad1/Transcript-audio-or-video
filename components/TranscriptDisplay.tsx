import React, { useState } from 'react';
import { Copy, Download, Check, FileText } from 'lucide-react';

interface TranscriptDisplayProps {
  text: string;
}

// Declare jsPDF on window to avoid TS errors with CDN
declare global {
  interface Window {
    jspdf: any;
  }
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPdf = () => {
    // Check if jsPDF is loaded via CDN
    if (window.jspdf && window.jspdf.jsPDF) {
      const doc = new window.jspdf.jsPDF();
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxLineWidth = pageWidth - margin * 2;
      
      doc.setFontSize(16);
      doc.setTextColor(88, 28, 135); // Purple 900
      doc.text("Transcript", margin, 20);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      
      const splitText = doc.splitTextToSize(text, maxLineWidth);
      doc.text(splitText, margin, 35);
      
      doc.save("transcript.pdf");
    } else {
      alert("PDF library is still loading or unavailable. Please try downloading as TXT.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-purple-600" />
          Transcript
        </h2>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 py-2 border border-slate-200 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </button>
          
          <div className="relative group flex-1 sm:flex-none">
            <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-purple-200 shadow-sm text-sm font-medium rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 transform origin-top-right">
              <div className="py-1" role="menu">
                <button
                  onClick={handleDownloadPdf}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                  role="menuitem"
                >
                  Download as PDF
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                  role="menuitem"
                >
                  Download as TXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative rounded-2xl border border-slate-200 bg-slate-50 shadow-inner">
        <textarea
          readOnly
          value={text}
          className="w-full h-96 p-6 rounded-2xl bg-slate-50 text-slate-800 text-base leading-relaxed focus:outline-none resize-none font-sans"
          style={{ minHeight: '400px' }}
        />
      </div>
    </div>
  );
};

export default TranscriptDisplay;