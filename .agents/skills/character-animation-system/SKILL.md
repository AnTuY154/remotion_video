---
name: character-animation-system
description: Build reusable frame-deterministic characters with semantic actions, renderer adapters and smooth action blending in Remotion.
version: 1.0.0
---

# Character Animation System

Use this skill whenever a task creates or changes a reusable character, character rig, action, pose system, locomotion, animation blending or renderer adapter.

Read the repository root `PROJECT_CONTEXT.md` before implementing.

## Core principle

Story code issues semantic actions. Renderer code translates those actions into pixels.

Prefer:

```ts
{characterId: "alice", action: "walk", fromFrame: 30, durationInFrames: 45}
```

over script-specific transform code.

## Separate these layers

1. **CharacterDefinition** - identity, assets, scale, renderer, voice and supported actions.
2. **ActionRegistry** - maps semantic actions to renderer-specific clips plus metadata.
3. **ActionTimeline** - frame ranges, targets, intensity, direction and blend windows.
4. **ActorRuntime** - resolves active actions for the current frame.
5. **RendererAdapter** - Rive, React/SVG, Three/GLTF or another deterministic renderer.

The script layer must not import renderer-specific APIs.

## Determinism

All visible state must derive from current frame, video config, props/timeline data and deterministic assets.

Do not depend on wall-clock time, requestAnimationFrame progress, unseeded randomness or a previously rendered frame.

If a third-party engine normally advances by delta time, adapt it so frame N is reproducible when rendered directly.

## Action vocabulary

Start with reusable semantic actions:

- idle
- walk
- run
- turn
- look
- talk
- point
- wave
- react

Every reusable action should document:

- looping behavior;
- minimum useful duration;
- preferred blend-in and blend-out duration;
- whether it combines with locomotion;
- whether it combines with dialogue/facial animation;
- supported direction/target parameters.

## Layering

Where supported, think in layers:

1. locomotion/base pose;
2. upper-body gesture;
3. head/gaze;
4. face/expression;
5. speech/viseme.

Aim for combinations such as `walk + talk + lookAt(target)`.

## Smooth transitions

Avoid hard switching unless intentionally directed.

Preserve position continuity, use blend windows, add anticipation and settling, and keep grounded contact points stable.

For React/SVG, use Remotion `spring()`, `interpolate()` and explicit easing.

For Rive, use authored reusable animations with Remotion-controlled time.

For Three/GLTF, use skeletal clips and deterministic sampling/blending. Do not rely on a continuously running mixer clock.

## Renderer guidance

Prefer Rive for the first reusable 2D rig when the art style supports it.

Use React/SVG cutout animation for simpler characters.

Use Lottie mainly for preauthored short animations and effects.

For 3D use `@remotion/three`, GLTF/GLB assets and a normalized semantic ActionRegistry.

## Test new actions

Before using a new action in a story scene, create a small preview/test composition showing:

- action in isolation;
- idle -> action;
- action -> idle;
- at least one action -> action transition;
- different durations when supported.

For locomotion, inspect foot sliding and root-motion continuity.

## Related project skills

Use `scene-choreography` for multi-character acting and camera direction.

Use `character-dialogue-lipsync` for speech and facial timing.

Use `script-to-scenes` to turn written direction into action cues.
