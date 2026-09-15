import React from "react";
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from "remotion";
import {DoiVector} from "../components/DoiVector";
import {SunlitRoom} from "../components/SunlitRoom";
import {YarnBall} from "../components/YarnBall";

const clamp=(value:number,min:number,max:number)=>Math.min(max,Math.max(min,value));

const Dust: React.FC = () => {
  const frame=useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents:"none"}}>
      {new Array(22).fill(true).map((_,index)=>{
        const seed=index+1;
        const x=370+((seed*83)%760)+Math.sin(frame/30+seed)*10;
        const yBase=130+((seed*59)%470);
        const y=yBase-((frame*(0.16+(seed%4)*0.035))%55);
        const opacity=0.12+((Math.sin(frame/18+seed)+1)/2)*0.22;
        const size=2+(seed%4)*1.4;
        return <div key={index} style={{position:"absolute",left:x,top:y,width:size,height:size,borderRadius:"50%",background:"#fffbe8",opacity,boxShadow:"0 0 8px rgba(255,248,197,0.8)"}}/>;
      })}
    </AbsoluteFill>
  );
};

export const DoiYarnDemo: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  const cameraScale=interpolate(frame,[0,299],[1.01,1.075],{easing:Easing.inOut(Easing.quad),extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const cameraX=interpolate(frame,[0,299],[0,-18],{easing:Easing.inOut(Easing.quad)});
  const cameraY=Math.sin(frame/70)*3;

  const play=clamp((frame-118)/92,0,1);
  const batWave=Math.sin((frame-120)/7.2);
  const batEnvelope=play*(1-clamp((frame-210)/18,0,1));
  const pounce=spring({fps,frame:Math.max(0,frame-210),config:{damping:10,stiffness:135,mass:0.75}});
  const settle=spring({fps,frame:Math.max(0,frame-258),config:{damping:14,stiffness:90,mass:0.85}});

  const yarnX=724+batWave*66*batEnvelope+pounce*52-settle*20;
  const yarnY=593-Math.abs(batWave)*9*batEnvelope-pounce*13+settle*4;
  const yarnRotation=batWave*25*batEnvelope+pounce*42;
  const yarnScale=1+Math.abs(batWave)*0.045*batEnvelope+pounce*0.05;

  const pawX=846-pounce*24;
  const pawY=577-Math.max(0,batWave)*20*batEnvelope-pounce*10;
  const controlX=(pawX+yarnX)/2;
  const stringLift=34+Math.abs(batWave)*22*batEnvelope+pounce*18;
  const stringPath=`M ${pawX} ${pawY} Q ${controlX} ${Math.min(pawY,yarnY)-stringLift} ${yarnX} ${yarnY}`;

  const titleOpacity=interpolate(frame,[0,18,62,76],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});

  return (
    <AbsoluteFill style={{background:"#eac8aa",overflow:"hidden",fontFamily:"Arial, sans-serif"}}>
      <div style={{position:"absolute",inset:-28,transform:`translate(${cameraX}px, ${cameraY}px) scale(${cameraScale})`,transformOrigin:"58% 62%"}}>
        <SunlitRoom/>
      </div>

      <div style={{position:"absolute",inset:0,background:"linear-gradient(112deg, rgba(255,255,255,0) 24%, rgba(255,245,196,0.11) 48%, rgba(255,235,163,0.19) 60%, rgba(255,255,255,0) 77%)",transform:`translateX(${interpolate(frame,[0,299],[-70,90])}px)`}}/>
      <Dust/>

      <svg viewBox="0 0 1280 720" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
        <path d={stringPath} fill="none" stroke="#f3a6ad" strokeWidth="5" strokeLinecap="round"/>
        <path d={stringPath} fill="none" stroke="#ffe2e4" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
        <YarnBall x={yarnX} y={yarnY} rotation={yarnRotation} scale={yarnScale}/>
      </svg>

      <div style={{position:"absolute",left:680,top:205,width:420,height:500,filter:"drop-shadow(0 16px 12px rgba(68,35,24,0.18))"}}>
        <DoiVector/>
      </div>

      <div style={{position:"absolute",left:58,top:48,opacity:titleOpacity,padding:"10px 18px",borderRadius:999,background:"rgba(255,250,242,0.72)",boxShadow:"0 8px 28px rgba(75,43,28,0.12)",backdropFilter:"blur(6px)",color:"#4e352d",fontSize:28,fontWeight:700,letterSpacing:0.2}}>
        Đời và cuộn len
      </div>

      <div style={{position:"absolute",inset:0,boxShadow:"inset 0 0 100px rgba(64,35,28,0.12)",pointerEvents:"none"}}/>
    </AbsoluteFill>
  );
};
