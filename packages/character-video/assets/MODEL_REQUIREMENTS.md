# Đời 3D Model Requirements

The production 3D source should be delivered as GLB or GLTF.

## Required geometry

- separate or skinned body with clean kitten proportions
- head with enough topology for facial expression
- four paws with stable ground contact
- fully modeled tail
- bandana as cloth mesh or separate accessory
- eyes with separate material / geometry
- mouth / muzzle suitable for future speech work

## Required skeleton

Minimum semantic bones:

- root
- pelvis / body
- spine
- neck
- head
- ear.L / ear.R
- frontUpper.L / frontLower.L / frontPaw.L
- frontUpper.R / frontLower.R / frontPaw.R
- rearUpper.L / rearLower.L / rearPaw.L
- rearUpper.R / rearLower.R / rearPaw.R
- tail.01 ... tail.N

Preferred:

- jaw
- eyelid controls or blendshapes
- cheek / brow facial controls

## Required reusable clips

First milestone:

- idle
- look
- headTilt
- blink
- tailSwish
- pawBat
- microPounce
- settle

Next milestone:

- walk
- run
- sit
- turn
- jump
- reactHappy
- reactSurprised

## Material target

- cream-beige fur
- soft roughness response
- amber-gold glossy eyes
- pink nose
- navy cloth bandana with white paw prints

## Technical rules

- model scale and origin documented
- animation clips named semantically
- no wall-clock dependent simulation required for the core pose
- actions must be sampleable deterministically at an arbitrary frame
- grounded paws must not slide during holds
