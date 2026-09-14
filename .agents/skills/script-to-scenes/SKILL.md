---
name: script-to-scenes
description: Convert a human video script into validated deterministic scene, cast, action, dialogue and camera data for Remotion.
version: 1.0.0
---

# Script to Scenes

Use this skill when the user provides a story, screenplay, narration, storyboard or natural-language video request that must become structured Remotion scene data.

Read `PROJECT_CONTEXT.md` first.

## Goal

Convert ambiguous creative text into explicit typed deterministic render data.

The renderer consumes validated data and must not call an AI model while rendering frames.

## Pipeline

```
Human script
  -> normalize sections and dialogue
  -> identify cast and locations
  -> split into dramatic beats/scenes
  -> estimate timing
  -> assign semantic actions
  -> assign gaze/targets
  -> assign camera cues
  -> assign transitions
  -> validate character capabilities
  -> SceneSpec[]
```

## Preserve intent

Do not silently rewrite the plot.

You may add directing details required to make a scene renderable.

If an action is unsupported, prefer to map it to a supported reusable action, add a genuinely reusable action, or mark the scene as requiring a new capability.

Do not hide unsupported behavior inside one-off transform hacks.

## Scene splitting

Create a new scene for meaningful changes in location, time, cast, dramatic beat, camera language or visual objective.

Do not create a new scene for every sentence.

## Timing

Derive timing from dialogue/audio duration, action constraints, text reading time, reaction beats, camera holds and transitions.

Convert render timing to frames after fps is known.

If speech audio is not ready, keep provisional durations that can be recomputed.

## Capability validation

Compare requested actions with each character's ActionRegistry.

Prefer semantic cues such as:

- walk toward target;
- look at target;
- point at target;
- react with intensity;
- speak line;
- enter from side;
- exit to side.

Avoid low-level joint rotations or CSS transforms in compiled script output.

## Dialogue

Each line should identify speaker, text, timing and optionally audio, emotional tone, emphasis and addressee.

The same dialogue timing should feed captions and lip sync where practical.

## Camera

Generate semantic camera cues such as establish wide, medium on speaker, close-up reaction, track walking character and over-shoulder exchange.

Keep camera direction sparse and motivated.

## Validate output

Validate:

- unique scene ids;
- known character ids;
- non-negative frame ranges;
- cues inside scene duration;
- known semantic actions;
- required assets;
- dialogue speaker presence;
- target ids.

## Determinism

AI may help compile scripts before rendering.

Persist the compiled scene data. Never make frame output depend on a live AI response.

## Stable iteration

When the user changes one line, minimize unrelated timeline changes.

Keep stable scene and character ids where possible.

## Related project skills

Use `scene-choreography` for directing.

Use `character-animation-system` when a script requires a new reusable action.

Use `character-dialogue-lipsync` for voice and mouth timing.
