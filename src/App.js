import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import CodeTerminal from './components/codeTerminal';
import Projects from './components/Projects';

function App() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const [showProjects, setShowProjects] = useState(false);
  const projectsRef = useRef(null);

  const item = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0 }
  };

  const handleInitiate = (e) => {
    e.preventDefault(); 
    setShowProjects(true); 
    
    
    setTimeout(() => {
      projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="app-container">
      <div className="scanline"></div>

      <div className="hero-split-layout">
        
        <motion.div 
          className="hero-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="system-text">
            &gt; SYSTEM_ONLINE... <span className="cursor-blink">_</span>
          </motion.p>

          <motion.h1 variants={item} className="hero-title">
            SERAPH<span className="accent-cyan">.DEV</span>
            <span className="glitch-layer">SERAPH.DEV</span>
            <span className="glitch-layer-2">SERAPH.DEV</span>
          </motion.h1>

          <motion.h2 variants={item} className="hero-subtitle">
            Electronics & Telecommunications Engineer
          </motion.h2>

          <motion.div variants={item} className="hero-description pcb-trace">
            <p>
              Bridging the gap between <strong>Hardware</strong> and <strong>Software</strong>. 
              Specialized in Embedded Systems, Signal Processing, and Full-Stack Development.
            </p>
          </motion.div>

          <motion.div variants={item} className="button-group">
            <button onClick={handleInitiate} className="btn btn-primary">INITIATE_PROJECTS</button>
            <a href="mailto:tcaciuc.rares.stefan@gmail.com" className="btn btn-secondary">CONTACT_PROTOCOL</a>
          </motion.div>
        </motion.div>
        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <CodeTerminal />
        </motion.div>


      </div>

      <div ref={projectsRef}>
        {showProjects && <Projects />}
      </div>
    </div>
  );
}

export default App;