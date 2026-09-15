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

## Production render strategy

The approved direction is cinematic 3D.

Read `style-canon/DOI_STYLE_CANON.md` and `assets/MODEL_REQUIREMENTS.md`.

Preferred production renderer:

- GLB / GLTF skeletal actor
- `@remotion/three`
- deterministic frame sampling
- reusable semantic animation clips

The existing WebP/CSS cutout pipeline is legacy only. It may be used to reproduce old demos, but it must not be treated as the master asset or extended into new production actions.

`Doi3DProof` is an architecture test that validates Three.js/Remotion rendering with a primitive proxy. The proxy is not a likeness reference and must be replaced by an approved production GLB before release-quality story videos.

