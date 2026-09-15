# Đời Character Video

This package contains the first reusable video prototype for **Đời**, the main mascot character.

## Demo

Composition: `DoiYarnDemo`

- duration: 10 seconds
- fps: 30
- resolution: 1280×720
- scene: Đời plays with a ball of yarn in a bright seaside bedroom/studio

## Preview

```bash
cd packages/character-video
bunx remotion studio src/index.ts
```

## Render

```bash
cd packages/character-video
mkdir -p renders
bunx remotion render src/index.ts DoiYarnDemo renders/doi-yarn-demo.mp4 --codec=h264 --overwrite
```

A GitHub Actions workflow renders the MP4 and commits it to:

`packages/character-video/renders/doi-yarn-demo.mp4`

Read `agents/DOI_AGENT.md` before changing Đời's identity.
