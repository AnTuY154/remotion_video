import React from "react";
import {Img, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {DOI_ASSET, getDoiMotion} from "./doi-motion";

const asset=staticFile("assets/doi-v2.webp");

const imageStyle:React.CSSProperties={
  position:"absolute",
  inset:0,
  width:DOI_ASSET.width,
  height:DOI_ASSET.height,
};

const Blink:React.FC<{amount:number}> = ({amount})=>{
  if(amount<=0){
    return null;
  }

  return (
    <>
      <div
        style={{
          position:"absolute",
          left:210,
          top:177,
          width:44,
          height:25,
          borderRadius:"52% 52% 48% 48%",
          background:"rgba(214,174,153,0.95)",
          transform:`scaleY(${0.18+amount*0.82}) rotate(3deg)`,
          opacity:amount,
          boxShadow:"inset 0 -2px 0 rgba(99,61,49,0.38)",
        }}
      />
      <div
        style={{
          position:"absolute",
          left:294,
          top:139,
          width:42,
          height:27,
          borderRadius:"52% 52% 48% 48%",
          background:"rgba(214,174,153,0.95)",
          transform:`scaleY(${0.18+amount*0.82}) rotate(-1deg)`,
          opacity:amount,
          boxShadow:"inset 0 -2px 0 rgba(99,61,49,0.38)",
        }}
      />
    </>
  );
};

export const DoiPuppet:React.FC = ()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const motion=getDoiMotion(frame,fps);

  const bodySkew=motion.playEnergy*-0.3+Math.sin(frame/60)*0.08;

  return (
    <div
      style={{
        position:"relative",
        width:DOI_ASSET.width,
        height:DOI_ASSET.height,
        transformOrigin:"52% 88%",
        transform:`translate(${motion.rootX}px,${motion.rootY}px) rotate(${motion.rootRotate}deg) skewX(${bodySkew}deg) scale(${motion.rootScaleX},${motion.rootScaleY})`,
      }}
    >
      <div
        style={{
          position:"absolute",
          left:66,
          top:572,
          width:350,
          height:30,
          borderRadius:"50%",
          background:"rgba(67,36,27,0.22)",
          filter:"blur(10px)",
          transform:`scaleX(${1-motion.playEnergy*0.04})`,
        }}
      />

      <Img
        src={asset}
        style={{
          ...imageStyle,
          filter:"blur(12px)",
          opacity:0.26,
          transform:"scale(1.006)",
        }}
      />

      <Img
        src={asset}
        style={{
          ...imageStyle,
          clipPath:"polygon(0 0,100% 0,100% 100%,77% 100%,73% 57%,49% 57%,46% 100%,0 100%)",
        }}
      />

      <div
        style={{
          position:"absolute",
          inset:0,
          clipPath:"polygon(46% 55%,74% 55%,79% 100%,44% 100%)",
          transformOrigin:"57% 62%",
          transform:`translate(${motion.pawX}px,${motion.pawY}px) rotate(${motion.pawRotate}deg)`,
          filter:motion.playEnergy>0.25?"drop-shadow(0 3px 2px rgba(83,46,35,0.12))":"none",
        }}
      >
        <Img src={asset} style={imageStyle}/>
      </div>

      <Blink amount={motion.blink}/>

      <div
        style={{
          position:"absolute",
          left:330,
          top:250,
          width:72,
          height:20,
          borderRadius:"50%",
          background:"rgba(18,32,78,0.08)",
          transform:`rotate(${Math.sin(frame/16)*0.8+motion.playEnergy*1.2}deg)`,
          transformOrigin:"left center",
          pointerEvents:"none",
        }}
      />
    </div>
  );
};
