
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { startCuratorSession, generateArchiveConcept, analyzeVintageItem } from '../services/aiService';

const AICurator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'home' | 'live' | 'concept' | 'identify'>('home');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [conceptImage, setConceptImage] = useState<string | null>(null);
  const [identifyPreview, setIdentifyPreview] = useState<string | null>(null);
  const [isLiveActive, setIsLiveActive] = useState(false);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());
  const sessionRef = useRef<any>(null);

  const stopLive = useCallback(() => {
    if (sessionRef.current) {
      try {
        const session = sessionRef.current;
        Promise.resolve(session).then((s: any) => {
          if (s && typeof s.close === 'function') s.close();
        }).catch(() => {});
      } catch {
        /* session already closed */
      }
      sessionRef.current = null;
      setIsLiveActive(false);
      setMode('home');
    }
    sourcesRef.current.forEach((s: AudioBufferSourceNode) => {
      try { s.stop(); } catch { /* already stopped */ }
    });
    sourcesRef.current.clear();
  }, []);

  const initLive = async () => {
    try {
      setIsProcessing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      const sessionPromise = startCuratorSession({
        onopen: () => {
          setIsLiveActive(true);
          setIsProcessing(false);
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const l = inputData.length;
            const int16 = new Int16Array(l);
            for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
            const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
            sessionPromise.then(s => s.sendRealtimeInput({ 
              media: { data: base64, mimeType: 'audio/pcm;rate=16000' } 
            }));
          };
          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: async (msg: any) => {
          const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audioData && audioContextRef.current) {
            const binary = atob(audioData);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            
            const dataInt16 = new Int16Array(bytes.buffer);
            const buffer = audioContextRef.current.createBuffer(1, dataInt16.length, 24000);
            const channelData = buffer.getChannelData(0);
            for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
            
            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContextRef.current.destination);
            
            const now = audioContextRef.current.currentTime;
            const startTime = Math.max(now, nextStartTimeRef.current);
            source.start(startTime);
            nextStartTimeRef.current = startTime + buffer.duration;
            sourcesRef.current.add(source);
            source.onended = () => sourcesRef.current.delete(source);
          }
          if (msg.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onerror: (e: any) => console.error("Curator Error", e),
        onclose: () => setIsLiveActive(false)
      });
      sessionRef.current = sessionPromise;
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const handleIdentify = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    setResult(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      setIdentifyPreview(base64Data);
      const base64 = base64Data.split(',')[1];
      try {
        const analysis = await analyzeVintageItem(base64, file.type);
        setResult(analysis ?? "No analysis returned. Try a clearer image.");
      } catch (err) {
        console.error(err);
        setResult("Could not read that image. Try a clearer photo of the garment.");
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConcept = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const prompt = (e.currentTarget.elements.namedItem('prompt') as HTMLInputElement).value;
    if (!prompt) return;
    setIsProcessing(true);
    setConceptImage(null);
    try {
      const img = await generateArchiveConcept(prompt);
      setConceptImage(img);
    } catch (err) {
      console.error(err);
      setResult("Image generation is unavailable right now. Check the API key and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetMode = () => {
    if (isLiveActive) stopLive();
    setMode('home');
    setResult(null);
    setIdentifyPreview(null);
    setConceptImage(null);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[150] w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-darker"
        aria-label="Open AI Curator"
      >
        <span className="text-2xl">🏛️</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2000] flex items-end justify-start md:items-center md:justify-center p-4 md:p-10 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isLiveActive) setIsOpen(false); }}
              className="absolute inset-0 bg-darker/80 backdrop-blur-xl pointer-events-auto"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(129,140,248,0.15)] overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
            >
              <div className="p-8 md:p-12 overflow-y-auto hide-scrollbar">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary text-xl font-serif italic">
                      {isLiveActive ? '●' : 'p.p'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif italic text-white leading-tight">The Curator</h3>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        {isLiveActive ? 'Live Consultation Active' : 'Archive Expert on Call'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (isLiveActive) stopLive();
                      setIsOpen(false);
                    }} 
                    className="p-3 hover:bg-white/5 rounded-full transition-colors text-zinc-400"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                <div className="min-h-[400px] flex flex-col">
                  {mode === 'home' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <button onClick={() => { setMode('live'); initLive(); }} className="vintage-card p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 hover:border-primary/50 transition-all group active:scale-95">
                        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white transition-colors">🎙️</div>
                        <span className="text-sm font-bold uppercase tracking-widest text-zinc-200">Voice Consult</span>
                      </button>
                      <button onClick={() => setMode('identify')} className="vintage-card p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 hover:border-primary/50 transition-all group active:scale-95">
                        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white transition-colors">📷</div>
                        <span className="text-sm font-bold uppercase tracking-widest text-zinc-200">Identify Item</span>
                      </button>
                      <button onClick={() => setMode('concept')} className="vintage-card p-8 rounded-[2rem] flex flex-col items-center text-center gap-6 hover:border-primary/50 transition-all group active:scale-95">
                        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white transition-colors">🧠</div>
                        <span className="text-sm font-bold uppercase tracking-widest text-zinc-200">Concept Lab</span>
                      </button>
                    </div>
                  )}

                  {mode === 'live' && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-12">
                      <div className="relative">
                        <div className="w-32 h-32 bg-primary rounded-full animate-pulse-slow opacity-20 absolute inset-0 scale-150"></div>
                        <div className="w-32 h-32 bg-primary/40 rounded-full animate-ping absolute inset-0"></div>
                        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-4xl relative z-10 shadow-[0_0_30px_rgba(129,140,248,0.5)]">🏛️</div>
                        
                        {/* Audio Waveform Simulation */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
                          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [4, 24, 8, 32, 4] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                              className="w-1 bg-primary/60 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-3xl font-serif italic text-white">"I am listening..."</h4>
                        <p className="text-zinc-500 font-medium max-w-xs mx-auto text-sm">Ask me about fashion history, provenance, or how to style your latest find.</p>
                      </div>
                      <button onClick={stopLive} className="px-12 py-5 rounded-full border border-red-500/30 text-red-500 font-bold uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all active:scale-95">End Session</button>
                    </div>
                  )}

                  {mode === 'concept' && (
                    <div className="flex-1 space-y-10">
                      <button onClick={resetMode} className="text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">← Return</button>
                      <form onSubmit={handleConcept} className="space-y-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Describe the Vision</label>
                          <input name="prompt" required placeholder="e.g. A 1950s naval jacket with digital glitch patterns..." className="w-full bg-zinc-800/50 border border-white/5 p-6 rounded-2xl text-white placeholder-zinc-600 focus:border-primary transition-all outline-none shadow-inner" />
                        </div>
                        <button disabled={isProcessing} className="w-full btn-vintage py-6 rounded-full uppercase font-bold tracking-widest text-sm disabled:opacity-50 active:scale-95 transition-all shadow-xl">
                          {isProcessing ? 'Building the image...' : 'Generate Image'}
                        </button>
                      </form>
                      <AnimatePresence>
                        {conceptImage && (
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl overflow-hidden border border-white/10 aspect-[3/4] bg-black shadow-2xl">
                            <img src={conceptImage} className="w-full h-full object-cover" alt="AI Generated Concept" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {mode === 'identify' && (
                    <div className="flex-1 space-y-10">
                       <button onClick={resetMode} className="text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">← Return</button>
                       <div className="space-y-8">
                         {!identifyPreview ? (
                           <div className="p-16 border-2 border-dashed border-white/10 rounded-[3rem] text-center space-y-8 bg-zinc-800/20 group hover:border-primary/50 hover:bg-zinc-800/40 transition-all cursor-pointer relative overflow-hidden">
                             <input type="file" accept="image/*" onChange={handleIdentify} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                             <div className="text-6xl group-hover:scale-110 transition-transform">📷</div>
                             <div className="space-y-2">
                               <p className="text-white font-serif italic text-xl">Upload Artifact</p>
                               <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">JPEG, PNG (Max 10MB)</p>
                             </div>
                           </div>
                         ) : (
                           <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/3] bg-black shadow-2xl">
                              <img src={identifyPreview} className="w-full h-full object-cover grayscale-[0.3]" alt="Identification Preview" />
                              {isProcessing && (
                                <>
                                  <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
                                  <motion.div 
                                    initial={{ top: '0%' }}
                                    animate={{ top: '100%' }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-1 bg-primary/60 shadow-[0_0_20px_rgba(129,140,248,0.8)] z-10"
                                  />
                                </>
                              )}
                              <button onClick={() => setIdentifyPreview(null)} className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors z-20">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                           </div>
                         )}

                         {isProcessing && (
                            <div className="text-center space-y-3">
                              <div className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] animate-pulse">Reading the piece...</div>
                              <p className="text-zinc-500 text-xs italic">Checking construction markers and label patterns</p>
                            </div>
                         )}

                         {result && (
                           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-800/30 p-10 rounded-[2.5rem] border border-white/5 shadow-inner">
                             <div className="flex items-center gap-3 mb-6">
                               <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                               <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Analysis Complete</span>
                             </div>
                             <div className="prose prose-invert prose-sm max-w-none">
                               {result.split('\n').map((line, i) => (
                                 <p key={i} className="mb-4 text-zinc-300 leading-relaxed font-medium">
                                   {line.startsWith('**') ? <strong className="text-white block mb-1">{line.replace(/\*\*/g, '')}</strong> : line}
                                 </p>
                               ))}
                             </div>
                           </motion.div>
                         )}
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AICurator;
