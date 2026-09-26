
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-darker/90 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg vintage-card rounded-[4rem] p-10 md:p-14 shadow-2xl overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="text-center space-y-6 mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-5xl mx-auto border border-primary/20">
            👋
          </div>
          <div className="space-y-3">
            <h3 className="text-4xl font-extrabold tracking-tight">
              {isRegister ? 'Create Account' : 'Welcome Back'}
            </h3>
            <p className="text-slate-400 font-medium text-base">
              {isRegister ? 'Create your free account to start shopping' : 'Log in to your account to see your saved items'}
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {isRegister && (
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-500 ml-2">What's Your Name?</label>
              <input type="text" placeholder="Your Name" className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-700 focus:border-primary focus:outline-none transition-all font-bold" />
            </div>
          )}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-500 ml-2">Email Address</label>
            <input type="email" placeholder="your@email.com" className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-700 focus:border-primary focus:outline-none transition-all font-bold" />
          </div>
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-500 ml-2">Password</label>
            <input type="password" placeholder="Create a password" className="w-full bg-slate-900 border border-white/5 p-5 rounded-2xl text-white placeholder-slate-700 focus:border-primary focus:outline-none transition-all font-bold" />
          </div>

          <button className="w-full btn-vintage py-6 rounded-full font-bold text-lg shadow-xl mt-4 active:scale-95 transition-all">
            {isRegister ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <div className="mt-12 text-center space-y-6">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm font-bold text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white"
          >
            {isRegister ? 'Already have an account? Log in here' : 'New here? Create your free account'}
          </button>
          
          <div className="flex justify-center items-center gap-4">
             <div className="h-px w-10 bg-white/10"></div>
             <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Safe & Secure</span>
             <div className="h-px w-10 bg-white/10"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
