import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../App.css'; 

const CodeTerminal = () => {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="dot red"></div>
        <div className="dot yellow"></div>
        <div className="dot green"></div>
        <span className="terminal-title">main.cpp</span>
      </div>

      <div className="terminal-body">
        <TypeAnimation
          sequence={[
            `#include <iostream>
#include "Engineer.h"

using namespace std;

int main() {
  Engineer seraph;

  seraph.focus = "FullStack Development";
  seraph.skills = {"C++", "React", "Javascript", "Typescript", "PCB Design"};

  // Initializing Project...
  if (seraph.isReady()) {
    seraph.buildFuture();
  }

  return 0;
}`,
            1000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ whiteSpace: 'pre-line', display: 'block', fontFamily: 'Fira Code', fontSize: '0.9rem' }}
        />
      </div>
    </div>
  );
};

export default CodeTerminal;