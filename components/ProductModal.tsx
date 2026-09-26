
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { optimizeCloudinaryUrl } from '../services/cloudinary';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-darker/98 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row h-[90vh] lg:h-[80vh]"
      >
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white/10 transition-colors lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Side: Large Image */}
        <div className="w-full lg:w-[55%] relative bg-black flex-shrink-0 group overflow-hidden">
          <img 
            src={optimizeCloudinaryUrl(product.imageUrl, 1200)} 
            alt={product.name} 
            className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s] ease-out"
          />
          <div className="absolute top-10 left-10 flex flex-col gap-3">
            <span className="bg-primary px-6 py-2.5 rounded-full text-[10px] font-black text-white uppercase tracking-[0.3em] shadow-2xl border border-white/10">
              Artifact Verified
            </span>
            <span className="bg-zinc-950/80 backdrop-blur-md px-6 py-2.5 rounded-full text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em] border border-white/5">
              Ref No. {product.id}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>

        {/* Right Side: Information */}
        <div className="flex-1 flex flex-col overflow-hidden bg-zinc-900">
          <div className="p-10 lg:p-16 overflow-y-auto hide-scrollbar flex-1">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-4">
                <span className="text-primary font-serif text-2xl drop-shadow-sm">{product.category}</span>
                <h2 className="text-5xl lg:text-6xl font-serif font-medium leading-[0.9] text-white max-w-md">{product.name}</h2>
              </div>
              <button 
                onClick={onClose}
                className="hidden lg:flex p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-12">
              <div className="flex items-baseline gap-6">
                 <div className="text-5xl font-serif text-white italic font-light tracking-wide">{product.price}</div>
                 <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] border-l border-white/10 pl-6 h-6 flex items-center">{product.era} Origin</div>
              </div>

              <div className="space-y-10">
                <div className="p-10 bg-zinc-800/40 rounded-[2.5rem] border border-white/5 shadow-inner relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/30"></div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Archive Provenance</h4>
                  <p className="text-zinc-300 leading-relaxed text-lg italic mb-6">
                    "{product.provenance}"
                  </p>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    {product.provenance}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2.5rem] bg-zinc-800/20 border border-white/5 group hover:border-success/30 transition-colors">
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">Eco Performance</div>
                    <div className="text-xl font-bold text-success drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">{product.carbonSaved} Offset</div>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-zinc-800/20 border border-white/5 group hover:border-primary/30 transition-colors">
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🧵</div>
                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">Archival Grade</div>
                    <div className="text-xl font-bold text-white uppercase tracking-widest">Pristine</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-2">Construction Indicators</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.details.map((detail, idx) => (
                      <span key={idx} className="px-6 py-3 rounded-2xl bg-zinc-800/50 border border-white/5 text-[11px] font-bold text-zinc-300 uppercase tracking-widest hover:bg-zinc-800 hover:text-primary transition-all cursor-default">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 lg:p-14 bg-zinc-950/50 border-t border-white/5 backdrop-blur-md">
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="w-full btn-vintage py-7 rounded-full text-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-all font-bold tracking-[0.2em] uppercase"
            >
              Add to Bag
            </button>
            <div className="flex flex-col items-center gap-3 mt-6">
              <div className="flex items-center gap-3">
                 <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                 <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em]">
                   Status: Available
                 </p>
              </div>
              <p className="text-[10px] text-zinc-600 font-medium text-center max-w-xs">
                Once this piece sells, it leaves the public vault for good.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
