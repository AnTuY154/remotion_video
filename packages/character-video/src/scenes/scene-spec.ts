import type {DoiActionName} from "../characters/DoiCharacter";

export type CharacterActionCue = {
  characterId: "doi";
  action: DoiActionName;
  fromFrame: number;
  durationInFrames: number;
  intensity?: number;
  targetId?: string;
};

export const DOI_YARN_SCENE = {
  id: "doi-yarn-demo",
  durationInFrames: 300,
  actions: [
    {characterId: "doi", action: "idle", fromFrame: 0, durationInFrames: 300},
    {characterId: "doi", action: "lookAt", fromFrame: 60, durationInFrames: 60, targetId: "yarn"},
    {characterId: "doi", action: "playWithYarn", fromFrame: 120, durationInFrames: 90, targetId: "yarn"},
    {characterId: "doi", action: "microPounce", fromFrame: 210, durationInFrames: 60, targetId: "yarn"},
    {characterId: "doi", action: "settle", fromFrame: 270, durationInFrames: 30},
  ] satisfies CharacterActionCue[],
} as const;
