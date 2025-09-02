import React from 'react';
import type { ReceiptData } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { JsonIcon } from './icons/JsonIcon';

interface ResultDisplayProps {
  streamingResult: string;
  finalData: ReceiptData | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ streamingResult, finalData, isLoading, error }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (finalData) {
      navigator.clipboard.writeText(JSON.stringify(finalData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-500 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-lg font-semibold">An Error Occurred</p>
          <p className="text-center text-sm">{error}</p>
        </div>
      );
    }
    
    const displayText = finalData ? JSON.stringify(finalData, null, 2) : streamingResult;
    
    if (isLoading || displayText) {
      return (
        <div className="relative h-full">
           {finalData && (
            <>
              <button onClick={handleCopy} title="Copy JSON" className="absolute top-2 right-2 p-2 rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition text-slate-600 dark:text-slate-300 z-10">
                <ClipboardIcon className="w-5 h-5" />
                <span className="sr-only">Copy JSON</span>
              </button>
              {copied && <span className="absolute top-3 right-12 text-xs bg-green-500/90 text-white px-2 py-0.5 rounded z-10">Copied!</span>}
            </>
           )}
          <pre className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg overflow-x-auto text-sm language-json h-full">
            <code>
              {displayText}
              {isLoading && <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1" aria-hidden="true"></span>}
            </code>
          </pre>
        </div>
      );
    }


    return (
       <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6">
          <JsonIcon className="w-12 h-12 mb-4 text-slate-400 dark:text-slate-500" />
          <p className="text-lg font-medium">Awaiting Data</p>
          <p className="text-sm">Your extracted JSON data will appear here.</p>
        </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-full">
      <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Extracted Data</h2>
      <div className="h-[25rem] font-mono">{renderContent()}</div>
    </div>
  );
};

export default ResultDisplay;