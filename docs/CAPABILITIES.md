# Supported scope and comparison

This is a LuxLeaf product, not a renamed fork or drop-in upstream replacement. Similarity in purpose does not imply API, visual, performance or ecosystem parity.

| Capability | Implementation and evidence |
|---|---|
| Animated three-color gradients | Original GLSL; actual shader compilation and nonuniform output checked. |
| Plane/orb/ribbon styles | Procedural modes with validated controls; demo supports live selection. |
| Presets and static PNG | Strict JSON round trip and actual image/png export verified. |
| Motion and lifecycle | Pause consistency and disposal verified; reduced-motion/visibility handlers implemented. |
| Mesh-based 3D gradient renderer | Not implemented; current modes use a fullscreen shader. |
| Figma, Framer, Vue integrations | Not implemented. |
| ShaderGradient API/pixel compatibility | Not claimed; original API and shader. |

## Release acceptance

A v0.1 release requires passing type checks, unit tests, production build, package-content review, a fresh package consumer import and the documented browser checks. The private repository must contain source, demo, lockfile, CI, notices and architecture documentation. A release tag must point to the reviewed source commit.

## Before a broader production rollout

Validate the host application's accessibility and authorization independently. Test the actual target Chrome, Safari, Firefox, mobile and GPU fleet. Establish measured frame-time and memory budgets under intended concurrency. Add browser checks to the organization's browser CI infrastructure. No load/SLA, cross-browser certification, independent security audit or exact upstream parity is claimed by this initial release.
