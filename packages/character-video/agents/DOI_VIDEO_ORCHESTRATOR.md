# Đời Video Orchestrator

Run the video loop as:

PLAN -> BUILD -> REVIEW -> REVISE -> REVIEW -> ... -> RELEASE

## PLAN
Lock:
- story beat
- visual direction
- duration / fps / size
- approved character reference
- acceptance thresholds

## BUILD
Use AGENT_DOI_VIDEO_CREATOR.md.

## REVIEW
Use AGENT_DOI_VIDEO_REVIEWER.md on the rendered MP4 and representative frames.

## REVISE
Fix in priority order:
1. technical breakage
2. likeness
3. rigid motion
4. prop interaction
5. polish

## RELEASE
Only release when reviewer verdict is PASS.
Then:
- render final MP4
- upload workflow artifact
- commit final MP4 to repo
- expose a downloadable file
