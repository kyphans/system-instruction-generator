import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ResponseView } from './components/ResponseView';
import { HistoryTable } from './components/HistoryTable';
import type { HistoryEntry, ApiResponse } from './types';
import { Footer } from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('promptHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('promptHistory', JSON.stringify(history));
  }, [history]);

  const handleSubmit = async (systemInstruction: string, prompt: string, apiKey: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
          apiKey || import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You will write System Instructions for ${prompt} with system instruction: ${systemInstruction}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data: ApiResponse = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      setResponse(generatedText);

      const newEntry: HistoryEntry = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        systemInstruction,
        userPrompt: prompt,
        response: generatedText
      };

      setHistory((prev) => [newEntry, ...prev]);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while generating the response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='min-h-screen bg-[#e5e1ff]'>
        <Toaster position='top-right' />
        <Header />

        <main className='container mx-auto px-4 py-8 max-w-full md:max-w-7xl'>
          <div className='grid gap-8'>
            <div className='bg-white rounded-lg shadow-lg p-6'>
              <PromptForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            <ResponseView response={response} isLoading={isLoading} />

            <HistoryTable history={history} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
