import React from "react";

export const YarnBall: React.FC<{x:number;y:number;rotation:number;scale:number}> = ({x,y,rotation,scale}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    <defs>
      <radialGradient id="yarn" cx="35%" cy="28%" r="75%">
        <stop offset="0" stopColor="#ffc7cc"/>
        <stop offset="0.55" stopColor="#eb6576"/>
        <stop offset="1" stopColor="#b92f4d"/>
      </radialGradient>
    </defs>
    <ellipse cx="0" cy="31" rx="42" ry="11" fill="rgba(70,30,30,0.18)"/>
    <circle r="38" fill="url(#yarn)" stroke="#a62f47" strokeWidth="3"/>
    <path d="M-33 -9 C-10 -31 19 -29 32 -7 M-35 7 C-9 -10 17 -10 36 8 M-28 23 C-5 7 18 7 30 23 M-20 -31 C-5 -13 8 11 17 33" fill="none" stroke="#ffdce0" strokeWidth="3" opacity="0.65" strokeLinecap="round"/>
  </g>
);
