import React from 'react';
import '../Circuit.css';

const CircuitBackground = () =>{
    //SVG of a PCB
    return(
        <div className='circuit-container'>
            <svg 
            className='circuit-svg'
            viewBox='0 0 1920 1080'
            preserveAspectRatio='xMidYMid slice'
            xmlns='http://www.w3.org/2000/svg'>
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result='coloredBlur'>
                            <feMerge>
                                <feMerge in="coloredBlur" />
                                <feMerge in="SourceGraphic"/>
                            </feMerge>
                        </feGaussianBlur>
                    </filter>
                    <pattern id="pads" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="50" cy="50" r="3" fill="#222" />
                        <circle cx="0" cy="0" r="3" fill="#222" />
                    </pattern>
                </defs>
                <g className='static-traces' fill="none" stroke="#1a1a1a" strokeWidth="2">
                    {/* Main Horizontal/Vertical Bus Lines */}
                    <path d="M0 100 H 1920 M0 300 H 1920 M0 500 H 1920 M0 800 H 1920" />
                    <path d="M100 0 V 1080 M300 0 V 1080 M600 0 V 1080 M1200 0 V 1080 M1600 0 V 1080" />
          
                    {/* Complex branching paths */}
                    <path d="M 300 100 L 400 200 H 600 L 700 100 H 1200 L 1300 200 H 1600" />
                    <path d="M 100 300 L 200 400 V 600 L 100 700" />
                    <path d="M 1600 500 L 1500 600 H 1200 L 1100 500" />
                    <path d="M 600 800 L 700 900 H 1000 L 1100 800" />
          
                    {/* Corner details */}
                    <path d="M 0 1080 L 200 880 H 400" />
                    <path d="M 1920 0 L 1720 200 H 1500" />
                </g>

                <rect width="100%" height="100%" fill="url(#pads)" opacity="0.3" />

                <g className="animated-currents" fill="none" strokeWidth="3" filter="url(#glow)">
          
                    {/* Path 1: Cyan Current moving right and down */}
                    <path className="current-flow cyan speed-slow" pathLength="1"
                            d="M -100 100 H 300 L 400 200 H 600 L 700 100 H 1200 L 1300 200 H 1600 L 1700 100 H 2000" />

                    {/* Path 2: Green Current moving down and left */}
                    <path className="current-flow green speed-medium delay-1" pathLength="1"
                            d="M 1600 -100 V 500 L 1500 600 H 1200 L 1100 500 V 800 L 1000 900 H 700 L 600 800 V 1200" />

                    {/* Path 3: Cyan Current moving up from bottom left */}
                    <path className="current-flow cyan speed-fast delay-2" pathLength="1"
                            d="M -100 1180 L 100 980 V 700 L 200 600 V 400 L 100 300 V -100" />

                    {/* Path 4: Long horizontal Green Data Bus */}
                    <path className="current-flow green speed-slow delay-3" pathLength="1"
                            d="M 2000 300 H -100" />
                            
                    {/* Path 5: Diagonal Cyan burst */}
                    <path className="current-flow cyan speed-super-fast" pathLength="1"
                            d="M 1920 0 L 1720 200 H 1500 L 1200 500 V 1200" />
                </g>
            </svg>

        </div>
    );
};

export default CircuitBackground;