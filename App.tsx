
import React, { useState, useCallback } from 'react';
import { Package2, Github, Layout, ArrowRight, Zap } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MockupPreview from './components/MockupPreview';
import AIControlPanel from './components/AIControlPanel';
import { MockupState, ProductType } from './types';
import { GeminiService } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<MockupState>({
    originalLogo: null,
    currentMockup: null,
    history: [],
    isLoading: false,
    error: null
  });

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  const handleLogoUpload = useCallback((base64: string) => {
    setState(prev => ({ ...prev, originalLogo: base64, error: null }));
  }, []);

  const handleProductSelect = async (product: ProductType) => {
    if (!state.originalLogo) return;
    
    setSelectedProduct(product);
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await GeminiService.generateMockup(state.originalLogo, product.defaultPrompt);
      setState(prev => ({
        ...prev,
        currentMockup: result,
        history: [...prev.history, result],
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to generate mockup'
      }));
    }
  };

  const handleAIEdit = async (prompt: string) => {
    if (!state.currentMockup) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await GeminiService.editMockup(state.currentMockup, prompt);
      setState(prev => ({
        ...prev,
        currentMockup: result,
        history: [...prev.history, result],
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to edit mockup'
      }));
    }
  };

  const downloadMockup = () => {
    if (!state.currentMockup) return;
    const link = document.createElement('a');
    link.href = state.currentMockup;
    link.download = `merchmagic-${selectedProduct?.id || 'mockup'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 bg-black flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
             <Zap className="w-6 h-6 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">MerchMagic<span className="text-indigo-500 italic ml-1">AI</span></h1>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">On-Demand Product Visualizer</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Showcase</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-zinc-800 mx-1"></div>
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex overflow-hidden">
        <Sidebar 
          onLogoUpload={handleLogoUpload}
          onProductSelect={handleProductSelect}
          selectedProductId={selectedProduct?.id}
          hasLogo={!!state.originalLogo}
        />

        <div className="flex-1 relative flex flex-col">
          {state.error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
               <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
               <span className="text-sm font-medium text-red-400">{state.error}</span>
               <button onClick={() => setState(prev => ({...prev, error: null}))} className="text-red-400/50 hover:text-red-400 ml-2">×</button>
            </div>
          )}

          <MockupPreview 
            image={state.currentMockup} 
            isLoading={state.isLoading} 
            onDownload={downloadMockup}
          />

          <AIControlPanel 
            onEdit={handleAIEdit} 
            isLoading={state.isLoading}
            disabled={!state.currentMockup}
          />
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-10 border-t border-zinc-800 bg-zinc-950 px-6 flex items-center justify-between text-[11px] text-zinc-500 uppercase tracking-wider font-semibold">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${state.isLoading ? 'bg-indigo-500 animate-pulse' : 'bg-green-500'}`}></div>
            {state.isLoading ? 'Gemini 2.5 Processing' : 'System Ready'}
          </div>
          <span className="text-zinc-800">|</span>
          <span>GPU Acceleration Active</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Project: {selectedProduct?.name || 'Untitled'}</span>
          <span className="text-zinc-800">|</span>
          <span>Resolution: 1024x1024</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
