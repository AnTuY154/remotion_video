import React from "react";
import type {Doi3DMotion} from "./doi3d-motion";

const fur="#d9ad95";
const furLight="#efd3c3";
const furShadow="#bd8c78";
const navy="#183269";
const amber="#d98a13";
const pink="#d99087";

const Ellipsoid:React.FC<{
  position:[number,number,number];
  scale:[number,number,number];
  color:string;
  castShadow?:boolean;
  receiveShadow?:boolean;
}> = ({position,scale,color,castShadow=true,receiveShadow=false})=>(
  <mesh
    position={position}
    scale={scale}
    castShadow={castShadow}
    receiveShadow={receiveShadow}
  >
    <sphereGeometry args={[1,48,32]}/>
    <meshStandardMaterial color={color} roughness={0.78}/>
  </mesh>
);

const Eye:React.FC<{x:number;blink:number}>=({x,blink})=>{
  const visibleScale=Math.max(0.08,1-blink*0.92);
  return (
    <group position={[x,2.28,1.18]} scale={[1,visibleScale,1]}>
      <mesh scale={[0.17,0.22,0.085]}>
        <sphereGeometry args={[1,32,24]}/>
        <meshStandardMaterial color={amber} roughness={0.28} metalness={0.05}/>
      </mesh>
      <mesh position={[0,0,0.075]} scale={[0.065,0.15,0.035]}>
        <sphereGeometry args={[1,24,16]}/>
        <meshStandardMaterial color="#191511" roughness={0.45}/>
      </mesh>
      <mesh position={[-0.045,0.07,0.105]} scale={[0.032,0.042,0.02]}>
        <sphereGeometry args={[1,18,12]}/>
        <meshStandardMaterial color="#fff9eb" roughness={0.2}/>
      </mesh>
    </group>
  );
};

const Ear:React.FC<{x:number;side:-1|1}>=({x,side})=>(
  <group position={[x,2.82,0.57]} rotation={[0,0,side*0.17]}>
    <mesh scale={[0.36,0.58,0.28]} castShadow>
      <coneGeometry args={[0.55,1,3,1]}/>
      <meshStandardMaterial color={fur} roughness={0.8}/>
    </mesh>
    <mesh position={[0,0.01,0.08]} scale={[0.22,0.38,0.12]}>
      <coneGeometry args={[0.5,1,3,1]}/>
      <meshStandardMaterial color="#cf9089" roughness={0.86}/>
    </mesh>
  </group>
);

const Tail:React.FC<{a1:number;a2:number;a3:number}>=({a1,a2,a3})=>(
  <group position={[-0.92,1.25,-0.86]} rotation={[0.1,0,-0.9+a1]}>
    <Ellipsoid position={[0,0.34,0]} scale={[0.18,0.5,0.18]} color={fur}/>
    <group position={[0,0.75,0]} rotation={[0,0,-0.12+a2]}>
      <Ellipsoid position={[0,0.31,0]} scale={[0.175,0.45,0.175]} color={furLight}/>
      <group position={[0,0.66,0]} rotation={[0,0,-0.1+a3]}>
        <Ellipsoid position={[0,0.27,0]} scale={[0.165,0.38,0.165]} color={furLight}/>
      </group>
    </group>
  </group>
);

export const Doi3DProxy:React.FC<{motion:Doi3DMotion}>=({motion})=>{
  return (
    <group>
      <group
        position={[0,motion.bodyY,0]}
        rotation={[0,0,motion.bodyRoll]}
        scale={[1,motion.bodyScaleY,1]}
      >
        <Ellipsoid position={[0,0,0]} scale={[1.12,0.78,1.38]} color={fur}/>

        <Ellipsoid position={[-0.58,-0.78,-0.52]} scale={[0.38,0.62,0.42]} color={furShadow}/>
        <Ellipsoid position={[0.58,-0.78,-0.52]} scale={[0.38,0.62,0.42]} color={furShadow}/>
        <Ellipsoid position={[-0.62,-0.76,0.65]} scale={[0.32,0.7,0.34]} color={fur}/>

        <group
          position={[0.62,-0.45,0.67+motion.pawReach]}
          rotation={[motion.pawPitch,0,motion.pawRoll]}
        >
          <Ellipsoid
            position={[0,motion.pawLift*-0.2,0]}
            scale={[0.33,0.76,0.35]}
            color={furLight}
          />
          <Ellipsoid
            position={[0,-0.64+motion.pawLift,0.02]}
            scale={[0.38,0.25,0.45]}
            color={furLight}
          />
        </group>

        <Tail a1={motion.tail1} a2={motion.tail2} a3={motion.tail3}/>

        <group
          position={[0,0.92,0.52]}
          rotation={[motion.headPitch,motion.headYaw,motion.headRoll]}
        >
          <Ellipsoid position={[0,0,0]} scale={[0.86,0.82,0.78]} color={furLight}/>
          <Ear x={-0.52} side={-1}/>
          <Ear x={0.52} side={1}/>

          <Eye x={-0.3} blink={motion.blink}/>
          <Eye x={0.3} blink={motion.blink}/>

          <Ellipsoid position={[-0.18,-0.22,0.68]} scale={[0.24,0.18,0.18]} color="#efd0c0"/>
          <Ellipsoid position={[0.18,-0.22,0.68]} scale={[0.24,0.18,0.18]} color="#efd0c0"/>
          <Ellipsoid position={[0,-0.1,0.79]} scale={[0.11,0.075,0.075]} color={pink}/>

          <mesh position={[0,-0.72,0.62]} scale={[1.02,0.7,0.16]}>
            <circleGeometry args={[0.62,3]}/>
            <meshStandardMaterial color={navy} roughness={0.72}/>
          </mesh>
          <mesh position={[0,-0.55,0.35]} rotation={[Math.PI/2,0,0]}>
            <torusGeometry args={[0.62,0.07,12,48]}/>
            <meshStandardMaterial color={navy} roughness={0.72}/>
          </mesh>
        </group>
      </group>
    </group>
  );
};
