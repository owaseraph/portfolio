import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const bootSteps = [
  "BIO_KERNEL_INIT...",
  "CHECKING_MEMORY_INTEGRITY...",
  "LOADING_GRAPHICS_DRIVER_V2.4...",
  "ESTABLISHING_NEURAL_LINK...",
  "MOUNTING_VIRTUAL_FILESYSTEM...",
  "ACCESS_GRANTED."
];

// 1. Calculate total characters upfront for smooth progress math
const totalChars = bootSteps.join("").length;

const BootSequence = ({ onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  // Track total characters typed for the progress bar
  const [totalTyped, setTotalTyped] = useState(0);
  
  const [memoryCount, setMemoryCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const typingTimeoutRef = useRef(null);

  // --- MEMORY COUNTER (Speeds up) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setMemoryCount(prev => {
        if (prev < 64000) return prev + 2400; // Faster counting
        return 64000;
      });
    }, 10); // Faster updates
    return () => clearInterval(interval);
  }, []);

  // --- TYPING LOGIC ---
  useEffect(() => {
    if (currentLineIndex >= bootSteps.length) {
      // Finished! Wait a tiny bit then exit
      setTimeout(onComplete, 800); 
      return;
    }

    const currentText = bootSteps[currentLineIndex];

    const typeChar = () => {
      if (currentCharIndex < currentText.length) {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = currentText.charAt(currentCharIndex);
          } else {
            newLines[currentLineIndex] += currentText.charAt(currentCharIndex);
          }
          return newLines;
        });
        
        setCurrentCharIndex(prev => prev + 1);
        setTotalTyped(prev => prev + 1); // Increment total count
      } else {
        // Line finished
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }
    };

    // --- SPEED SETTINGS ---
    // Randomize between 5ms and 15ms (Very Fast)
    const typingSpeed = Math.random() * (50 - 25) + 5; 
    
    typingTimeoutRef.current = setTimeout(typeChar, typingSpeed);

    return () => clearTimeout(typingTimeoutRef.current);

  }, [currentCharIndex, currentLineIndex, onComplete]);

  useEffect(() => {
    const newProgress = (totalTyped / totalChars) * 100;
    setProgress(Math.min(newProgress, 100));
  }, [totalTyped]);


  return (
    <motion.div 
      className="boot-screen"
      initial={{ opacity: 1 }}
      exit={{ y: "-100vh", opacity: 0 }} 
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="boot-container">
        <div className="boot-header">
          <span>SERAPH BIOS v1.0</span>
          <span>MEM: {memoryCount} KB OK</span>
        </div>

        <hr className="boot-divider" />

        <div className="boot-log">
          {displayedLines.map((line, index) => (
            <div key={index} className="log-line">
              <span className="status-ok">
                {index < currentLineIndex ? "[ OK ]" : "[ .. ]"}
              </span> 
              <span className="log-text">{line}</span>
            </div>
          ))}
          
          <div className="log-line cursor-placeholder">
             <span className="cursor-blink">_</span>
          </div>
        </div>

        <div className="boot-footer">
          <div className="boot-progress-track">
            <div 
              className="boot-progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="boot-percentage">{Math.round(progress)}%</div>
        </div>
      </div>
    </motion.div>
  );
};

export default BootSequence;