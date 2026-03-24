import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const About = () => (
  <section id="about" className="about-section">
    <div className="section-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="section-label">About</p>
        <h2 className="section-heading">
          Building at the<br /><em>hardware–software boundary</em>
        </h2>
      </motion.div>

      <div className="section-divider" />

      <div className="about-grid">
        <motion.div
          className="about-bio"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <p>
            I'm Rares, an <strong>Electronics and Telecommunications Engineering</strong> student based in Cluj-Napoca, Romania. 
            My work focuses on both the hardware and software layers of computing — from circuit design and 
            microcontroller-based systems to developing and deploying full-stack web applications.
          </p>
          <p>
            I'm particularly interested in projects that combine these domains. I've worked with low-level programming in <strong>C/C++ </strong>
            for hardware-oriented applications, as well as modern web technologies such as <strong>React</strong> and <strong>
            Django</strong> for building practical tools and interfaces. This combination allows me to approach problems with 
            an understanding of both system constraints and user-facing functionality.
          </p>
          <p>
           Currently in the second year of my degree, I am actively developing personal projects and expanding my practical experience. 
           I am seeking opportunities to contribute to embedded systems, backend development, or full-stack engineering 
           environments where I can continue to grow and apply my skills.
          </p>
        </motion.div>

        <motion.div
          className="about-meta"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="meta-row">
            <span className="meta-label">Status</span>
            <span className="meta-value available">
              <span className="status-dot" />
              Open to opportunities
            </span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Location</span>
            <span className="meta-value">Cluj-Napoca, Romania</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Degree</span>
            <span className="meta-value">Electronics & Telecommunications Eng.</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Focus areas</span>
            <span className="meta-value">Embedded Systems · Full-Stack · C++</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Languages</span>
            <span className="meta-value">Romanian (native) · English (fluent)</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;