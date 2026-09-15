import {Easing, interpolate, spring} from "remotion";

const clamp=(value:number,min=0,max=1)=>Math.min(max,Math.max(min,value));

const phase=(frame:number,start:number,duration:number)=>clamp((frame-start)/duration);

const keyed=(p:number, input:number[], output:number[]) =>
  interpolate(p,input,output,{
    extrapolateLeft:"clamp",
    extrapolateRight:"clamp",
    easing:Easing.inOut(Easing.cubic),
  });

const bat=(frame:number,start:number)=>{
  const p=phase(frame,start,28);
  if(p<=0||p>=1){
    return {pawX:0,pawY:0,pawRotate:0,bodyX:0,bodyRotate:0,energy:0};
  }

  return {
    pawX:keyed(p,[0,0.25,0.48,0.7,1],[0,7,-28,-12,0]),
    pawY:keyed(p,[0,0.25,0.48,0.7,1],[0,-14,12,5,0]),
    pawRotate:keyed(p,[0,0.25,0.48,0.7,1],[0,5,-20,-7,0]),
    bodyX:keyed(p,[0,0.4,0.62,1],[0,-4,5,0]),
    bodyRotate:keyed(p,[0,0.4,0.62,1],[0,-0.7,0.6,0]),
    energy:Math.sin(Math.PI*p),
  };
};

export type DoiMotion={
  rootX:number;
  rootY:number;
  rootRotate:number;
  rootScaleX:number;
  rootScaleY:number;
  headX:number;
  headY:number;
  headRotate:number;
  pawX:number;
  pawY:number;
  pawRotate:number;
  tailRotate:number;
  blink:number;
  playEnergy:number;
};

const blinkPulse=(frame:number,center:number)=>{
  const d=Math.abs(frame-center);
  return d>=4?0:1-d/4;
};

export const getDoiMotion=(frame:number,fps:number):DoiMotion=>{
  const notice=keyed(phase(frame,55,58),[0,0.45,1],[0,0.65,1]);
  const b1=bat(frame,118);
  const b2=bat(frame,156);
  const b3=bat(frame,190);
  const playEnergy=Math.max(b1.energy,b2.energy,b3.energy);

  const anticipation=keyed(
    phase(frame,210,14),
    [0,0.55,1],
    [0,1,0.3],
  );

  const pounceSpring=spring({
    fps,
    frame:Math.max(0,frame-224),
    config:{damping:11,stiffness:125,mass:0.85},
    durationInFrames:42,
  });

  const settle=spring({
    fps,
    frame:Math.max(0,frame-255),
    config:{damping:15,stiffness:80,mass:0.9},
    durationInFrames:42,
  });

  const pounceWindow=keyed(
    phase(frame,224,54),
    [0,0.32,0.7,1],
    [0,1,0.38,0],
  );

  const breath=Math.sin(frame/22);
  const weight=Math.sin(frame/48)+0.35*Math.sin(frame/19+0.8);

  const bats=[b1,b2,b3];
  const pawX=bats.reduce((sum,v)=>sum+v.pawX,0);
  const pawY=bats.reduce((sum,v)=>sum+v.pawY,0);
  const pawRotate=bats.reduce((sum,v)=>sum+v.pawRotate,0);
  const batBodyX=bats.reduce((sum,v)=>sum+v.bodyX,0);
  const batBodyRotate=bats.reduce((sum,v)=>sum+v.bodyRotate,0);

  const rootX=weight*1.4+batBodyX-pounceWindow*20+pounceSpring*4-settle*2;
  const rootY=breath*1.8+anticipation*5-pounceWindow*13+pounceSpring*2;
  const rootRotate=weight*0.18+batBodyRotate-anticipation*0.5-pounceWindow*1.25;

  return {
    rootX,
    rootY,
    rootRotate,
    rootScaleX:1+breath*0.0025+anticipation*0.012-pounceWindow*0.007,
    rootScaleY:1+breath*0.006-anticipation*0.018+pounceWindow*0.01,
    headX:-notice*3-playEnergy*1.5,
    headY:notice*5+playEnergy*1.5,
    headRotate:-notice*2.8+Math.sin(frame/38)*0.45-playEnergy*0.55,
    pawX,
    pawY,
    pawRotate,
    tailRotate:
      -2+
      Math.sin(frame/14)*4+
      Math.sin(frame/31+0.9)*2+
      playEnergy*3+
      pounceWindow*7,
    blink:Math.max(
      blinkPulse(frame,42),
      blinkPulse(frame,101),
      blinkPulse(frame,178),
      blinkPulse(frame,286),
    ),
    playEnergy,
  };
};

export const DOI_ASSET={width:466,height:620} as const;

export const DOI_STAGE={
  left:675,
  top:118,
  width:430,
} as const;

export const getDoiPawStagePoint=(motion:DoiMotion)=>{
  const scale=DOI_STAGE.width/DOI_ASSET.width;
  const rootLocalX=motion.rootX;
  const rootLocalY=motion.rootY;

  return {
    x:DOI_STAGE.left+(270+motion.pawX+rootLocalX)*scale,
    y:DOI_STAGE.top+(536+motion.pawY+rootLocalY)*scale,
  };
};
