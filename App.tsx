
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
import GridBackground from './components/GridBackground';
import AdminPanel from './components/AdminPanel';
import BentoGrid from './components/BentoGrid';
import Capabilities from './components/Capabilities';

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
      <GridBackground />
      
      {/* Splash Screen */}
      {isLoading && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        
        <main>
          <Hero />
          <Capabilities id="capabilities" />
          <Projects id="projects" />
          <Experience id="experience" />
          
          <Marquee 
            items={["React", "TypeScript", "Tailwind", "Gemini AI", "Node.js", "WebGL", "Design"]} 
            direction="left"
            className="border-y border-neutral-800"
          />

          <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
             <BentoGrid />
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
