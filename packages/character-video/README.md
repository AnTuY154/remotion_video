# Đời Character Video

This package is the product-specific character-video sandbox inside the Remotion monorepo.

## Current production direction

The approved cinematic 3D look is now the primary direction.

Read before changing Đời:

- `style-canon/DOI_STYLE_CANON.md`
- `docs/ASSET_AUDIT_2026-09-15.md`
- `assets/MODEL_REQUIREMENTS.md`
- `agents/DOI_AGENT.md`

## Compositions

### `Doi3DProof`

Architecture proof for:

- `@remotion/three`
- deterministic 3D animation
- reusable semantic motion channels
- lighting / shadows / camera
- prop interaction

The current actor is intentionally a primitive proxy and is **not** the final likeness asset.

Render:

```bash
cd packages/character-video
bun run render:doi3d
```

### `DoiYarnDemo` — legacy

The earlier raster cutout prototype is kept only for comparison and reproducibility.

Do not use its WebP/CSS clip-path strategy as the base for new production shots.
