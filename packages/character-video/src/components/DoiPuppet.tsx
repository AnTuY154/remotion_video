import React from "react";
import {Img, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {DOI_ASSET, getDoiMotion} from "./doi-motion";

const asset=staticFile("assets/doi-v2.webp");

const baseMaskSvg=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466 620">
  <rect width="466" height="620" fill="white"/>
  <path d="M55 0 H425 V315 Q385 345 330 348 H135 Q72 326 50 240 Z" fill="black"/>
  <path d="M0 330 H230 V620 H0 Z" fill="black"/>
  <path d="M220 355 H355 V620 H220 Z" fill="black"/>
</svg>
`;

const baseMask=`url("data:image/svg+xml,${encodeURIComponent(baseMaskSvg)}")`;

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
          height:26,
          borderRadius:"50%",
          background:"rgba(216,177,157,0.96)",
          transform:`scaleY(${0.2+amount*0.8}) rotate(3deg)`,
          opacity:amount,
          boxShadow:"inset 0 -2px 0 rgba(91,55,45,0.38)",
        }}
      />
      <div
        style={{
          position:"absolute",
          left:294,
          top:139,
          width:42,
          height:28,
          borderRadius:"50%",
          background:"rgba(216,177,157,0.96)",
          transform:`scaleY(${0.2+amount*0.8}) rotate(-1deg)`,
          opacity:amount,
          boxShadow:"inset 0 -2px 0 rgba(91,55,45,0.38)",
        }}
      />
    </>
  );
};

export const DoiPuppet:React.FC = ()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const motion=getDoiMotion(frame,fps);

  return (
    <div
      style={{
        position:"relative",
        width:DOI_ASSET.width,
        height:DOI_ASSET.height,
        transformOrigin:"50% 88%",
        transform:`translate(${motion.rootX}px,${motion.rootY}px) rotate(${motion.rootRotate}deg) scale(${motion.rootScaleX},${motion.rootScaleY})`,
      }}
    >
      <div
        style={{
          position:"absolute",
          left:75,
          top:565,
          width:340,
          height:36,
          borderRadius:"50%",
          background:"rgba(67,36,27,0.22)",
          filter:"blur(10px)",
          transform:`scaleX(${1-motion.playEnergy*0.035})`,
        }}
      />

      <Img
        src={asset}
        style={{
          ...imageStyle,
          filter:"blur(13px) saturate(0.92)",
          opacity:0.72,
          transform:"scale(0.995)",
        }}
      />

      <div
        style={{
          position:"absolute",
          inset:0,
          clipPath:"polygon(0 53%,52% 53%,54% 100%,0 100%)",
          transformOrigin:"22% 70%",
          transform:`rotate(${motion.tailRotate}deg)`,
        }}
      >
        <Img src={asset} style={imageStyle}/>
      </div>

      <Img
        src={asset}
        style={{
          ...imageStyle,
          WebkitMaskImage:baseMask,
          maskImage:baseMask,
          WebkitMaskSize:"100% 100%",
          maskSize:"100% 100%",
          WebkitMaskRepeat:"no-repeat",
          maskRepeat:"no-repeat",
        }}
      />

      <div
        style={{
          position:"absolute",
          inset:0,
          clipPath:"polygon(10% 0,90% 0,96% 46%,84% 56%,65% 60%,32% 58%,13% 49%,7% 22%)",
          transformOrigin:"55% 45%",
          transform:`translate(${motion.headX}px,${motion.headY}px) rotate(${motion.headRotate}deg)`,
        }}
      >
        <Img src={asset} style={imageStyle}/>
        <Blink amount={motion.blink}/>
      </div>

      <div
        style={{
          position:"absolute",
          inset:0,
          clipPath:"polygon(46% 55%,73% 55%,78% 100%,45% 100%)",
          transformOrigin:"57% 61%",
          transform:`translate(${motion.pawX}px,${motion.pawY}px) rotate(${motion.pawRotate}deg)`,
        }}
      >
        <Img src={asset} style={imageStyle}/>
      </div>
    </div>
  );
};
