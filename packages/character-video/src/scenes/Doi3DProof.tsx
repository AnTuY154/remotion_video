import React from "react";
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from "remotion";
import {ThreeCanvas} from "@remotion/three";
import {PCFSoftShadowMap,SRGBColorSpace} from "three";
import {Doi3DProxy} from "../three/Doi3DProxy";
import {getDoi3DMotion} from "../three/doi3d-motion";

const Room:React.FC=()=>(
  <group>
    <mesh position={[0,-0.03,0]} rotation={[-Math.PI/2,0,0]} receiveShadow>
      <planeGeometry args={[14,12]}/>
      <meshStandardMaterial color="#9a613b" roughness={0.62}/>
    </mesh>

    <mesh position={[0,3.4,-4.1]} receiveShadow>
      <planeGeometry args={[14,7]}/>
      <meshStandardMaterial color="#dcbda6" roughness={0.9}/>
    </mesh>

    <mesh position={[0,3.45,-4.04]}>
      <planeGeometry args={[7.6,4.6]}/>
      <meshStandardMaterial color="#78c9ef" roughness={0.42}/>
    </mesh>
    <mesh position={[0,2.1,-4]}>
      <planeGeometry args={[7.6,1.55]}/>
      <meshStandardMaterial color="#3e9dcc" roughness={0.38}/>
    </mesh>

    {[-3.8,-1.9,0,1.9,3.8].map((x)=>(
      <mesh key={x} position={[x,3.45,-3.94]} castShadow>
        <boxGeometry args={[0.12,4.9,0.16]}/>
        <meshStandardMaterial color="#70452f" roughness={0.78}/>
      </mesh>
    ))}
    <mesh position={[0,1.65,-3.94]} castShadow>
      <boxGeometry args={[7.8,0.12,0.16]}/>
      <meshStandardMaterial color="#70452f" roughness={0.78}/>
    </mesh>

    <mesh position={[-4.5,0.62,-0.3]} castShadow receiveShadow>
      <boxGeometry args={[2.6,0.8,4.4]}/>
      <meshStandardMaterial color="#e8ded2" roughness={0.88}/>
    </mesh>
    <mesh position={[-4.45,1.12,-0.25]} castShadow>
      <boxGeometry args={[2.7,0.3,4.5]}/>
      <meshStandardMaterial color="#6e7fa7" roughness={0.9}/>
    </mesh>

    <mesh position={[4.15,1.3,-1.5]} castShadow receiveShadow>
      <boxGeometry args={[2.1,0.22,1.1]}/>
      <meshStandardMaterial color="#88583b" roughness={0.75}/>
    </mesh>
    <mesh position={[3.45,0.55,-1.5]} castShadow>
      <boxGeometry args={[0.18,1.5,0.18]}/>
      <meshStandardMaterial color="#6c4532" roughness={0.8}/>
    </mesh>
    <mesh position={[4.85,0.55,-1.5]} castShadow>
      <boxGeometry args={[0.18,1.5,0.18]}/>
      <meshStandardMaterial color="#6c4532" roughness={0.8}/>
    </mesh>

    <mesh position={[4.5,1.02,0.6]} castShadow>
      <cylinderGeometry args={[0.42,0.34,0.75,32]}/>
      <meshStandardMaterial color="#c27b56" roughness={0.82}/>
    </mesh>
    <mesh position={[4.5,1.7,0.6]} rotation={[0,0,0.18]}>
      <coneGeometry args={[0.42,1.25,8]}/>
      <meshStandardMaterial color="#6ca35d" roughness={0.86}/>
    </mesh>
  </group>
);

const Yarn:React.FC<{x:number;y:number;rotation:number}>=({x,y,rotation})=>(
  <group position={[x,y,1.15]} rotation={[0,0,rotation]}>
    <mesh castShadow>
      <sphereGeometry args={[0.34,40,28]}/>
      <meshStandardMaterial color="#e76376" roughness={0.86}/>
    </mesh>
    <mesh rotation={[Math.PI/2,0,0]}>
      <torusGeometry args={[0.26,0.025,10,40]}/>
      <meshStandardMaterial color="#ffd2d8" roughness={0.78}/>
    </mesh>
  </group>
);

export const Doi3DProof:React.FC=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const motion=getDoi3DMotion(frame,fps);

  return (
    <AbsoluteFill style={{background:"#dcebf5"}}>
      <ThreeCanvas
        width={1280}
        height={720}
        shadows
        dpr={1}
        camera={{position:[0,2.75,8.4],fov:34}}
        gl={{antialias:true,preserveDrawingBuffer:true}}
        onCreated={({gl})=>{
          gl.shadowMap.enabled=true;
          gl.shadowMap.type=PCFSoftShadowMap;
          gl.outputColorSpace=SRGBColorSpace;
        }}
      >
        <color attach="background" args={["#dcebf5"]}/>
        <fog attach="fog" args={["#dcebf5",10,19]}/>

        <ambientLight intensity={1.0} color="#dbe9ff"/>
        <directionalLight
          castShadow
          position={[-4.5,7.2,4.5]}
          intensity={3.4}
          color="#ffd09d"
        />
        <pointLight position={[3.5,4,4]} intensity={1.5} color="#fff2d0"/>

        <Room/>
        <group position={[0,0,0.25]}>
          <Doi3DProxy motion={motion}/>
        </group>
        <Yarn x={motion.yarnX} y={motion.yarnY} rotation={motion.yarnRotation}/>
      </ThreeCanvas>

      <div
        style={{
          position:"absolute",
          left:38,
          top:34,
          padding:"10px 14px",
          borderRadius:10,
          background:"rgba(20,25,36,0.64)",
          color:"white",
          fontFamily:"Arial, sans-serif",
          fontSize:18,
          letterSpacing:0.2,
        }}
      >
        Đời 3D architecture proof · proxy asset
      </div>
    </AbsoluteFill>
  );
};
