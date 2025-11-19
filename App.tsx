
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ChatAssistant from './components/ChatAssistant';
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import Marquee from './components/Marquee';
import ProgressBar from './components/ProgressBar';
import Noise from './components/Noise';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      setIsAdminRoute(window.location.hash === '#/admin');
    };

    // Initial check
    checkRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  // Trigger content animation shortly before splash is fully gone
  useEffect(() => {
    if (!isLoading) {
        setShowContent(true);
    }
  }, [isLoading]);

  // If Admin Route, render Admin Panel directly (bypass Splash for Admin usually)
  if (isAdminRoute) {
    return <AdminPanel />;
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white relative cursor-none-desktop">
      
      {/* Interactive Elements */}
      <CustomCursor />
      <ProgressBar />
      <Noise />
      
      {/* Splash Screen */}
      {isLoading && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        
        <main>
          <Hero />
          <Projects id="projects" />
          <Experience id="experience" />
          
          <Marquee 
            items={["React", "TypeScript", "Tailwind", "Gemini AI", "Node.js", "WebGL", "Design"]} 
            direction="left"
            className="border-y border-neutral-800"
          />

          <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 gap-12">
               <h2 className="text-4xl font-bold tracking-tighter">About Me</h2>
               <div className="text-lg text-neutral-600 leading-relaxed space-y-6">
                 <p>
                   I believe that good design is as little design as possible. My approach is grounded in the Swiss Style philosophy: prioritizing content, readability, and objectivity.
                 </p>
                 <p>
                   With a strong foundation in computer science and years of practical application in React ecosystems, I build digital products that are not only visually striking but robust and scalable.
                 </p>
                 <div className="pt-6">
                   <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-4">Tech Stack</h3>
                   <div className="flex flex-wrap gap-x-8 gap-y-2 text-neutral-600 font-mono text-sm">
                     <span className="hover:text-neutral-900 cursor-default transition-colors">React / Next.js</span>
                     <span className="hover:text-neutral-900 cursor-default transition-colors">TypeScript</span>
                     <span className="hover:text-neutral-900 cursor-default transition-colors">Tailwind CSS</span>
                     <span className="hover:text-neutral-900 cursor-default transition-colors">Node.js</span>
                     <span className="hover:text-neutral-900 cursor-default transition-colors">PostgreSQL</span>
                     <span className="hover:text-neutral-900 cursor-default transition-colors">Gemini AI</span>
                   </div>
                 </div>
               </div>
             </div>
          </section>
          <Contact id="contact" />
        </main>
      </div>

      {/* Chat Assistant - Show only after splash */}
      {!isLoading && <ChatAssistant />}
    </div>
  );
};

export default App;
