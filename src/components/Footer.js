import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid #333',
      padding: '20px',
      textAlign: 'center',
      color: '#555',
      fontFamily: 'Fira Code, monospace',
      fontSize: '0.8rem',
      marginTop: '50px',
      background: '#020202'
    }}>
      <p>
        SYSTEM_STATUS: <span style={{color: '#39ff14'}}>NOMINAL</span> | 
        LOCATION: <span style={{color: '#00f3ff'}}>CLUJ-NAPOCA, RO</span>
      </p>
      <p style={{marginTop: '10px'}}>
        &copy; {new Date().getFullYear()} SERAPH.DEV // BUILT_WITH_REACT
      </p>
    </footer>
  );
};

export default Footer;