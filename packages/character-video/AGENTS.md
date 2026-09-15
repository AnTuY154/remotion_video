# Character Video Package

Read the repository root `PROJECT_CONTEXT.md` before making architectural changes.

For any change involving Đời, read these files first:

- `agents/DOI_AGENT.md`
- `style-canon/DOI_STYLE_CANON.md`
- `docs/ASSET_AUDIT_2026-09-15.md`
- `assets/MODEL_REQUIREMENTS.md`

Use the project-specific skills in the repository root:

- `.agents/skills/character-animation-system/SKILL.md`
- `.agents/skills/scene-choreography/SKILL.md`
- `.agents/skills/script-to-scenes/SKILL.md`
- `.agents/skills/character-dialogue-lipsync/SKILL.md`

Keep animation deterministic from Remotion frame + props.

For the approved cinematic 3D style, prefer `@remotion/three` and a skeletal GLB/GLTF actor. The old raster cutout is legacy and must not be expanded into new production actions.
