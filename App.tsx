
import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Vault from './components/Vault';
import Archive from './components/Archive';
import Sourcing from './components/Sourcing';
import Footer from './components/Footer';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import CartSidebar from './components/CartSidebar';
import LoginModal from './components/LoginModal';
import ProductModal from './components/ProductModal';
import PolicyModal from './components/PolicyModal';
import AdminPanel from './components/AdminPanel';
import { Product } from './types';
import { POLICY_CONTENT } from './constants';
import { CMSProvider, useCMS } from './context/CMSContext';

const AICurator = lazy(() => import('./components/AICurator'));

const AppContent: React.FC = () => {
  const { content } = useCMS();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePolicy, setActivePolicy] = useState<{ title: string; id: string } | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [fomoNotice, setFomoNotice] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  useEffect(() => {
    const trigger = () => {
      if (content.fomoMessages.length > 0) {
        setFomoNotice(content.fomoMessages[Math.floor(Math.random() * content.fomoMessages.length)]);
        setTimeout(() => setFomoNotice(null), 5000);
      }
    };

    const timer = setInterval(trigger, 18000);
    return () => clearInterval(timer);
  }, [content.fomoMessages]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        if (href === '#') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        try {
          const element = document.querySelector(href);
          if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        } catch (error) {
          console.warn(`Anchor navigation failed for ${href}`);
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-darker text-zinc-100 selection:bg-primary/30 selection:text-white overflow-x-hidden font-sans">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[200] origin-left"
        style={{ scaleX }}
      />

      <Header 
        cartCount={cart.length} 
        onCartOpen={() => setIsCartOpen(true)} 
        onLoginOpen={() => setIsLoginOpen(true)} 
      />
      
      <main className="relative z-10">
        <Hero />
        
        <div className="py-4 bg-zinc-900 border-y border-white/5 overflow-hidden whitespace-nowrap shadow-inner">
          <div className="inline-block animate-[marquee_50s_linear_infinite]">
            {[1, 2, 3].map(i => (
              <React.Fragment key={i}>
                {content.marquee.map((msg, idx) => (
                  <span key={idx} className="font-serif italic text-sm tracking-wide mx-12 text-zinc-400 flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                    {msg}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Vault 
          onAddToCart={addToCart} 
          onViewProduct={(product) => setSelectedProduct(product)}
        />
        
        <Process />
        
        <Archive />

        <Testimonials />

        <Sourcing />
      </main>
      
      <Footer onOpenPolicy={(title, id) => setActivePolicy({ title, id })} />

      <AdminPanel />
      
      {/* AI Curator Component */}
      <Suspense fallback={null}>
        <AICurator />
      </Suspense>

      <AnimatePresence>
        {fomoNotice && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-10 left-10 z-[2000] vintage-card px-6 py-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-primary"
          >
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest">{fomoNotice}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartSidebar 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart} 
          />
        )}
        {isLoginOpen && (
          <LoginModal onClose={() => setIsLoginOpen(false)} />
        )}
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
          />
        )}
        {activePolicy && (
          <PolicyModal 
            title={activePolicy.title}
            content={POLICY_CONTENT[activePolicy.id]}
            onClose={() => setActivePolicy(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const App: React.FC = () => (
  <MotionConfig reducedMotion="user">
    <CMSProvider>
      <AppContent />
    </CMSProvider>
  </MotionConfig>
);

export default App;
