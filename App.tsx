import React, { useState } from 'react';
import { Header } from './components/Header';
import { NoteInput } from './components/NoteInput';
import { NoteOutput } from './components/NoteOutput';
import { generateDocumentation } from './services/geminiService';

export default function App() {
  const [userNotes, setUserNotes] = useState<string>('');
  const [generatedNote, setGeneratedNote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateNote = async () => {
    if (!userNotes.trim()) {
      setError('Please enter some notes before generating.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedNote('');

    try {
      const result = await generateDocumentation(userNotes);
      setGeneratedNote(result);
    } catch (e) {
      setError('An error occurred while generating the note. Please check your API key and try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
      <Header />
      <main className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 space-y-8 border border-slate-700">
          <NoteInput
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            onGenerate={handleGenerateNote}
            isLoading={isLoading}
          />
          <NoteOutput
            generatedNote={generatedNote}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Documentation Assistant. For professional use only.</p>
        </footer>
      </main>
    </div>
  );
}