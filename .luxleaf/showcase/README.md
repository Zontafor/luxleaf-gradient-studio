# LuxLeaf gradient motion showcase

This standalone Vue application uses the restored licensed renderer. LuxLeaf additions live under `.luxleaf/`; the original component and shader source is unchanged by this showcase.

## Run

After the root workspace installation and Vue package build described in the repository README:

```sh
node apps/example-vue-dev/node_modules/vite/bin/vite.js --config .luxleaf/showcase/vite.config.mjs
```

Open http://localhost:4388. The server binds to loopback only. Select a palette, pause the live preview or watch its saved clip. The [static video gallery](../media/gallery.html) is served at `/gallery.html`.

## Capture and export

1. Keep the preview visible and motion enabled. Press **Record 12-second clip**. Canvas capture records only this renderer, without audio or screen capture.
2. The local development endpoint saves a WebM in `.luxleaf/media/`. Only the three preset filenames and same-origin requests are accepted, with a 20 MB limit. The endpoint is absent from production builds.
3. Run `python3 .luxleaf/showcase/encode-clips.py` with FFmpeg/ffprobe installed. This produces H.264 MP4, JPEG posters, six-second animated GIF previews and a verification manifest.
4. Review the motion and the encoded files before committing. Recording start-up can shorten the resulting clip; the manifest reports the measured duration, frame count, dimensions and SHA-256 for each MP4.

The encoder compares frames at seconds 1 and 9 to catch a frozen export. This checks that output changes; it is not a visual-quality or performance benchmark. Clips are 30 fps exports from actual canvas recordings, without synthesized intermediate motion.

## Palette studies

| Study | Foundation preset | LuxLeaf changes |
|---|---|---|
| Emerald Tide | `mint` | Teal/mint/ivory palette, speed 0.45, strength 3, brightness 1.15 |
| Orchid Orbit | `pensive` | Lavender/orchid/apricot palette, speed 0.5, strength 0.6, brightness 1.6 |
| Copper Dawn | `halo` | Copper/apricot/burgundy palette, speed 0.45, strength 3.8, brightness 1.1 |

Exact colors and component settings are in [main.ts](main.ts). All three use 3D lighting, grain off, fixed 960 × 540 rendering and pixel density 1. These are three curated studies, not an exhaustive demonstration of every renderer feature. They are not promised to loop seamlessly.

## Verification

```sh
node .luxleaf/verify-source.mjs
node node_modules/typescript/bin/tsc -p .luxleaf/showcase/tsconfig.json
node apps/example-vue-dev/node_modules/vite/bin/vite.js build --config .luxleaf/showcase/vite.config.mjs
```

The recorded media and this application are available in the public repository. Run the showcase locally; no new registry package is published by making the source public. Upstream licenses and notices remain in force for the renderer.
