
import React from 'react';
import { Upload, ChevronRight, Package, Image as ImageIcon } from 'lucide-react';
import { ProductType } from '../types';
import { PRODUCTS } from '../constants';

interface SidebarProps {
  onLogoUpload: (base64: string) => void;
  onProductSelect: (product: ProductType) => void;
  selectedProductId?: string;
  hasLogo: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogoUpload, onProductSelect, selectedProductId, hasLogo }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-80 h-full border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-8 overflow-y-auto">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4" /> 1. Upload Logo
        </h2>
        <label className={`
          flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer
          transition-all duration-200
          ${hasLogo ? 'border-indigo-500 bg-indigo-500/5' : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'}
        `}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
            <ImageIcon className={`w-8 h-8 mb-3 ${hasLogo ? 'text-indigo-400' : 'text-zinc-500'}`} />
            <p className="mb-2 text-sm font-medium text-zinc-300">
              {hasLogo ? 'Replace Logo' : 'Choose Logo File'}
            </p>
            <p className="text-xs text-zinc-500">PNG or JPG, up to 10MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
          <Package className="w-4 h-4" /> 2. Select Product
        </h2>
        <div className="grid gap-3">
          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              onClick={() => onProductSelect(product)}
              disabled={!hasLogo}
              className={`
                group flex items-center gap-3 p-3 rounded-xl border transition-all text-left
                ${!hasLogo ? 'opacity-50 cursor-not-allowed border-zinc-900' : 
                  selectedProductId === product.id 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'}
              `}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800">
                <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate">{product.name}</p>
                <p className="text-xs text-zinc-500">{product.category}</p>
              </div>
              <ChevronRight className={`w-4 h-4 text-zinc-600 transition-transform ${selectedProductId === product.id ? 'translate-x-1 text-indigo-400' : ''}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
