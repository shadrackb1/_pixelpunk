
import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '../context/CMSContext';

const Hero: React.FC = () => {
  const { content } = useCMS();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-darker">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full animate-float opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(9,9,11,0.2)_0%,rgba(9,9,11,1)_100%)]"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-10">
            <span className="font-serif text-2xl text-accent tracking-wide drop-shadow-sm">
              {content.hero.slogan}
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-serif font-medium tracking-tight leading-[0.82] mb-14 text-white"
          >
            {content.hero.title.split('.')[0]}. <br />
            <span className="font-medium text-zinc-500">{content.hero.title.split('.')[1] || "Modern Fits."}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-400 mb-20 font-medium leading-relaxed"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-10"
          >
            <a 
              href="#vault"
              className="btn-vintage px-16 py-6 rounded-full text-base font-bold w-full sm:w-auto text-center shadow-[0_20px_50px_rgba(129,140,248,0.2)] hover:shadow-[0_25px_60px_rgba(129,140,248,0.4)] transition-all"
            >
              Shop Vault
            </a>
            <a 
              href="#archive"
              className="group px-10 py-6 rounded-full text-zinc-400 hover:text-white font-bold text-base transition-all flex items-center gap-4 border border-white/5 hover:border-white/20 bg-white/[0.02]"
            >
              Archive Records
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </motion.span>
            </a>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500">Discover</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
