import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../App.css';

const CodeTerminal = () => {
  const code = `#include "Engineer.h"

class Rares : public Engineer {
public:
  // Electronics & Telecom background
  // with a software-first mindset

  void build() {
    hardware.connect();
    server.deploy();
    client.render();
  }

  Stack getStack() {
    return {
      "C / C++", "Java",
      "JavaScript", "React",
      "Django", "Arduino"
    };
  }
};

int main() {
  Rares dev;
  dev.setLocation("Cluj-Napoca, RO");
  dev.setStatus(OPEN_TO_WORK);
  dev.build();
  return 0;
}`;

  return (
    <div className="terminal-window">
      <div className="terminal-bar">
        <span className="t-dot red" />
        <span className="t-dot yellow" />
        <span className="t-dot green" />
        <span className="terminal-filename">main.cpp</span>
      </div>
      <div className="terminal-body">
        <TypeAnimation
          sequence={[code, 4000]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ whiteSpace: 'pre', display: 'block' }}
        />
      </div>
    </div>
  );
};

export default CodeTerminal;