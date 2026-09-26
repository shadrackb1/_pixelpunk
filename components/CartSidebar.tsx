
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface CartSidebarProps {
  cart: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ cart, onClose, onRemove }) => {
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

  return (
    <div className="fixed inset-0 z-[1000] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-darker/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-dark border-l border-white/10 shadow-2xl flex flex-col"
      >
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
             </div>
             <div>
               <h3 className="text-2xl font-extrabold tracking-tight">Your Bag</h3>
               <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{cart.length === 1 ? '1 Item' : `${cart.length} Items`}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
              <div className="text-7xl opacity-20">🎒</div>
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">Your bag is empty right now</p>
              <button onClick={onClose} className="text-primary text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1">Start Exploring</button>
            </div>
          ) : (
            cart.map(item => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={item.id} 
                className="flex gap-6 group"
              >
                <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-primary/30 transition-all">
                  <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-base tracking-tight group-hover:text-primary transition-all line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-zinc-500 font-bold mt-1 uppercase tracking-widest">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-extrabold">{item.price}</span>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-xs font-bold text-red-400 uppercase tracking-widest hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-darker border-t border-white/10 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="flex justify-between text-3xl font-extrabold tracking-tight">
                <span>Total Price</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full btn-vintage py-6 rounded-full font-bold text-lg shadow-xl active:scale-95 transition-all">
              Go to Checkout
            </button>
            <p className="text-[11px] text-center text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
              Encrypted checkout. You get tracking on every order.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartSidebar;
