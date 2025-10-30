import React from 'react';
import { BrainCircuitIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 shadow-md border-b border-slate-700">
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 flex items-center justify-center">
        <BrainCircuitIcon className="h-9 w-9 text-blue-500 mr-4" />
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          Documentation Assistant
        </h1>
      </div>
    </header>
  );
};