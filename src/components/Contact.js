import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import '../App.css';

const Contact = () => {
  const [state, handleSubmit] = useForm('xzzwlwoz');

  if (state.succeeded) {
    return (
      <section id="contact" className="contact-section">
        <div className="section-wrapper">
          <div className="form-success">
            <div className="form-success-icon">✓</div>
            <h3>Message received</h3>
            <p>Thanks for reaching out — I'll get back to you shortly.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Contact</p>
          <h2 className="section-heading">
            Let's work <em>together</em>
          </h2>
        </motion.div>

        <div className="section-divider" />

        <div className="contact-layout">
          <motion.div
            className="contact-intro"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>
              I'm currently open to new opportunities — freelance, internships, or 
              full-time roles. If you have a project in mind or just want to chat about 
              embedded systems or web development, I'd love to hear from you.
            </p>

            <div className="contact-links">
              <a
                href="https://github.com/owaseraph"
                target="_blank"
                rel="noreferrer"
                className="contact-link-row"
              >
                <span className="contact-link-label">GitHub</span>
                owaseraph
              </a>
              <a
                href="mailto:tcaciuc.rares.stefan@gmail.com"
                className="contact-link-row"
              >
                <span className="contact-link-label">Email</span>
                tcaciuc.rares.stefan@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/rares-stefan-tcaciuc-545061336"
                target="_blank"
                rel="noreferrer"
                className="contact-link-row"
              >
                <span className="contact-link-label">LinkedIn</span>
                Tcaciuc Rares-Stefan
              </a>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="name">Name</label>
              <input
                className="form-input"
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                className="form-input"
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                className="form-textarea"
                id="message"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                required
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={state.submitting}
              style={{ alignSelf: 'flex-start' }}
            >
              {state.submitting ? 'Sending…' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;