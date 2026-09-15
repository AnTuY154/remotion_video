# DoiPreviewV1

Approved direction: cozy, cinematic, cute 3D/semi-realistic Đời playing with pink yarn in a sunlit bedroom/studio overlooking sea and mountains.

## Output
- composition: DoiPreviewV1
- 10 seconds
- 30 fps
- 1280x720
- H.264 MP4

## Timeline
- 0-2s: idle, breathing, blink, attention on yarn
- 2-4s: lean toward yarn, paw prepares
- 4-7s: two playful paw bats; yarn rolls and bounces
- 7-9s: small forward playful pounce/lean, yarn travels farther
- 9-10s: settle and final blink

## Visual priorities
1. likeness over exaggerated rigging
2. clean canonical image-based character
3. warm sunlight and photographic room background
4. smooth deterministic motion
5. readable paw/yarn contact

## Technical approach
Use a clean PNG-based split puppet:
- body plate with the active paw removed
- isolated active paw layer
- the rest of the character stays intact to avoid seams and likeness drift

Do not use the old corrupted WebP/mask pipeline.
