
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useCMS } from '../context/CMSContext';
import { ItemStatus, Product } from '../types';
import { optimizeCloudinaryUrl } from '../services/cloudinary';

interface VaultProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const Vault: React.FC<VaultProps> = ({ onAddToCart, onViewProduct }) => {
  const { content } = useCMS();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Outerwear', 'Vests', 'Tops', 'Bottoms'];
  const filteredProducts = activeCategory === 'All' 
    ? content.products 
    : content.products.filter(p => p.category === activeCategory);

  return (
    <section id="vault" className="py-24 sm:py-40 bg-darker">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-2xl space-y-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-serif italic text-xl block"
            >
              Available Now
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-serif font-medium tracking-tight leading-[0.9]"
            >
              The Archive <br /> <span className="italic text-zinc-400">Vault.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
            >
              Every garment is a historical record. We authenticate each piece to ensure it meets our standard of archival quality and modern wearability.
            </motion.p>
          </div>
          
          <div className="flex flex-wrap gap-2 p-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/5 shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3.5 rounded-full text-xs font-bold transition-all uppercase tracking-widest ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-[0_0_20px_rgba(129,140,248,0.3)]' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.div 
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="vintage-card rounded-[2.5rem] overflow-hidden group transition-all duration-700 border border-white/5 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    <div 
                      className="relative w-full sm:w-[48%] aspect-[4/5] sm:aspect-auto overflow-hidden cursor-pointer"
                      onClick={() => onViewProduct(product)}
                    >
                      <img
                        src={optimizeCloudinaryUrl(product.imageUrl, 800)}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-[2.5s] group-hover:scale-110 group-hover:grayscale-0"
                      />
                      
                      <AnimatePresence>
                        {product.status === ItemStatus.AVAILABLE && (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute top-8 right-8"
                          >
                            <div className="bg-red-500/90 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                              One of One
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-12">
                        <span className="bg-white text-zinc-900 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          View Provenance
                        </span>
                      </div>
                      <div className="absolute bottom-8 left-8">
                        <div className="bg-zinc-950/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 shadow-xl">
                          <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest font-mono">{product.era}</span>
                        </div>
                      </div>
                      {product.status === ItemStatus.SOLD && (
                        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-8 text-center z-10">
                          <motion.div 
                            initial={{ rotate: -5, scale: 0.9 }}
                            animate={{ rotate: -10, scale: 1 }}
                            className="border-2 border-white/20 px-10 py-8 rounded-2xl"
                          >
                            <span className="text-3xl font-serif italic text-white tracking-wide">Archived Item</span>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mt-3">Sold to Private Collector</p>
                          </motion.div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-10 md:p-14 flex flex-col justify-between bg-gradient-to-br from-zinc-900/50 to-transparent">
                      <div className="space-y-10">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.3em]">{product.category}</span>
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                              <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Verified</span>
                            </div>
                          </div>
                          <h3 
                            className="text-3xl md:text-4xl font-serif font-medium leading-tight text-white group-hover:text-primary transition-colors cursor-pointer"
                            onClick={() => onViewProduct(product)}
                          >
                            {product.name}
                          </h3>
                          <div className="text-2xl font-serif text-zinc-400 italic font-light tracking-wide">{product.price}</div>
                        </div>

                        <p className="text-zinc-500 text-sm leading-relaxed italic line-clamp-3 font-medium">
                          "{product.provenance}"
                        </p>

                        <button 
                          onClick={() => onViewProduct(product)}
                          className="group/btn text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] flex items-center gap-3 transition-colors hover:text-primary"
                        >
                          View Full Story
                          <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                        </button>
                      </div>

                      <div className="mt-12">
                        <button 
                          onClick={() => product.status === ItemStatus.AVAILABLE && onAddToCart(product)}
                          disabled={product.status === ItemStatus.SOLD}
                          className={`w-full py-6 rounded-full font-bold text-sm tracking-[0.2em] uppercase transition-all shadow-2xl active:scale-95 ${
                            product.status === ItemStatus.AVAILABLE 
                              ? 'btn-vintage' 
                              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
                          }`}
                        >
                          {product.status === ItemStatus.AVAILABLE ? 'Add to Bag' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="py-32 text-center space-y-6"
          >
            <div className="text-7xl opacity-20">📂</div>
            <p className="text-zinc-500 font-serif italic text-2xl">The archive is currently empty for this category.</p>
            <button onClick={() => setActiveCategory('All')} className="text-primary font-bold uppercase tracking-widest text-xs border-b border-primary pb-1">Reset Filters</button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Vault;
