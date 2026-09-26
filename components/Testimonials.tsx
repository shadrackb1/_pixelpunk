
import React from 'react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      user: 'MARCUS_V',
      text: "The 90s techwear find arrived with full notes on origin and condition. Packaging was careful, shipping was quick.",
      role: 'Private Collector',
      avatar: 'https://picsum.photos/100/100?random=1'
    },
    {
      user: 'ELARA_FLUX',
      text: "Hard to trust vintage sellers online. The provenance write-up here is why I bought. The piece matched the photos.",
      role: 'Fashion Archivist',
      avatar: 'https://picsum.photos/100/100?random=2'
    },
    {
      user: 'ZERO_K',
      text: "Custom find request came back in about 10 days. The rework on the seams is clean, better than I expected.",
      role: 'Digital Nomad',
      avatar: 'https://picsum.photos/100/100?random=3'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-darker">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em]">Ownership Feedback</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">Archive Owners</h2>
          </div>
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-darker overflow-hidden">
                <img src={`https://picsum.photos/100/100?random=${i + 10}`} alt="User" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-darker bg-primary flex items-center justify-center text-[10px] font-black">
              YOU
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.user}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="vintage-card p-10 rounded-[3.5rem] flex flex-col justify-between border border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-8">
                <div className="flex text-primary">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-lg font-medium text-zinc-200 leading-relaxed">
                  “{rev.text}”
                </p>
              </div>
              <div className="flex items-center gap-4 mt-12 pt-8 border-t border-white/5">
                <img src={rev.avatar} className="w-12 h-12 rounded-2xl grayscale hover:grayscale-0 transition-all shadow-lg" alt={rev.user} />
                <div>
                  <div className="text-sm font-black uppercase tracking-widest text-white">{rev.user}</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{rev.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
