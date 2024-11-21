import React from 'react';
import { Brain } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-lg">
      <div className="container mx-auto max-w-full md:max-w-7xl flex items-center gap-3 px-4">
        <Brain className="w-8 h-8" />
        <h1 className="text-lg md:text-2xl font-bold">System Instruction Generator</h1>
      </div>
    </header>
  );
};