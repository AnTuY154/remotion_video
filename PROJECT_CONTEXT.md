# Project Context: Script-Driven Character Video System

This file is the persistent project brief for AI agents working in this repository.

## Repository identity

This repository is a fork/copy of the Remotion monorepo, not a small standalone video app.

Observed structure and tooling:

- Root package: `remotion-monorepo`
- Package manager: Bun
- Task runner: Turbo
- Main stack: TypeScript + React + Remotion
- Checked-in Remotion package version: `4.0.524`
- Main Remotion development testbed: `packages/example`
- Existing useful packages include Rive, Three, Lottie, animation utils, transitions, motion blur, captions, ElevenLabs helpers, Whisper integrations, SFX, effects and render tooling.
- Project-specific Agent Skills live in `.agents/skills`.

Do not treat the whole repository as the video product we are building. Prefer creating a dedicated package/application for our videos instead of mixing project-specific code into Remotion framework packages.

## Long-term goal

Build a reusable system that turns a written script into polished videos containing persistent characters.

Characters should eventually be able to:

- idle naturally;
- walk, run, enter, leave, turn, sit, point, look, react and gesture;
- speak with synchronized mouth/face motion;
- perform layered actions while speaking;
- transition smoothly between actions;
- interact with props and other characters;
- move inside reusable scenes;
- follow camera direction;
- execute a timeline generated from a human-written script.

A new video should mostly define script, cast, scenes, action cues, dialogue, timing and styling instead of reimplementing animation logic.

## Relevant capabilities already in the repo

### Frame-deterministic animation

Use Remotion primitives such as:

- `useCurrentFrame()`
- `useVideoConfig()`
- `Sequence`
- `interpolate()`
- `spring()`

Visible state must be reproducible for any independently rendered frame.

### 2D characters

`packages/rive` provides `@remotion/rive` and `RemotionRiveCanvas`.

Rive is the preferred first option for reusable 2D rigged characters when the visual style supports it. It gives us authored vector rigs and named animations while Remotion controls time from video frames.

React/SVG cutout animation remains useful for simple characters where direct programmatic control is more important than a full rig.

Lottie is best treated as a source for short preauthored animations, icons and effects rather than the default architecture for a complex stateful character.

### 3D characters

`packages/three` provides `@remotion/three` and React Three Fiber integration.

For future 3D characters prefer:

- GLTF/GLB assets;
- skeletal animation clips;
- normalized semantic action names;
- explicit frame-based seeking;
- deterministic action blending/cross-fading.

Do not rely on a wall-clock animation loop during rendering.

### Dialogue and captions

Relevant packages include:

- `packages/elevenlabs`
- `packages/openai-whisper`
- `packages/whisper-web`
- `packages/whisper-webgpu`
- `packages/captions`

They are useful foundations for voice timing, transcription and captions. Lip sync should ultimately use word/phoneme/viseme timing when available.

## Target architecture

The story layer must be renderer-neutral.

```
Human script
  -> Script parser / director
  -> SceneSpec[]
  -> Character actions + dialogue + camera cues
  -> Renderer adapters (Rive / SVG / Three)
  -> Remotion composition
  -> Render
```

A future data model should contain concepts like:

```ts
type CharacterActionCue = {
  characterId: string;
  action: string;
  fromFrame: number;
  durationInFrames: number;
  intensity?: number;
  direction?: "left" | "right" | "front" | "back";
  targetId?: string;
};

type DialogueCue = {
  characterId: string;
  fromFrame: number;
  durationInFrames: number;
  text: string;
  audioSrc?: string;
};

type CameraCue = {
  fromFrame: number;
  durationInFrames: number;
  shot: "wide" | "medium" | "close-up" | "tracking" | "over-shoulder";
  targetId?: string;
};

type SceneSpec = {
  id: string;
  durationInFrames: number;
  characters: string[];
  actions: CharacterActionCue[];
  dialogue: DialogueCue[];
  camera: CameraCue[];
};
```

Exact names may evolve, but preserve the separation between script data, actor logic and renderer-specific implementation.

## Character system

Each character should have:

1. **Character definition**
   - stable id;
   - display name;
   - renderer type;
   - assets;
   - scale/anchor;
   - supported actions;
   - voice profile;
   - default expression.

2. **Action registry**
   - maps semantic actions to renderer-specific clips/animations;
   - defines looping behavior;
   - defines blend-in/out durations;
   - defines whether an action can layer with dialogue or locomotion.

