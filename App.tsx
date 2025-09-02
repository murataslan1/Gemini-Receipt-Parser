import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ReceiptInput from './components/ReceiptInput';
import ResultDisplay from './components/ResultDisplay';
import { extractReceiptDataStream } from './services/geminiService';
import type { ReceiptData } from './types';

const sampleReceipt = `Example Receipt:
The Corner Cafe
123 Main Street
Anytown, USA 12345

Date: 08/15/2024
Time: 12:30 PM

1x Cappuccino   $4.50
2x Croissant    $5.00
1x Avocado Toast $8.75

Subtotal: $18.25
Tax (5%):  $0.91
------------------
TOTAL:    $19.16
`;

const App: React.FC = () => {
  const [receiptText, setReceiptText] = useState<string>('');
  const [streamingResult, setStreamingResult] = useState<string>('');
  const [finalData, setFinalData] = useState<ReceiptData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = useCallback(async () => {
    if (!receiptText.trim()) {
      setError('Please paste some receipt text first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setStreamingResult('');
    setFinalData(null);
    let fullResponse = '';

    try {
      const stream = extractReceiptDataStream(receiptText);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setStreamingResult(fullResponse);
      }
      const parsedData = JSON.parse(fullResponse);
      setFinalData(parsedData);
    } catch (err) {
      console.error(err);
       if (err instanceof SyntaxError) {
        setError(`The AI returned incomplete or invalid JSON. Please try again or adjust the input text. Parser error: ${err.message}`);
      } else {
        setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [receiptText]);

  const handleUseSample = useCallback(() => {
    setReceiptText(sampleReceipt);
    setError(null);
    setStreamingResult('');
    setFinalData(null);
  }, []);


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:pr-4">
            <ReceiptInput
              receiptText={receiptText}
              setReceiptText={setReceiptText}
              onExtract={handleExtract}
              onUseSample={handleUseSample}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:pl-4">
            <ResultDisplay
              streamingResult={streamingResult}
              finalData={finalData}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
        <footer className="text-center mt-12 text-slate-500 dark:text-slate-400 text-sm">
          <p>Powered by Google Gemini API. Created for demonstration purposes.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;