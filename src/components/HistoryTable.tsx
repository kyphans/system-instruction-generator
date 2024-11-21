import React, { useState } from 'react';
import { Clock, Copy, Trash } from 'lucide-react';
import type { HistoryEntry } from '../types';
import toast from 'react-hot-toast';

interface HistoryTableProps {
  history: HistoryEntry[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryEntry[]>>;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ history, setHistory }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard!');
  };

  const handleRemove = (id: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((entry) => entry.id !== id);
      localStorage.setItem('promptHistory', JSON.stringify(newHistory));
      return newHistory;
    });
    toast.success('Record removed!');
  };

  if (history.length === 0) return null;

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 overflow-x-scroll'>
      <div className='flex items-center gap-2 mb-4'>
        <Clock className='w-5 h-5 text-gray-600' />
        <h2 className='text-lg font-semibold text-gray-800'>History</h2>
      </div>
      <div>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Timestamp
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                System Instruction
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Prompt
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Response
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {history.slice(0, 20).map((entry) => (
              <React.Fragment key={entry.id}>
                <tr
                  className='hover:bg-gray-50'
                  onClick={() => toggleRow(entry.id)}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    <div className='max-w-xs truncate'>
                      {entry.systemInstruction}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    <div className='max-w-xs truncate'>{entry.userPrompt}</div>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    <div className='max-w-xs truncate'>{entry.response}</div>
                  </td>
                </tr>
                {expandedRows.has(entry.id) && (
                  <tr>
                    <td colSpan={4} className='px-6 py-4'>
                      <div className='bg-gray-100 p-4 rounded-lg'>
                        <p>
                          <strong>System Instruction:</strong>{' '}
                          {entry.systemInstruction}
                        </p>
                        <p>
                          <strong>Prompt:</strong> {entry.userPrompt}
                        </p>
                        <p>
                          <strong>Response:</strong> {entry.response}
                        </p>
                        <div className='flex gap-2 mt-4'>
                          <button
                            type='button'
                            onClick={() => handleCopy(entry.response)}
                            className='bg-blue-200 rounded-md inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900'>
                            <Copy className='w-4 h-4 mr-1' />
                            Copy
                          </button>
                          <button
                            type='button'
                            onClick={() => handleRemove(entry.id)}
                            className='bg-red-200 rounded-md inline-flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900'>
                            <Trash className='w-4 h-4 mr-1' />
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
