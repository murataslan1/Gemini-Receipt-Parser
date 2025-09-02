import React from 'react';

interface ReceiptInputProps {
  receiptText: string;
  setReceiptText: (text: string) => void;
  onExtract: () => void;
  onUseSample: () => void;
  isLoading: boolean;
}

const ReceiptInput: React.FC<ReceiptInputProps> = ({ receiptText, setReceiptText, onExtract, onUseSample, isLoading }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Receipt Text</h2>
        <button
          onClick={onUseSample}
          disabled={isLoading}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Use Sample
        </button>
      </div>
      <textarea
        value={receiptText}
        onChange={(e) => setReceiptText(e.target.value)}
        placeholder={`Paste a receipt here, or click "Use Sample" to try it out.`}
        className="flex-grow w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg resize-none bg-slate-50 dark:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
        rows={15}
        disabled={isLoading}
      />
      <button
        onClick={onExtract}
        disabled={isLoading || !receiptText}
        className="mt-4 w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 disabled:bg-slate-400 dark:disabled:bg-slate-600"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Extracting...
          </>
        ) : (
          'Extract Data'
        )}
      </button>
    </div>
  );
};

export default ReceiptInput;