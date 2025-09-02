import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800/50 shadow-sm">
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <SparklesIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Receipt Extractor AI
          </h1>
        </div>
        <p className="mt-2 text-md text-slate-600 dark:text-slate-300">
          Paste your receipt text below and let AI extract the details for you.
        </p>
      </div>
    </header>
  );
};

export default Header;
