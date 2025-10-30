import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from './icons';

interface NoteOutputProps {
  generatedNote: string;
  isLoading: boolean;
  error: string | null;
}

const OutputSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-5">
    <div className="h-5 bg-slate-700 rounded w-1/4"></div>
    <div className="space-y-3">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
    </div>
    <div className="h-5 bg-slate-700 rounded w-1/3 mt-4"></div>
    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
  </div>
);

export const NoteOutput: React.FC<NoteOutputProps> = ({ generatedNote, isLoading, error }) => {
  const [copied, setCopied] = useState(false);
  const [parsedNote, setParsedNote] = useState({ title: '', narrative: '', cptTitle: '', cptCodes: [] as string[] });

  useEffect(() => {
    if (generatedNote) {
      const lines = generatedNote.split('\n').filter(line => line.trim() !== '');
      const title = lines[0] || '';
      const narrative = lines[1] || '';
      const cptTitleIndex = lines.findIndex(line => line.toLowerCase().includes('cpt code'));
      
      let cptTitle = '';
      let cptCodes: string[] = [];
      if (cptTitleIndex !== -1) {
          cptTitle = lines[cptTitleIndex];
          cptCodes = lines.slice(cptTitleIndex + 1);
      }
      
      setParsedNote({ title, narrative, cptTitle, cptCodes });
    } else {
        setParsedNote({ title: '', narrative: '', cptTitle: '', cptCodes: [] });
    }
  }, [generatedNote]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasContent = generatedNote && !isLoading && !error;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-200">
          Generated Documentation
        </h2>
        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-1.5 border border-slate-600 text-sm font-medium rounded-md text-blue-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 transition-colors"
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <ClipboardIcon className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 min-h-[200px] relative">
        {isLoading && <OutputSkeleton />}
        
        {error && <p className="text-red-400">{error}</p>}
        
        {!isLoading && !error && !generatedNote && (
          <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full pt-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-base">Your generated note will appear here.</p>
          </div>
        )}

        {hasContent && (
          <div className="space-y-4 text-slate-300">
            <h3 className="font-bold text-xl text-blue-400">{parsedNote.title}</h3>
            <p className="leading-relaxed text-base">{parsedNote.narrative}</p>
            {parsedNote.cptTitle && (
              <div>
                <h4 className="font-semibold text-lg text-slate-200">{parsedNote.cptTitle}</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-base">
                  {parsedNote.cptCodes.map((code, index) => (
                    <li key={index}>{code}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};