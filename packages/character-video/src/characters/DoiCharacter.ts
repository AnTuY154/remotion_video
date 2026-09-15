export type DoiActionName =
  | "idle"
  | "blink"
  | "headTilt"
  | "lookAt"
  | "tailSwish"
  | "pawTap"
  | "pawBat"
  | "playWithYarn"
  | "microPounce"
  | "settle";

export const DOI_CHARACTER = {
  id: "doi",
  displayName: "Đời",
  species: "cat",
  appearance: {
    fur: "#d9b39f",
    furLight: "#efd4c3",
    furShadow: "#b98272",
    eyes: "#f3a51a",
    nose: "#d88987",
    bandana: "#182b63",
    bandanaAccent: "#fff8ee",
  },
  personality: ["curious", "playful", "gentle", "slightly mischievous", "affectionate"],
  supportedActions: [
    "idle",
    "blink",
    "headTilt",
    "lookAt",
    "tailSwish",
    "pawTap",
    "pawBat",
    "playWithYarn",
    "microPounce",
    "settle",
  ] as DoiActionName[],
} as const;
