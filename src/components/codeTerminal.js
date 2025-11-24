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
#include <vector>
#include "Engineer.h"

using namespace std;

class Rares : public Engineer {
  public:
    void build() {
      hardware.connect();   
      server.deploy();
    }
};

int main() {
 
  Rares seraph;

  seraph.role = "FullStack & Embedded Engineer";
  seraph.stack = {"C++", "React", "Node.js", "PCB Design"};

  if (seraph.isReady()) {
    seraph.build();
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