# Agent File: Đời

This file is the canonical identity specification for the recurring main character **Đời**.

## Identity

- **id:** `doi`
- **display name:** Đời
- **role:** main mascot / protagonist
- **species:** cat
- **baseline personality:** curious, playful, gentle, slightly mischievous, affectionate

## Canonical appearance

The uploaded reference image is the visual source of truth.

Required traits:

- warm cream-beige plush fur
- rounded, soft silhouette
- large glossy amber-gold eyes
- small soft-pink nose
- round cheeks and short muzzle
- navy-blue bandana around the neck
- white paw-print motifs on the bandana
- friendly, intelligent, curious expression
- slight head tilt is a signature pose

## Continuity rules

Unless a scene explicitly overrides them:

1. Đời remains a cream-beige cat.
2. Đời keeps the navy paw-print bandana.
3. Eyes stay large, glossy and amber-gold.
4. Shape language remains rounded and soft.
5. The emotional baseline is warm curiosity.
6. Do not redesign Đời into a generic cat.

## Acting profile

Signature micro-actions:

- slow blink
- ear twitch
- head tilt
- gaze snap toward a moving object
- subtle breathing
- tail swish
- paw tap
- paw bat
- tiny playful pounce
- settle back into a cute pose

## Current semantic actions

- `idle`
- `blink`
- `headTilt`
- `lookAt`
- `tailSwish`
- `pawTap`
- `pawBat`
- `playWithYarn`
- `microPounce`
- `settle`

Future actions:

- `walk`
- `run`
- `jump`
- `turn`
- `talk`
- `wave`
- `reactHappy`
- `reactSurprised`

## First canonical demo

### Scene
Đời plays with a ball of yarn in a bright, cozy bedroom/studio with a large window looking toward sea and mountains.

### 10-second acting beats

- **0–2s:** calm idle, breathing, tail movement, blink
- **2–4s:** notices yarn, gaze drops, head tilts
- **4–7s:** bats yarn several times, yarn rolls elastically
- **7–9s:** anticipation + small playful pounce
- **9–10s:** settles beside yarn and finishes with a cute blink

## Render strategy for current prototype

This first demo uses a deterministic vector puppet inspired by the reference image. This intentionally avoids relying on binary image assets so the demo can render reliably in CI.

For production-quality future videos, migrate Đời to a segmented puppet or Rive rig while preserving this identity file.

## V2 canonical render asset

The canonical V2 image-based render asset is materialized to:

`public/assets/doi-v2.webp`

Its source is stored in deterministic base64 chunks under:

`assets-src/doi-v2.webp.b64.*`

Do not replace Đời with a generic vector cat. The image-based asset must remain the likeness source of truth until a higher-quality Rive/segmented rig is explicitly approved.

### V2 motion architecture

- `src/components/doi-motion.ts` is the shared deterministic motion model.
- `src/components/DoiPuppet.tsx` uses masked duplicates of the same canonical image for head, tail, paw, and body layers.
- Action overlap, anticipation, follow-through, breathing, weight shift, tail lag, and pounce settling are intentional.
- Yarn contact timing must stay synchronized with the paw via the shared motion model.

