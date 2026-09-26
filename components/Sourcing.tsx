
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sourcing: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const inputClasses = "w-full bg-zinc-900 border border-white/5 p-6 rounded-xl text-zinc-100 placeholder-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="services" className="py-24 sm:py-40 bg-darker relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-primary font-serif text-lg block">Find a Specific Piece</span>
              <h2 className="text-5xl md:text-7xl font-serif font-medium tracking-tight leading-[1]">Found for you, <br />individually.</h2>
              <p className="text-xl text-zinc-400 font-medium max-w-md leading-relaxed">
                If you have a specific item in mind, our global network can track it down. 
                We specialize in finding items that aren't on any website.
              </p>
            </div>
            
            <div className="grid gap-10">
              {[
                { title: 'A Global Network', desc: 'Direct links to collectors in Berlin, London, Tokyo, and Nairobi.', icon: '🗺️' },
                { title: 'Fast Retrieval', desc: 'Average turnaround of 10 days for items found within our network.', icon: '📜' }
              ].map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-8 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary transition-all shadow-inner border border-white/5 group-hover:text-white">
                    {item.icon}
                  </div>
                  <div className="py-1">
                    <h4 className="text-xl font-serif font-medium text-white mb-2">{item.title}</h4>
                    <p className="text-base text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-[2.5rem] bg-zinc-900/60 border border-white/10 shadow-2xl relative"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full min-h-[450px] flex flex-col items-center justify-center text-center space-y-10"
                >
                  <div className="text-7xl">🖋️</div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-serif font-medium tracking-tight">Search Initiated</h3>
                    <p className="text-zinc-400 font-medium text-lg leading-relaxed">
                      Our team will check our records and get back to you personally within 24 hours.
                    </p>
                  </div>
                  <button onClick={() => setSubmitted(false)} className="text-primary font-bold uppercase tracking-widest text-sm border-b border-primary pb-1">Start New Search</button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-10" 
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Name</label>
                        <input type="text" required placeholder="Alex" className={inputClasses} />
                      </div>
                      <div className="space-y-2.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Email</label>
                        <input type="email" required placeholder="name@email.com" className={inputClasses} />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">The Search Subject</label>
                      <textarea required rows={4} placeholder="Era, brand, or specific piece you are looking for..." className={inputClasses}></textarea>
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-vintage py-6 rounded-full shadow-2xl">
                    Submit Search Request
                  </button>
                  
                  <div className="flex items-center justify-center gap-3 opacity-40">
                     <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                     <p className="text-[10px] font-bold text-zinc-400 tracking-[0.3em] uppercase">
                       Personal Record Secure
                     </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Sourcing;
