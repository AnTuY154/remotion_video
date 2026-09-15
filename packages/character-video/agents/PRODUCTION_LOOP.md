# Đời Video Production Loop

This document defines the two-agent production protocol.

## Roles

- Creator: `.agents/agents/doi-video-creator.md`
- Reviewer: `.agents/agents/doi-video-reviewer.md`

## Loop

```
Creator edits
  -> render candidate
  -> extract QA checkpoints
  -> Reviewer evaluates
  -> FAIL => Creator fixes blockers
  -> repeat
  -> PASS => publish MP4 + commit final review report
```

The final MP4 must not be called approved unless the Reviewer report is `PASS`.

For the yarn demo, the published file is:

`packages/character-video/renders/doi-yarn-demo.mp4`

The latest review report is:

`packages/character-video/reviews/doi-yarn-demo-review.md`
