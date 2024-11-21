import React from 'react';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface ResponseViewProps {
  response: string;
  isLoading: boolean;
}

export const ResponseView: React.FC<ResponseViewProps> = ({ response, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!response) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(response);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Generated Response</h2>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-blue-200 rounded-md inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
        >
          <Copy className="w-4 h-4 mr-1" />
          Copy
        </button>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
      </div>
    </div>
  );
};