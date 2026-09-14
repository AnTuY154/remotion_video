---
name: scene-choreography
description: Direct multi-character Remotion scenes with blocking, gaze, reactions, props, action overlap and camera choreography.
version: 1.0.0
---

# Scene Choreography

Use this skill when arranging characters inside a scene or directing how characters, props, dialogue and camera interact over time.

Read `PROJECT_CONTEXT.md` first.

## Direct the dramatic beat

For each scene establish:

- dramatic purpose;
- visual focus;
- active speaker;
- character positions;
- gaze relationships;
- action/reaction timing;
- camera shot;
- entry and exit conditions.

## Blocking

Store blocking as scene data.

Prefer named or normalized stage positions such as left, center-left, center, center-right, right, foreground and background over scattered pixel constants.

Allow explicit coordinates when needed, but keep semantic stage positions available.

## Natural overlap

Natural acting overlaps.

Examples:

- a listener looks toward the speaker before the line ends;
- a character begins walking before the camera starts tracking;
- a gesture peaks on an emphasized word;
- a reaction starts a few frames after the triggering event.

Do not force every cue to start on exact dialogue boundaries.

## Gaze

Treat gaze as an explicit cue.

Targets may be another character, a prop, camera, an off-screen point or a stage anchor.

Avoid meaningless random head movement that competes with dialogue.

## Reactions

Dialogue scenes need listener behavior.

Use restrained reusable reactions such as glance, blink, nod, small recoil, smile, surprise and thinking pause.

Stillness with subtle secondary motion can be more believable than continuous animation.

## Props

Model prop states such as:

- world position;
- attached to a character hand;
- transferred between actors;
- placed on stage;
- hidden.

Avoid duplicating prop transforms in multiple components.

## Camera

Use semantic shot types:

- wide;
- medium;
- close-up;
- over-shoulder;
- tracking;
- detail/insert.

Prefer stable motivated camera movement over constant zooming.

Camera cues need clear start/end targets, intentional easing and enough hold time for the viewer to read the scene.

## Workflow

1. Block the scene with static poses.
2. Establish dialogue timing.
3. Place major actions.
4. Add reactions and gaze.
5. Add camera cues.
6. Add transitions.
7. Add secondary motion and effects.
8. Review at normal speed.

Do not polish effects before blocking and timing.

## Keep choreography declarative

Scene data should contain character ids, stage anchors/transforms, action cues, dialogue cues, gaze targets, prop cues, camera cues and transition cues.

Do not store React nodes or renderer-specific object instances in script data.

## Continuity

Across scenes track character presence, meaningful positions/directions, held props and emotional state.

A hard cut may intentionally reset state, but make that decision explicit.

## Related project skills

Use `character-animation-system` for actor/action implementation.

Use `character-dialogue-lipsync` for speech and face timing.

Use `script-to-scenes` when deriving direction from a written script.
