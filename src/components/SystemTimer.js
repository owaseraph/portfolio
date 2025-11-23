import React from 'react';
import '../App.css';

const SystemTimer = ({ label }) => {
  return (
    <div className="timer-container">
      <div className="timer-label">
        &gt; {label} <span className="blinking-dots">...</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
};

export default SystemTimer;