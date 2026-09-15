import {Easing, interpolate, spring} from "remotion";

const clamp=(value:number,min=0,max=1)=>Math.min(max,Math.max(min,value));

const progress=(frame:number,start:number,duration:number)=>
  clamp((frame-start)/duration);

const keyed=(p:number,input:number[],output:number[])=>
  interpolate(p,input,output,{
    easing:Easing.inOut(Easing.cubic),
    extrapolateLeft:"clamp",
    extrapolateRight:"clamp",
  });

const actionPulse=(frame:number,start:number,duration:number)=>{
  const p=progress(frame,start,duration);
  return p<=0||p>=1?0:Math.sin(Math.PI*p);
};

const blinkPulse=(frame:number,center:number)=>{
  const d=Math.abs(frame-center);
  return d>=4?0:1-d/4;
};

export type Doi3DMotion={
  bodyY:number;
  bodyRoll:number;
  bodyScaleY:number;
  headPitch:number;
  headYaw:number;
  headRoll:number;
  blink:number;
  pawLift:number;
  pawReach:number;
  pawPitch:number;
  pawRoll:number;
  tail1:number;
  tail2:number;
  tail3:number;
  yarnX:number;
  yarnY:number;
  yarnRotation:number;
};

export const getDoi3DMotion=(frame:number,fps:number):Doi3DMotion=>{
  const breath=Math.sin(frame/20);
  const idleWeight=Math.sin(frame/47)+0.35*Math.sin(frame/23+0.7);
  const look=keyed(progress(frame,45,42),[0,0.45,1],[0,0.7,1]);

  const bat1=actionPulse(frame,98,30);
  const bat2=actionPulse(frame,144,30);
  const bat=Math.max(bat1,bat2);

  const anticipation1=keyed(progress(frame,91,8),[0,0.6,1],[0,1,0.15]);
  const anticipation2=keyed(progress(frame,137,8),[0,0.6,1],[0,1,0.15]);
  const anticipation=Math.max(anticipation1,anticipation2);

  const settle=spring({
    fps,
    frame:Math.max(0,frame-183),
    config:{damping:15,stiffness:80,mass:0.9},
    durationInFrames:45,
  });

  const yarnAfterFirst=keyed(progress(frame,112,30),[0,0.45,1],[0,-0.65,-0.88]);
  const yarnAfterSecond=keyed(progress(frame,158,36),[0,0.4,1],[0,0.75,1.15]);

  const yarnBounce=
    -Math.sin(Math.PI*progress(frame,112,24))*0.12*
      (frame>=112&&frame<=136?1:0)
    -Math.sin(Math.PI*progress(frame,158,26))*0.14*
      (frame>=158&&frame<=184?1:0);

  return {
    bodyY:1.24+breath*0.018+anticipation*-0.045+settle*0.01,
    bodyRoll:idleWeight*0.008+bat*-0.018,
    bodyScaleY:1+breath*0.012-anticipation*0.018,
    headPitch:-0.08+look*0.12+bat*-0.055,
    headYaw:-0.12+look*0.28+Math.sin(frame/54)*0.025,
    headRoll:-0.15+look*0.09+Math.sin(frame/39)*0.018,
    blink:Math.max(
      blinkPulse(frame,34),
      blinkPulse(frame,84),
      blinkPulse(frame,188),
      blinkPulse(frame,224),
    ),
    pawLift:anticipation*0.18+bat*0.28,
    pawReach:bat*0.62,
    pawPitch:-0.08-anticipation*0.2+bat*0.52,
    pawRoll:bat*-0.15,
    tail1:0.42+Math.sin(frame/18)*0.11+bat*0.09,
    tail2:0.35+Math.sin(frame/16+0.8)*0.15+bat*0.12,
    tail3:0.28+Math.sin(frame/14+1.5)*0.18+bat*0.14,
    yarnX:1.3+yarnAfterFirst+yarnAfterSecond,
    yarnY:0.23+yarnBounce,
    yarnRotation:(yarnAfterFirst+yarnAfterSecond)*2.6,
  };
};
