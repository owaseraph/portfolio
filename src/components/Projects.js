import React from "react";
import { motion } from "framer-motion";
import { projectData } from "../data/projects";
import "../App.css"; 

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        &gt; DEPLOYED_MODULES <span className="cursor-blink">_</span>
      </motion.h2>

      <div className="projects-grid">
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="card-header">
              <span className="folder-icon">📁</span>
              <span className="card-title">{project.title}</span>
            </div>

            <p className="card-category">{project.category}</p>
            <p className="card-desc">{project.description}</p>

            <div className="tech-stack">
              {project.tech.map((t, i) => (
                <span key={i} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="card-actions">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="action-link"
              >
                [ LIVE_DEMO ]
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="action-link"
              >
                [ SOURCE_CODE ]
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
