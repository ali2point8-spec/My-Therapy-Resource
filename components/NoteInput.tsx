import React from 'react';
import { SparklesIcon } from './icons';

interface NoteInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const NoteInput: React.FC<NoteInputProps> = ({ value, onChange, onGenerate, isLoading }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-200 mb-2">
          Enter Your Raw Clinical Notes
        </h2>
        <p className="text-base text-slate-400">
          Type or paste your shorthand notes below. Include subjective comments, interventions, and objective data.
        </p>
      </div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="e.g., pt reports feeling stronger. ther ex: 3x10 squats, 3x10 SLR BLE. gait training 100ft with FWW, CGA. STS x5 min A..."
        className="w-full h-48 p-4 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-y text-slate-200 text-base placeholder-slate-500"
        disabled={isLoading}
      />
      <div className="flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isLoading || !value.trim()}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Generate Note
            </>
          )}
        </button>
      </div>
    </div>
  );
};