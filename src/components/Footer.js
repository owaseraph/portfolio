import React from 'react';
import '../App.css';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-inner">
      <span className="footer-copy">
        © {new Date().getFullYear()} Rares — Cluj-Napoca, RO
      </span>
      <div className="footer-links">
        <a href="https://github.com/owaseraph" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="mailto:tcaciuc.rares.stefan@gmail.com">Email</a>
      </div>
    </div>
  </footer>
);

export default Footer;