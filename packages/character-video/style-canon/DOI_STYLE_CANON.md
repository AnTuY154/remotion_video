# Đời Style Canon

This file locks the approved visual direction for future production assets.

## Target visual language

Đời should read as a cute cinematic 3D kitten, not a flat vector mascot and not a warped photo cutout.

Required visual traits:

- warm cream-beige plush fur with visible soft strand response in highlights
- round head, short muzzle, soft cheeks
- large glossy amber-gold eyes
- small pink nose
- navy bandana with white paw-print motifs
- compact kitten proportions
- soft rounded paws
- playful, gentle, curious expression

## Lighting and render look

- warm late-morning / golden indoor sunlight
- strong but soft window key light
- subtle cool ambient fill from sea/sky
- soft contact shadows
- moderate depth and dimensionality
- polished cinematic color, not flat SVG colors
- materials must preserve fur, cloth, yarn fiber and wood readability

## Environment direction

Approved room direction:

- cozy bedroom / creative studio
- large windows
- sea + mountains + sailboats visible outside
- warm wood floor
- bed / blanket on the left
- desk, lamp, plants and art objects
- pink yarn as the hero prop

## Motion direction

Movement must stay soft and animal-like:

- breathing
- small weight shifts
- intentional head look / head tilt
- blink
- tail follow-through
- paw anticipation before contact
- prop reaction after contact
- settle after action

Avoid constant motion. Stillness with subtle secondary motion is preferred over noisy animation.

## Forbidden shortcuts

Do not ship production shots using:

- generic vector redraws of Đời
- whole-character affine warping to fake new poses
- CSS clip-path as the main production rig
- low-resolution compressed WebP as the master character source
- fake eyelids painted over the eyes for close-ups
- large pose changes from a single raster source
- motion blur used to hide broken posing

## Production renderer decision

For this visual target, the preferred long-term renderer is:

1. GLB/GLTF skeletal 3D character through `@remotion/three`
2. Rive only if a future 2D reinterpretation is explicitly approved
3. raster cutout only for limited inserts where pose range is very small

The approved image is visual reference, not a sufficient animation rig by itself.
