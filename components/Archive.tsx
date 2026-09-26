
import React from 'react';
import { ARCHIVE_ITEMS } from '../constants';

const Archive: React.FC = () => {
  return (
    <section id="archive" className="py-24 sm:py-32 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-4 max-w-xl">
            <span className="text-primary font-serif text-lg block">Notes & Styling</span>
            <h2 className="text-5xl md:text-7xl font-serif font-medium tracking-tight">The Records</h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              A record of our past collections and styling stories. 
              Lessons in how to wear history today.
            </p>
          </div>
          <button className="px-10 py-4 rounded-full border border-white/10 text-sm font-bold text-zinc-400 hover:text-white hover:border-white transition-all uppercase tracking-widest">
            View All Entries
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-16 hide-scrollbar snap-x scroll-smooth">
        <div className="flex gap-12 px-6 lg:pl-[15%]">
          {ARCHIVE_ITEMS.map((item) => (
            <div key={item.id} className="min-w-[320px] md:min-w-[500px] snap-center group">
              <div className="relative aspect-[16/10] mb-10 overflow-hidden rounded-2xl border border-white/5 transition-all duration-700 shadow-2xl">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[0.3] transition-transform duration-[3s] group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-accent bg-zinc-950/60 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                  <h4 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                  <div className="text-[11px] font-bold text-zinc-500 tracking-[0.4em] uppercase">{item.date}</div>
                </div>
              </div>
              <div className="px-4 space-y-4">
                <p className="text-zinc-400 font-serif italic text-lg md:text-xl max-w-md leading-relaxed">
                  "{item.description}"
                </p>
                <a href="#" className="inline-block text-xs font-bold text-primary uppercase tracking-[0.2em] hover:text-white transition-colors">Read Full Entry →</a>
              </div>
            </div>
          ))}
          <div className="min-w-[100px]"></div>
        </div>
      </div>
    </section>
  );
};

export default Archive;
