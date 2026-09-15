# Đời Asset Audit — 2026-09-15

## Finding

The Remotion repository is technically capable of the target production system, but the current Đời character source is not.

## Runtime asset currently used

`public/assets/doi-v2.webp`

Observed characteristics:

- one raster image
- approximately 466x620 logical dimensions in the renderer
- ~46 KB checked-in WebP
- sitting pose
- no skeleton
- no authored deformers
- no true eye / face controls
- no independent tail rig
- no 3D depth

## Current implementation

`DoiPuppet.tsx` uses:

- the same raster image multiple times
- CSS clip-path to isolate one paw
- whole-character transforms
- painted div overlays for blink

`doi-motion.ts` calculates more channels than the renderer can faithfully express.

This mismatch is why increasing motion amplitude creates visible deformation, while reducing motion amplitude makes the character feel rigid.

## Orphan / experimental sources

`assets-src/v3`, `v4`, and `v5` contain incomplete base64 experiments and are not consumed by the current materializer.

They are not production masters.

## Rig search

Repository-wide audit found no production Đời asset in:

- .riv
- .glb
- .gltf
- .fbx
- .blend
- .psd / layered source

Therefore there is currently no reusable production rig for the approved 3D look.

## Engine capability

The monorepo already contains:

- `@remotion/three`
- React Three Fiber
- Three.js
- `@remotion/rive`
- deterministic frame rendering
- GitHub Actions render infrastructure

The engine does not need to be replaced.

## Decision

Freeze the raster cutout pipeline as legacy.

Do not spend more production time tuning CSS masks/easing to solve an asset-level limitation.

Next production milestone is a proper 3D character asset with skeleton and reusable clips.
