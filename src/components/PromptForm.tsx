import React, { useState } from 'react';
import { Send, Copy, RotateCcw, Settings } from 'lucide-react';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import defaultData from '../data/systemInstructionDefault.json';
import toast from 'react-hot-toast';

interface PromptFormProps {
  onSubmit: (systemInstruction: string, prompt: string, apiKey: string) => Promise<void>;
  isLoading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const [systemInstruction, setSystemInstruction] = useState(defaultData.defaultInstruction);
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    if (!apiKey.trim() && !import.meta.env.VITE_GEMINI_API_KEY) {
      toast.error('Please enter the API key');
      return;
    }
    await onSubmit(systemInstruction, prompt, apiKey || import.meta.env.VITE_GEMINI_API_KEY);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(systemInstruction);
    toast.success('Copied to clipboard!');
  };

  const handleReset = () => {
    setSystemInstruction(defaultData.defaultInstruction);
    toast.success('Reset to default instruction');
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            System Instruction
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </button>
            <Popover className="relative">
              <PopoverButton className="inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </PopoverButton>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <PopoverPanel className="absolute z-10 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 right-0">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      GEMINI_API_KEY
                    </label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={handleApiKeyChange}
                      className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your API key..."
                    />
                  </div>
                </PopoverPanel>
              </Transition>
            </Popover>
          </div>
        </div>
        <textarea
          value={systemInstruction}
          onChange={(e) => setSystemInstruction(e.target.value)}
          className="w-full min-h-[200px] md:min-h-[400px] p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter system instruction..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Your Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-24 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your prompt..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isLoading ? (
          'Generating...'
        ) : (
          <>
            <Send className="w-4 h-4" />
            Generate Response
          </>
        )}
      </button>
    </form>
  );
};