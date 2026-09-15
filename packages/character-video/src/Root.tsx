import React from "react";
import {Composition} from "remotion";
import {Doi3DProof} from "./scenes/Doi3DProof";
import {DoiYarnDemo} from "./scenes/DoiYarnDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Doi3DProof"
        component={Doi3DProof}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="DoiYarnDemo"
        component={DoiYarnDemo}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
