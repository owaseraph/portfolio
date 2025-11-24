import React, { useState, useRef, useEffect} from 'react';
import { motion } from 'framer-motion';
import './App.css';
import CodeTerminal from './components/codeTerminal';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Skills from './components/Skills';
import SystemTimer from './components/SystemTimer';
import Contact from './components/Contact';


function App() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const [showProjects, setShowProjects] = useState(false);
  const contactRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const [activeSection, setActiveSection] = useState('skills');
  const [isLoopActive, setisLoopActive] = useState(false);

  const item = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0 }
  };

  useEffect(() =>{
    const stopLoop = () =>{
      if(isLoopActive){
        setisLoopActive(false);
      }
    };
    window.addEventListener('wheel', stopLoop);
    window.addEventListener('touchmove', stopLoop);
    window.addEventListener('keydown', stopLoop);


    return () => {
      window.removeEventListener('wheel', stopLoop);
      window.removeEventListener('touchmove', stopLoop);
      window.removeEventListener('keydown', stopLoop);
    };
  }, [isLoopActive]);

  useEffect(() => {
    if (!showProjects || !isLoopActive) return;

    let timer;

    if (activeSection === 'skills') {
      skillsRef.current?.scrollIntoView({ behavior: 'smooth' });
      timer = setTimeout(() => {
        if (isLoopActive) setActiveSection('projects');
      }, 7500);
    }
    else if (activeSection === 'projects') {
      projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
      timer = setTimeout(() => {
        if (isLoopActive) setActiveSection('skills');
      }, 7500);
    }
    return () => clearTimeout(timer);

  }, [activeSection, showProjects, isLoopActive]); 


  const handleInitiate = (e) => {
    e.preventDefault(); 
    setShowProjects(true); 
    setisLoopActive(true);
    setActiveSection('skills');
  };

  const handleContact = (e) => {
  e.preventDefault();
  setShowProjects(true);
  setisLoopActive(false);
  setActiveSection('contact'); 

  setTimeout(() => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
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
            <button onClick={handleContact} className="btn btn-secondary">CONTACT_PROTOCOL</button>
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

      <div ref={skillsRef}>
        {showProjects && (
          <>
            {isLoopActive && activeSection === 'skills' && (
              <div className="skills-timer">
                 <SystemTimer label="SCANNING_DRIVERS (NEXT: PROJECTS)" />
              </div>
            )}
            
            <Skills />
            
           
            <div ref={projectsRef} style={{paddingTop: '50px'}}>
              
             
              {activeSection === 'projects' && (
                 <SystemTimer label="ANALYZING_MODULES (NEXT: SKILLS)" />
              )}
              
              <Projects />
            </div>
            <div ref={contactRef}>
                <Contact />
            </div>
          </>
        )}
      </div>


      <Footer />
    </div>
  );
}

export default App;