3. **Actor runtime**
   - resolves active actions for the current frame;
   - computes local action progress;
   - layers locomotion, gesture, gaze, face and speech where supported.

4. **Renderer adapter**
   - Rive for 2D rigged characters;
   - React/SVG for simpler cutout characters;
   - Three/GLTF for 3D.

A script should not need to know which renderer implements a character.

## Initial semantic action vocabulary

Start small:

- `idle`
- `walk`
- `run`
- `turn`
- `look`
- `talk`
- `point`
- `wave`
- `react`

Only add an action name when it is reusable across scripts.

## Motion quality rules

- Avoid abrupt pose changes unless a hard cut is intentional.
- Define blend-in and blend-out windows.
- Use anticipation for large movement.
- Use follow-through and settling.
- Add subtle secondary motion to long holds.
- Keep grounded contact points stable.
- Do not animate every property with the same easing curve.
- Separate locomotion from upper-body gestures when possible.
- Keep all timing frame-based and deterministic.
- Motion blur may polish fast movement but must not hide poor animation timing.

## Dialogue and lip sync

Preferred future pipeline:

```
dialogue text
  -> voice audio
  -> timing metadata
  -> word / phoneme / viseme cues
  -> mouth shapes + facial expression
  -> captions
```

Rules:

- Keep dialogue timing as data.
- Keep mouth/face motion separate from body actions.
- Support combinations such as `walk + talk`, `idle + talk` and `gesture + talk`.
- Use a small reusable viseme set.
- Add deterministic blink, gaze and expression behavior so speech does not feel mechanical.
- Derive captions from the same timing source when practical.

## Scene choreography

A scene should explicitly control:

- entrances and exits;
- stage blocking;
- gaze targets;
- visual focus;
- props;
- dialogue turn-taking;
- action overlap;
- reactions;
- camera shots/movement;
- transition to the next scene.

Prefer semantic direction:

```ts
{character: "alice", action: "look", target: "bob"}
{character: "bob", action: "react", intensity: 0.6}
```

over script-specific raw transforms.

## Recommended phases

### Phase 1 - Video kernel

Create a dedicated video package with:

- composition root;
- typed scene schema;
- scene timeline;
- camera layer;
- background/foreground layers;
- debug overlay for frame, scene, active actions and dialogue.

### Phase 2 - First reusable character

Implement one character with:

- idle;
- walk;
- talk;
- look;
- wave or point;
- react;
- smooth transitions.

Start with Rive for a 2D prototype unless art direction requires otherwise.

### Phase 3 - Dialogue system

Add voice assets, timing metadata, captions, visemes, blinking, gaze and expressions.

### Phase 4 - Choreography

Add multiple actors, blocking, prop interactions, camera cues and reaction timing.

### Phase 5 - Script compiler

Compile a human script into validated `SceneSpec[]`.

AI may help compile the script, but rendering must consume persisted deterministic data rather than making live AI calls.

### Phase 6 - Quality and scale

Add motion polish, reusable shot presets, asset validation, render tests, profiling, batch rendering and an optional 3D actor adapter.

## Working rules

- Preserve upstream Remotion code unless a framework change is genuinely required.
- Put product-specific video code in a dedicated package.
- Reuse existing Remotion packages before adding low-level dependencies.
- Keep all video behavior deterministic from frame + props + assets.
- Prefer typed declarative scene/action data over one-off imperative animation code.
- Treat reusable character actions as durable product assets.
- Create small action preview compositions before using new actions in story scenes.
- Do not couple script parsing directly to Rive, Three, SVG or another renderer.
- Do not add an animation library unless it can be deterministically sought by frame.

## Project-specific Agent Skills

- `character-animation-system`: reusable rigs, semantic actions, deterministic playback and action blending.
- `scene-choreography`: blocking, gaze, reactions, props, action overlap and camera direction.
- `script-to-scenes`: compile a human script into validated scene/action/dialogue/camera data.
- `character-dialogue-lipsync`: voice timing, captions, visemes and speech/body synchronization.

## Definition of success

1. The user writes a script.
2. The system identifies scenes, cast, dialogue, actions, camera cues and timing.
3. Semantic actions map onto reusable character capabilities.
4. The same characters can be reused across many videos.
5. Actions blend naturally instead of snapping.
6. Dialogue, lips, gaze, expression and body actions remain synchronized.
7. The final Remotion composition previews and renders deterministically.
