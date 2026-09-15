import React from "react";
import {Composition} from "remotion";
import {DoiYarnDemo} from "./scenes/DoiYarnDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DoiYarnDemo"
      component={DoiYarnDemo}
      durationInFrames={300}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
