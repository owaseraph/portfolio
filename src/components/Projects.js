import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const projectData = [
  {
    id: 1,
    title: 'RLE Compression Tool',
    category: 'Full-Stack Web App',
    description:
      'A full-stack compression utility built with Django and React. Features user authentication, session-based history tracking, and a clean web interface for encoding and decoding run-length encoded data. Deployed on PythonAnywhere.',
    tech: ['Python', 'Django', 'SQLite', 'React'],
    link: 'http://owaseraph.pythonanywhere.com',
    repo: 'https://github.com/owaseraph/RLE_Fullstack_Tool',
  },
  {
    id: 2,
    title: 'Digital Circuit Simulator',
    category: 'Systems / C++',
    description:
      'A real-time logic circuit simulator written from scratch in C++ using SDL3 and ImGui. Supports gate placement, wiring, and live simulation — no game engine, no shortcuts. Built to understand how simulators work at a low level.',
    tech: ['C++', 'SDL3', 'CMake', 'ImGui'],
    link: null,
    repo: 'https://github.com/owaseraph/Digital-Logic-Simulator',
  },
  {
    id: 3,
    title: 'This Portfolio',
    category: 'Frontend',
    description:
      'Personal portfolio built with React and Framer Motion. Designed with a clean light/dark theme system, responsive layout, and smooth scroll navigation. Hosted on GitHub Pages.',
    tech: ['React', 'Framer Motion', 'CSS', 'GitHub Pages'],
    link: 'https://owaseraph.github.io/portfolio/',
    repo: 'https://github.com/owaseraph/portfolio',
  },
];

const Projects = () => (
  <section id="projects">
    <div className="section-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Projects</p>
        <h2 className="section-heading">
          Things I've <em>built</em>
        </h2>
      </motion.div>

      <div className="section-divider" />

      <div className="projects-grid">
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="project-card-top">
              <span className="project-number">0{project.id}</span>
              <div className="project-links">
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer" className="project-link">
                    ↗ GitHub
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                    ↗ Live
                  </a>
                )}
              </div>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-category">{project.category}</p>
            <p className="project-desc">{project.description}</p>

            <div className="tech-stack">
              {project.tech.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;