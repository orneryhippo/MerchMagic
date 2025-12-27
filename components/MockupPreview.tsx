
import React, { useState, useEffect } from 'react';
import { Download, Share2, Maximize2, Sparkles, Loader2 } from 'lucide-react';
import { LOADING_MESSAGES } from '../constants';

interface MockupPreviewProps {
  image: string | null;
  isLoading: boolean;
  onDownload: () => void;
}

const MockupPreview: React.FC<MockupPreviewProps> = ({ image, isLoading, onDownload }) => {
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="flex-1 relative flex flex-col bg-zinc-900 p-8 overflow-hidden">
      <div className="flex-1 flex items-center justify-center relative">
        {isLoading ? (
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400 w-8 h-8 animate-pulse" />
            </div>
            <p className="text-zinc-400 font-medium tracking-wide animate-pulse">{loadingMsg}</p>
          </div>
        ) : image ? (
          <div className="relative group w-full h-full flex items-center justify-center">
             <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full scale-75 opacity-20"></div>
            <img 
              src={image} 
              alt="Generated Mockup" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-zinc-800/50 bg-black z-10 animate-in fade-in duration-700"
            />
            
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <button className="p-2 bg-zinc-950/80 hover:bg-zinc-800 backdrop-blur-md rounded-lg text-zinc-300 transition-colors border border-zinc-800">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-zinc-800/50 flex items-center justify-center mx-auto mb-6 border border-zinc-700">
              <Sparkles className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-xl font-medium text-zinc-400">Ready to visualize</h3>
            <p className="text-zinc-500 mt-2 max-w-xs mx-auto">Upload a logo and select a product to see the magic happen.</p>
          </div>
        )}
      </div>

      {image && !isLoading && (
        <div className="mt-8 flex items-center justify-between bg-zinc-950/50 p-4 rounded-2xl border border-zinc-800 backdrop-blur-sm z-20">
          <div className="flex items-center gap-4">
             <div className="p-2 bg-green-500/10 rounded-lg">
                <Sparkles className="w-4 h-4 text-green-500" />
             </div>
             <div>
                <p className="text-sm font-medium text-zinc-300">Generation Complete</p>
                <p className="text-xs text-zinc-500">1024x1024 High Quality PNG</p>
             </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-sm font-medium transition-colors border border-zinc-700">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button 
              onClick={onDownload}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <Download className="w-4 h-4" /> Export Print-Ready
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockupPreview;
