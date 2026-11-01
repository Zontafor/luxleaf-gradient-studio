# Rebuild provenance — v0.2.0

The unmodified source tree is preserved under `foundations/shadergradient`. `foundations/manifest.json` records the pinned revision and SHA-256 of every preserved file. `npm run verify:foundation` detects drift. These files retain their original authorship and licenses. Changes used at runtime are outside that reference tree and documented in source/build scripts.

## Earlier research record

# Private research and provenance

The supplied screen recording identified `ruucm/shadergradient`. Repository metadata and documentation were reviewed on 2026-11-01 at commit `68bdd740037a11c639f8b91fd775949c71d718d0`.

Source: https://github.com/ruucm/shadergradient/tree/68bdd740037a11c639f8b91fd775949c71d718d0

Observed license: **MIT declared in README/package metadata; no root LICENSE found in inspected tree**.

Decision: Implement an original WebGL2 renderer and React adapter. No ShaderGradient code, assets or dependency is included.

The recording and unrelated personal files are not included in this repository. Research links are provenance, not ownership claims. Original LuxLeaf source and documentation carry Michelle L. Wu's proprietary license. That license does not replace dependency licenses; see the runtime inventory and preserved notices.

Design intent is functional similarity within the declared scope, not wholesale code copying. README claims and roadmap items were treated separately from implemented features. The capability matrix records deliberate omissions and unverified integrations.
