import React from "react";
import {spring,useCurrentFrame,useVideoConfig} from "remotion";
import {DOI_CHARACTER} from "../characters/DoiCharacter";

const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,value));
const pulse=(frame:number,center:number,radius:number)=>clamp(1-Math.abs(frame-center)/radius,0,1);

export const DoiVector: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const colors=DOI_CHARACTER.appearance;

  const notice=clamp((frame-58)/55,0,1);
  const play=clamp((frame-118)/92,0,1);
  const pounce=spring({fps,frame:Math.max(0,frame-210),config:{damping:10,stiffness:135,mass:0.75}});
  const settle=spring({fps,frame:Math.max(0,frame-258),config:{damping:14,stiffness:90,mass:0.85}});

  const breathe=Math.sin(frame/17)*2.2;
  const blink=Math.max(pulse(frame,38,4),pulse(frame,102,4),pulse(frame,282,4));
  const eyeScale=1-blink*0.9;
  const headRotate=-4+notice*8+Math.sin(frame/48)*1.5-settle*4;
  const tailRotate=-16+Math.sin(frame/10)*(7+play*6)+pounce*10;
  const batPulse=Math.max(0,Math.sin((frame-125)/6))*play*(1-clamp((frame-210)/12,0,1));
  const pawRotate=-8-batPulse*32;
  const pawLift=batPulse*22;
  const bodyX=-pounce*24+settle*9;
  const bodyY=breathe-pounce*15+settle*5;
  const bodyRotate=pounce*-2.4+settle*1.4;

  return (
    <svg viewBox="0 0 420 500" width="420" height="500" style={{overflow:"visible"}}>
      <defs>
        <radialGradient id="furBody" cx="45%" cy="30%" r="75%">
          <stop offset="0" stopColor={colors.furLight}/>
          <stop offset="0.68" stopColor={colors.fur}/>
          <stop offset="1" stopColor={colors.furShadow}/>
        </radialGradient>
        <radialGradient id="eye" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#ffd75b"/>
          <stop offset="0.55" stopColor={colors.eyes}/>
          <stop offset="1" stopColor="#b9630b"/>
        </radialGradient>
        <filter id="catShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10"/>
        </filter>
        <filter id="softHighlight"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>

      <ellipse cx="216" cy="463" rx="130" ry="27" fill="rgba(58,31,24,0.24)" filter="url(#catShadow)"/>

      <g transform={`translate(${bodyX} ${bodyY}) rotate(${bodyRotate} 210 350)`}>
        <g transform={`rotate(${tailRotate} 95 362)`}>
          <path d="M105 350 C34 342 17 402 45 435 C77 470 150 448 161 403 C168 374 139 352 105 350 Z" fill="url(#furBody)" stroke="#a9796c" strokeWidth="4"/>
          <path d="M65 390 C80 370 113 369 136 386" fill="none" stroke="#efd2c1" strokeWidth="10" opacity="0.35" strokeLinecap="round"/>
        </g>

        <ellipse cx="220" cy="332" rx="125" ry="141" fill="url(#furBody)" stroke="#a9796c" strokeWidth="4"/>
        <ellipse cx="170" cy="390" rx="48" ry="79" fill="#d0a08d" opacity="0.7"/>
        <ellipse cx="275" cy="390" rx="48" ry="79" fill="#d0a08d" opacity="0.72"/>

        <g transform={`translate(0 ${-pawLift}) rotate(${pawRotate} 288 315)`}>
          <ellipse cx="292" cy="336" rx="35" ry="88" fill="url(#furBody)" stroke="#a9796c" strokeWidth="3"/>
          <ellipse cx="304" cy="417" rx="40" ry="28" fill="#d5aa97" stroke="#a9796c" strokeWidth="3"/>
          <path d="M292 410 l0 18 M306 409 l2 18 M319 409 l3 16" stroke="#a9796c" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        <ellipse cx="160" cy="423" rx="42" ry="30" fill="#d5aa97" stroke="#a9796c" strokeWidth="3"/>
        <path d="M146 415 l-2 20 M160 414 l0 21 M175 415 l2 18" stroke="#a9796c" strokeWidth="2.5" strokeLinecap="round"/>

        <g transform={`rotate(${headRotate} 210 160)`}>
          <path d="M121 94 L101 28 L165 72 Z" fill="url(#furBody)" stroke="#a9796c" strokeWidth="4"/>
          <path d="M297 93 L322 28 L257 72 Z" fill="url(#furBody)" stroke="#a9796c" strokeWidth="4"/>
          <path d="M119 74 L111 43 L147 73 Z" fill="#d99894" opacity="0.72"/>
          <path d="M299 74 L313 43 L273 73 Z" fill="#d99894" opacity="0.72"/>
          <ellipse cx="210" cy="155" rx="119" ry="108" fill="url(#furBody)" stroke="#a9796c" strokeWidth="4"/>

          <ellipse cx="165" cy="145" rx="31" ry={34*eyeScale} fill="url(#eye)" stroke="#6b3c1d" strokeWidth="4"/>
          <ellipse cx="255" cy="145" rx="31" ry={34*eyeScale} fill="url(#eye)" stroke="#6b3c1d" strokeWidth="4"/>
          <ellipse cx="165" cy="145" rx="11" ry={22*eyeScale} fill="#1c1d1f"/>
          <ellipse cx="255" cy="145" rx="11" ry={22*eyeScale} fill="#1c1d1f"/>
          <circle cx="155" cy="132" r="7" fill="#fff" opacity={eyeScale}/>
          <circle cx="245" cy="132" r="7" fill="#fff" opacity={eyeScale}/>

          <ellipse cx="210" cy="190" rx="18" ry="13" fill={colors.nose}/>
          <path d="M210 201 C204 216 190 217 181 210 M210 201 C216 216 230 217 239 210" fill="none" stroke="#7c514d" strokeWidth="4" strokeLinecap="round"/>
          <path d="M145 192 C108 187 86 179 64 167 M146 202 C111 203 84 203 60 211 M275 191 C311 184 337 176 356 162 M274 203 C311 204 338 207 360 218" fill="none" stroke="#f8eee7" strokeWidth="2.5" strokeLinecap="round"/>
          <ellipse cx="210" cy="95" rx="75" ry="24" fill="#fff" opacity="0.08" filter="url(#softHighlight)"/>
        </g>

        <g>
          <path d="M121 230 C162 214 261 212 312 237 L292 323 L213 301 L146 326 Z" fill={colors.bandana}/>
          <path d="M146 326 L213 301 L292 323 L236 358 Z" fill={colors.bandana}/>
          <path d="M150 318 L213 295 L286 316" fill="none" stroke={colors.bandanaAccent} strokeWidth="3" opacity="0.8"/>
          <g fill={colors.bandanaAccent} opacity="0.92">
            <circle cx="180" cy="262" r="6"/>
            <circle cx="169" cy="253" r="3"/>
            <circle cx="180" cy="250" r="3"/>
            <circle cx="190" cy="254" r="3"/>
            <circle cx="245" cy="278" r="7"/>
            <circle cx="234" cy="266" r="3.5"/>
            <circle cx="246" cy="264" r="3.5"/>
            <circle cx="256" cy="270" r="3.5"/>
          </g>
          <path d="M306 237 C338 229 359 238 373 255 C350 267 330 270 307 262 Z" fill={colors.bandana}/>
        </g>
      </g>
    </svg>
  );
};
