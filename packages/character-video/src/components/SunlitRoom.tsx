import React from "react";
import {interpolate, useCurrentFrame} from "remotion";

const Mountain: React.FC<{x:number;y:number;scale:number;opacity:number}> = ({x,y,scale,opacity}) => (
  <path
    d={`M ${x} ${y} l ${95*scale} ${-75*scale} l ${78*scale} ${52*scale} l ${72*scale} ${-42*scale} l ${125*scale} ${100*scale} l -370 0 z`}
    fill="#3b7890"
    opacity={opacity}
  />
);

export const SunlitRoom: React.FC = () => {
  const frame=useCurrentFrame();
  const cloudShift=interpolate(frame,[0,299],[0,28]);
  const curtain=Math.sin(frame/45)*3;
  const plantSway=Math.sin(frame/22)*2.5;

  return (
    <svg viewBox="0 0 1280 720" width="100%" height="100%" style={{display:"block"}}>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d7a94"/>
          <stop offset="0.55" stopColor="#c8a58d"/>
          <stop offset="1" stopColor="#b47e5e"/>
        </linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#28a7e7"/>
          <stop offset="0.55" stopColor="#78d2f0"/>
          <stop offset="1" stopColor="#d9f2f2"/>
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3ba6d2"/>
          <stop offset="1" stopColor="#1e6f9e"/>
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a85e39"/>
          <stop offset="0.55" stopColor="#d68d4c"/>
          <stop offset="1" stopColor="#9a5539"/>
        </linearGradient>
        <linearGradient id="sunbeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffce8" stopOpacity="0.62"/>
          <stop offset="1" stopColor="#fff6bd" stopOpacity="0"/>
        </linearGradient>
        <filter id="soft"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>

      <rect width="1280" height="720" fill="url(#wall)"/>
      <rect x="170" y="45" width="875" height="455" rx="8" fill="#573a33"/>
      <rect x="190" y="65" width="835" height="415" fill="url(#sky)"/>

      <g transform={`translate(${cloudShift} 0)`} opacity="0.93">
        <ellipse cx="410" cy="142" rx="86" ry="42" fill="#fff7ef"/>
        <ellipse cx="472" cy="132" rx="68" ry="54" fill="#fffaf5"/>
        <ellipse cx="725" cy="120" rx="104" ry="48" fill="#fff9f3"/>
        <ellipse cx="796" cy="143" rx="74" ry="38" fill="#fff9f3"/>
      </g>

      <Mountain x={210} y={340} scale={1.2} opacity={0.75}/>
      <Mountain x={480} y={345} scale={1.42} opacity={0.85}/>
      <Mountain x={735} y={350} scale={1.05} opacity={0.78}/>
      <rect x="190" y="335" width="835" height="145" fill="url(#sea)"/>
      <path d="M190 376 C360 354 525 395 690 368 C820 348 914 360 1025 338 L1025 480 L190 480 Z" fill="#4fa6b9" opacity="0.45"/>
      <path d="M620 360 l8 -58 l8 58 z" fill="#fff"/>
      <path d="M630 360 l0 -54 l45 54 z" fill="#f4fbff"/>
      <path d="M610 363 l85 0 l-14 10 l-58 0 z" fill="#8f4a34"/>

      <rect x="585" y="65" width="12" height="415" fill="#573a33"/>
      <rect x="805" y="65" width="12" height="415" fill="#573a33"/>
      <rect x="190" y="220" width="835" height="10" fill="#573a33"/>
      <rect x="190" y="410" width="835" height="10" fill="#573a33"/>

      <g transform={`translate(${curtain} 0)`}>
        <path d="M168 55 C142 145 154 246 132 375 L200 375 C188 240 205 140 198 55 Z" fill="#ddd0c1"/>
        <path d="M1042 55 C1067 150 1056 255 1081 383 L1014 383 C1026 245 1009 142 1015 55 Z" fill="#e3d4c6"/>
      </g>

      <rect y="500" width="1280" height="220" fill="url(#floor)"/>
      {new Array(12).fill(true).map((_,i)=>(
        <line key={i} x1={i*115} y1="500" x2={i*115-45} y2="720" stroke="#8f4c33" strokeWidth="3" opacity="0.55"/>
      ))}

      <g>
        <rect x="-18" y="505" width="425" height="172" rx="24" fill="#f5e9dc"/>
        <path d="M0 520 C90 492 240 500 404 528 L404 602 C246 573 110 580 0 614 Z" fill="#fff8ee"/>
        <rect x="32" y="590" width="350" height="80" rx="22" fill="#e4cfbc"/>
        <ellipse cx="170" cy="515" rx="98" ry="18" fill="#fff" opacity="0.48"/>
      </g>

      <g>
        <rect x="25" y="395" width="302" height="24" rx="5" fill="#8a5138"/>
        <rect x="44" y="419" width="18" height="120" fill="#70432f"/>
        <rect x="287" y="419" width="18" height="120" fill="#70432f"/>
        <rect x="80" y="367" width="170" height="24" rx="5" fill="#e7dfd2"/>
        <rect x="100" y="333" width="110" height="34" rx="6" fill="#fbf4e8"/>
        <path d="M245 340 Q278 293 310 320" fill="none" stroke="#d4a35e" strokeWidth="8"/>
        <circle cx="311" cy="319" r="10" fill="#f7df8b"/>
      </g>

      <g>
        <rect x="1085" y="370" width="190" height="230" rx="8" fill="#8e624b"/>
        <rect x="1105" y="392" width="150" height="18" fill="#cba17f"/>
        <rect x="1120" y="430" width="120" height="66" fill="#65504a" opacity="0.7"/>
        <rect x="1115" y="525" width="130" height="54" fill="#705144"/>
        <rect x="1032" y="506" width="20" height="143" fill="#6f4937"/>
        <ellipse cx="1042" cy="491" rx="45" ry="15" fill="#704c3a"/>
      </g>

      <g transform={`rotate(${plantSway} 1110 346)`}>
        <path d="M1110 402 Q1093 352 1116 306 M1110 391 Q1145 346 1157 312 M1108 378 Q1070 342 1062 314" fill="none" stroke="#4c8a4e" strokeWidth="7" strokeLinecap="round"/>
        <ellipse cx="1118" cy="304" rx="22" ry="8" fill="#7dbb55"/>
        <ellipse cx="1159" cy="310" rx="20" ry="8" fill="#6eaa4c"/>
        <ellipse cx="1061" cy="312" rx="18" ry="8" fill="#7fbd59"/>
        <rect x="1084" y="393" width="55" height="35" rx="7" fill="#b36b4e"/>
      </g>

      <polygon points="470,500 1010,500 1235,720 620,720" fill="url(#sunbeam)" opacity="0.8"/>
      <ellipse cx="870" cy="613" rx="310" ry="72" fill="#ffeeb5" opacity="0.18" filter="url(#soft)"/>
    </svg>
  );
};
