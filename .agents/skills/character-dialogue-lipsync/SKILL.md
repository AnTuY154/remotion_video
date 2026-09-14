---
name: character-dialogue-lipsync
description: Synchronize character dialogue, voice audio, captions, visemes, gaze, blinking, expression and body actions in Remotion.
version: 1.0.0
---

# Character Dialogue and Lip Sync

Use this skill for speaking characters, voice timing, mouth animation, facial animation, captions or dialogue/body synchronization.

Read `PROJECT_CONTEXT.md` first.

## One timing source

Dialogue should have one canonical timing representation that can feed:

- audio playback;
- captions;
- word highlighting;
- viseme/mouth cues;
- gesture emphasis;
- reaction timing.

Avoid independently hand-timing each layer.

## Preferred flow

```
text
  -> voice audio
  -> timing metadata
  -> words / phonemes / visemes
  -> mouth animation
  -> captions
```

Use precise timing from the voice provider when available.

If only audio exists, use transcription/alignment tooling and persist timing data before rendering.

Relevant repo foundations include ElevenLabs helpers, OpenAI Whisper, Whisper Web/WebGPU and captions.

## Dialogue data

At minimum keep:

- character id;
- text;
- from frame;
- duration;
- audio source when available.

When possible also keep word timestamps, phoneme/viseme timestamps, emotion, emphasis and addressee.

## Visemes

Use a compact reusable viseme vocabulary.

Map phonemes/provider timings into that vocabulary rather than creating sentence-specific mouth animations.

Requirements:

- return to closed/rest mouth during pauses;
- smooth transitions between shapes;
- avoid single-frame popping;
- soften extremes at high speaking speed;
- keep mouth animation independent from body actions.

## Face behavior

Speech should not be mouth-only.

Add controlled blinking, eye direction, brow motion, head motion and expression.

Do not use nondeterministic runtime randomness. Use authored cues or deterministic seeded behavior.

## Gesture sync

Gestures should align with semantic emphasis, not every syllable.

Useful timing pattern:

- anticipation begins before emphasis;
- gesture peak lands near emphasis;
- gesture settles after the phrase;
- listener reaction follows the meaningful beat.

A character must be able to speak while idling, walking or gesturing.

## Captions

Derive captions from the same dialogue/word timing source when practical.

Use the existing Remotion captions guidance for display implementation.

Do not use caption timing as the only lip-sync source when more precise phoneme/viseme data exists.

## Audio rules

- Treat final audio duration as authoritative.
- Recompute affected scene duration when dialogue audio changes materially.
- Keep voice asset identity stable so timing metadata cannot silently mismatch audio.
- Keep playback/render behavior deterministic.

## Fallback

When phoneme/viseme timing is unavailable:

1. use word timing;
2. otherwise use voice activity/audio amplitude as a coarse fallback;
3. keep the result subtle rather than pretending coarse amplitude is precise lip sync.

## Review checklist

Check that:

- mouth closes during pauses;
- there is no obvious audio drift;
- blinking is not mechanically periodic;
- gaze matches the intended focus;
- gestures do not fight locomotion;
- expression matches the line;
- captions agree with dialogue timing.

## Related project skills

Use `character-animation-system` for the actor/action layer.

Use `scene-choreography` for speaker/listener blocking.

Use `script-to-scenes` to produce structured dialogue cues.
