import React from "react";
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from "remotion";
import {DoiPuppet} from "../components/DoiPuppet";
import {DOI_STAGE,getDoiMotion,getDoiPawStagePoint} from "../components/doi-motion";
import {SunlitRoom} from "../components/SunlitRoom";
import {YarnBall} from "../components/YarnBall";

const clamp=(value:number,min=0,max=1)=>Math.min(max,Math.max(min,value));

const easeOut=(p:number)=>1-Math.pow(1-clamp(p),3);

const rollStep=(frame:number,contact:number,distance:number,duration=24)=>{
  const p=clamp((frame-contact)/duration);
  return distance*easeOut(p);
};

const bounce=(frame:number,contact:number,height:number,duration=20)=>{
  const p=clamp((frame-contact)/duration);
  return -Math.sin(Math.PI*p)*height;
};

const Dust:React.FC=()=>{
  const frame=useCurrentFrame();

  return (
    <AbsoluteFill style={{pointerEvents:"none"}}>
      {new Array(20).fill(true).map((_,index)=>{
        const seed=index+1;
        const x=370+((seed*83)%760)+Math.sin(frame/31+seed)*9;
        const yBase=130+((seed*59)%470);
        const y=yBase-((frame*(0.13+(seed%4)*0.03))%52);
        const opacity=0.1+((Math.sin(frame/19+seed)+1)/2)*0.18;
        const size=2+(seed%4)*1.25;

        return (
          <div
            key={index}
            style={{
              position:"absolute",
              left:x,
              top:y,
              width:size,
              height:size,
              borderRadius:"50%",
              background:"#fffbe8",
              opacity,
              boxShadow:"0 0 7px rgba(255,248,197,0.75)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const DoiYarnDemo:React.FC=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const motion=getDoiMotion(frame,fps);
  const paw=getDoiPawStagePoint(motion);

  const cameraScale=interpolate(frame,[0,299],[1.012,1.055],{
    easing:Easing.inOut(Easing.quad),
    extrapolateLeft:"clamp",
    extrapolateRight:"clamp",
  });
  const cameraX=interpolate(frame,[0,299],[0,-10],{
    easing:Easing.inOut(Easing.quad),
  });
  const cameraY=Math.sin(frame/78)*2;

  const contacts=[134,172,206];
  const yarnX=
    752+
    rollStep(frame,contacts[0],-52)+
    rollStep(frame,contacts[1],76)+
    rollStep(frame,contacts[2],-48);

  const yarnBounce=
    bounce(frame,contacts[0],11)+
    bounce(frame,contacts[1],13)+
    bounce(frame,contacts[2],10);

  const pounce=spring({
    fps,
    frame:Math.max(0,frame-224),
    config:{damping:12,stiffness:105,mass:0.9},
    durationInFrames:48,
  });

  const yarnY=604+yarnBounce-pounce*3;
  const yarnRotation=(yarnX-752)*0.72;
  const yarnScale=1+Math.min(0.045,Math.abs(yarnBounce)/280);

  const dx=yarnX-paw.x;
  const controlX=paw.x+dx*0.52;
  const stringLift=32+Math.min(24,Math.abs(dx)*0.08);
  const stringPath=`M ${paw.x} ${paw.y} Q ${controlX} ${Math.min(paw.y,yarnY)-stringLift} ${yarnX} ${yarnY}`;

  const titleOpacity=interpolate(frame,[0,16,58,74],[0,1,1,0],{
    extrapolateLeft:"clamp",
    extrapolateRight:"clamp",
  });

  return (
    <AbsoluteFill style={{background:"#eac8aa",overflow:"hidden",fontFamily:"Arial, sans-serif"}}>
      <div
        style={{
          position:"absolute",
          inset:-24,
          transform:`translate(${cameraX}px,${cameraY}px) scale(${cameraScale})`,
          transformOrigin:"58% 62%",
        }}
      >
        <SunlitRoom/>
      </div>

      <div
        style={{
          position:"absolute",
          inset:0,
          background:"linear-gradient(112deg, rgba(255,255,255,0) 24%, rgba(255,245,196,0.09) 48%, rgba(255,235,163,0.16) 60%, rgba(255,255,255,0) 77%)",
          transform:`translateX(${interpolate(frame,[0,299],[-55,70])}px)`,
        }}
      />
      <Dust/>

      <svg viewBox="0 0 1280 720" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
        <path d={stringPath} fill="none" stroke="#e9919b" strokeWidth="5" strokeLinecap="round"/>
        <path d={stringPath} fill="none" stroke="#ffe4e6" strokeWidth="1.6" strokeLinecap="round" opacity="0.82"/>
        <YarnBall x={yarnX} y={yarnY} rotation={yarnRotation} scale={yarnScale}/>
      </svg>

      <div
        style={{
          position:"absolute",
          left:DOI_STAGE.left,
          top:DOI_STAGE.top,
          width:DOI_STAGE.width,
          transform:`scale(${DOI_STAGE.width/466})`,
          transformOrigin:"top left",
          filter:"drop-shadow(0 14px 12px rgba(60,31,24,0.16))",
        }}
      >
        <DoiPuppet/>
      </div>

      <div
        style={{
          position:"absolute",
          left:58,
          top:48,
          opacity:titleOpacity,
          padding:"10px 18px",
          borderRadius:999,
          background:"rgba(255,250,242,0.72)",
          boxShadow:"0 8px 28px rgba(75,43,28,0.12)",
          backdropFilter:"blur(6px)",
          color:"#4e352d",
          fontSize:28,
          fontWeight:700,
          letterSpacing:0.2,
        }}
      >
        Đời và cuộn len · V2
      </div>

      <div style={{position:"absolute",inset:0,boxShadow:"inset 0 0 90px rgba(64,35,28,0.1)",pointerEvents:"none"}}/>
    </AbsoluteFill>
  );
};
