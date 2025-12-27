
import React, { useState } from 'react';
import { Send, Wand2, RefreshCcw, Command } from 'lucide-react';

interface AIControlPanelProps {
  onEdit: (prompt: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const AIControlPanel: React.FC<AIControlPanelProps> = ({ onEdit, isLoading, disabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onEdit(prompt);
      setPrompt('');
    }
  };

  const suggestions = [
    "Add a vintage 35mm film grain filter",
    "Change background to a modern loft",
    "Make the scene look like a sunset",
    "Add a slight blur to the background"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto absolute bottom-32 left-1/2 -translate-x-1/2 px-4 z-30">
      <div className={`
        bg-zinc-950/90 border border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl p-4 transition-all duration-300
        ${disabled ? 'opacity-50 pointer-events-none' : 'opacity-100'}
      `}>
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => setPrompt(s)}
              className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Command className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Tell Gemini to edit the scene..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
              disabled={disabled || isLoading}
            />
          </div>
          <button 
            type="submit"
            disabled={!prompt.trim() || isLoading || disabled}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all active:scale-95
              ${!prompt.trim() || isLoading || disabled 
                ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20'}
            `}
          >
            {isLoading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {isLoading ? 'Processing' : 'AI Edit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIControlPanel;
