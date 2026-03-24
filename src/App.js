import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import CodeTerminal from './components/codeTerminal';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Skills from './components/Skills';
import Contact from './components/Contact';
import About from './components/About';
import { ThemeProvider, ThemeContext } from './ThemeContext';

/* ── Smooth-scroll helper ─────────────────── */
const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/* ── Stagger container ────────────────────── */
const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ─────────────────────────────────────────── */
function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app-container">
      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#hero" className="logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
            Rares<span>.</span>
          </a>

          <nav>
            <ul className="nav-links">
              {['about','skills','projects','contact'].map(s => (
                <li key={s}>
                  <a href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="hero-section">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="hero-eyebrow">
            Available for work
          </motion.p>

          <motion.h1 variants={item} className="hero-title">
            Rares,<br />
            <em>Software</em><br />
            Developer
          </motion.h1>

          <motion.p variants={item} className="hero-role">
            Electronics & Telecommunications Engineer — Cluj-Napoca, RO
          </motion.p>

          <motion.p variants={item} className="hero-bio">
            I build things at the intersection of <strong>hardware and software</strong> — 
            from embedded systems and digital circuits to full-stack web applications. 
            I care about writing clean code that works reliably, whether it's running on 
            a microcontroller or in a browser.
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View Projects
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
        >
          <CodeTerminal />
        </motion.div>
      </section>

      {/* ── REST OF PAGE ── */}
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}