import React from "react";
import { motion } from "framer-motion";
import { skillsData } from "../data/skills";
import "../App.css";

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="skills-section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="skills-container"
      >
        <h2 className="section-title">
          &gt; LOADED_DRIVERS <span className="cursor-blink">_</span>
        </h2>

        <div className="skills-grid">
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category-card"
              variants={itemVariants}
            >
              <h3 className="category-title">{category.category}</h3>
              <div className="skill-tags">
                {category.items.map((skill, i) => (
                  <span key={i} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
