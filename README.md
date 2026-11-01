# LuxLeaf Gradient Studio — source guide

**Explore the full gradient renderer, React/Vue examples, editor UI and plugin source.**

[Motion videos](#motion-videos) · [Quick start](#quick-start) · [React usage](#react-usage) · [Vue usage](#vue-usage) · [Examples and packages](#examples-and-packages) · [Verification](#verification)

## Motion videos

Three LuxLeaf palette studies, recorded directly from the live Vue canvas at 960 × 540. The previews below animate; select one to open its full MP4. No generated footage or soundtrack.

| Emerald Tide | Orchid Orbit | Copper Dawn |
|---|---|---|
| [![Emerald Tide motion](.luxleaf/media/emerald-tide.gif)](.luxleaf/media/emerald-tide.mp4) | [![Orchid Orbit motion](.luxleaf/media/orchid-orbit.gif)](.luxleaf/media/orchid-orbit.mp4) | [![Copper Dawn motion](.luxleaf/media/copper-dawn.gif)](.luxleaf/media/copper-dawn.mp4) |
| [MP4](.luxleaf/media/emerald-tide.mp4) · [WebM](.luxleaf/media/emerald-tide.webm) | [MP4](.luxleaf/media/orchid-orbit.mp4) · [WebM](.luxleaf/media/orchid-orbit.webm) | [MP4](.luxleaf/media/copper-dawn.mp4) · [WebM](.luxleaf/media/copper-dawn.webm) |

[Run the motion showcase and reproduce the recordings](.luxleaf/showcase/README.md). It includes live palette switching, pause, canvas recording and playback. GitHub may offer a download instead of inline MP4 playback; the local showcase plays the files directly.

The original [README](UPSTREAM.md), [animated introduction](assets/intro.gif) and [Vue example screenshot](.luxleaf/images/vue-example.jpg) remain available.

The complete restored monorepo is now on private `main`, with its original workspace names and license notices. The previously published `@zontafor/luxleaf-gradient-studio` package is a separate earlier implementation; its [historical package guide](https://github.com/Zontafor/luxleaf-gradient-studio/blob/1f46ad51c6bc60b5356b4da2607e930788b3ac8b/README.md) remains at that revision. This restoration does not publish a new registry package.

## Quick start

Use Node 24.11+ for the Nuxt applications and pnpm 10.12.4 for this workspace.

```sh
git clone https://github.com/Zontafor/luxleaf-gradient-studio.git
cd luxleaf-gradient-studio
pnpm install --frozen-lockfile --ignore-scripts
pnpm --filter @shadergradient/react --filter @shadergradient/vue build
pnpm --filter example-vue-dev dev
```

Open the Vite URL printed in the terminal. Change presets, geometry, shader, colors, speed and grain using the original example controls.

## React usage

Inside a React workspace example, import the original package exports:

```tsx
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export function GradientExample() {
  return (
    <div style={{ height: 420 }}>
      <ShaderGradientCanvas style={{ width: '100%', height: '100%' }} pixelDensity={1.5}>
        <ShaderGradient type="waterPlane" shader="defaults"
          color1="#114d40" color2="#b2d8b4" color3="#e2be6b"
          uSpeed={0.3} uStrength={3} lightType="3d" grain="off" />
      </ShaderGradientCanvas>
    </div>
  );
}
```

Match React and Fiber major versions as described in the [original compatibility matrix](UPSTREAM.md#compatibility-matrix). The locked workspace examples supply their own dependencies; do not replace all examples' React versions with one assumed version.

## Vue usage

In a Vue single-file component inside the Vue example:

```vue
<script setup lang="ts">
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/vue';
</script>

<template>
  <div style="height: 360px">
    <ShaderGradientCanvas style="width: 100%; height: 100%">
      <ShaderGradient type="plane" color1="#114d40" color2="#b2d8b4"
        color3="#e2be6b" :u-speed="0.3" light-type="3d" grain="off" />
    </ShaderGradientCanvas>
  </div>
</template>
```

See the [Vue/Nuxt guide](packages/shadergradient-vue/README.md) for SSR fallback and lifecycle details.

## Examples and packages

| Area | What it contains | Source |
|---|---|---|
| React renderer | Mesh, shader, light and camera behavior | [Package](packages/shadergradient) |
| Vue renderer | Vue components and SSR-aware canvas | [Package](packages/shadergradient-vue) |
| UI | Controls, presets and GIF-related code | [UI](packages/ui) |
| Vue development app | Live parameter controls | [Example](apps/example-vue-dev) |
| Next.js development app | React examples, including loop controls | [Example](apps/example-nextjs-dev) |
| Standalone starters | React, Vue and Nuxt projects | [Starter guide](apps/examples/README.md) |
| Figma plugin | Editor integration source | [Plugin](apps/figma-plugin) |
| Framer plugin | Editor integration source | [Plugin](apps/framer-plugin) |

Plugin source and successful compilation do not mean the plugins are installed or published in an editor marketplace.

## Verification

```sh
node .luxleaf/verify-source.mjs
pnpm --filter @shadergradient/react --filter @shadergradient/vue build
pnpm --filter ui build
pnpm --filter @shadergradient/figma-plugin plugin:build
pnpm --filter @shadergradient/framer-plugin --filter example-vue-dev build
```

All five Chromium browser jobs passed at `503fd6c`: 39 passing cases and 41 target-specific skips, with unchanged assertions and viewports. Hosted CI uses longer functional test budgets; this is not a hardware performance benchmark.

The original [browser-suite guide](tests/browser/README.md) explains separate end-to-end checks. [Recorded build verification](.luxleaf/verification.json) and [current GitHub runs](https://github.com/Zontafor/luxleaf-gradient-studio/actions) show their scope. The Next.js example now passes its production build, including lint and type checking. Two small source corrections and the browser-test configuration change are explicitly recorded in the source manifest; original file bytes are retained under `.luxleaf/originals/`.

## Source and license

Pinned revision: `68bdd740037a11c639f8b91fd775949c71d718d0`. All 606 original files are covered by the [source manifest](.luxleaf/upstream-manifest.json), including relocated original workflows. Original license declarations, authorship and embedded third-party notices remain intact; see the [upstream license section](UPSTREAM.md#license).
