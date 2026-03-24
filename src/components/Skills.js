import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const skillsData = [
  {
    category: 'Languages',
    items: ['C / C++', 'Java', 'JavaScript', 'Python'],
  },
  {
    category: 'Web Development',
    items: ['React.js', 'Django', 'HTML5', 'CSS3', 'REST APIs'],
  },
  {
    category: 'Hardware & Embedded',
    items: ['Arduino', 'Microcontrollers', 'I²C / SPI', 'Signal Processing', 'LTSpice'],
  },
  {
    category: 'Tools & Workflow',
    items: ['Git / GitHub', 'Docker', 'VS Code', 'CMake', 'Linux'],
  },
];

const Skills = () => (
  <section id="skills">
    <div className="section-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Skills</p>
        <h2 className="section-heading">
          What I work <em>with</em>
        </h2>
      </motion.div>

      <div className="section-divider" />

      <motion.div
        className="skills-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {skillsData.map((cat, i) => (
          <motion.div
            key={i}
            className="skill-card"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <p className="skill-card-label">{cat.category}</p>
            <ul className="skill-list">
              {cat.items.map((skill, j) => (
                <li key={j} className="skill-item">{skill}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Skills;