
import React from 'react';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const steps = [
    {
      id: 'I',
      title: 'Global Search',
      desc: 'We explore vintage markets and private archives from Nairobi to Tokyo to find items that matter.',
      icon: '🌍'
    },
    {
      id: 'II',
      title: 'Hand Inspection',
      desc: 'Our experts verify every stitch to ensure it is authentic and in a condition we would wear ourselves.',
      icon: '🖋️'
    },
    {
      id: 'III',
      title: 'Gentle Care',
      desc: 'Every garment is cleaned using gentle, modern techniques to preserve its history and quality.',
      icon: '✨'
    },
    {
      id: 'IV',
      title: 'Direct Passage',
      desc: 'Safe, tracked, and professional delivery directly from our archive to your front door.',
      icon: '📦'
    }
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <span className="text-primary font-serif text-lg block">How We Work</span>
          <h2 className="text-5xl md:text-7xl font-serif font-medium tracking-tight">How we Recover History</h2>
          <p className="text-zinc-500 font-medium text-lg md:text-xl leading-relaxed">
            We handle everything from the initial search to the final delivery, 
            so you can focus on building a collection that lasts a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="vintage-card p-12 rounded-[2rem] space-y-10 group hover:border-primary/40 transition-all relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-9xl italic pointer-events-none">
                {step.id}
              </div>
              <div className="w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-white/5 relative z-10">
                {step.icon}
              </div>
              <div className="space-y-4 relative z-10">
                <h4 className="text-2xl font-serif font-medium tracking-tight text-zinc-100">{step.title}</h4>
                <p className="text-base text-zinc-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
