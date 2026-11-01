# LuxLeaf Gradient Studio

An original WebGL2 gradient renderer with three visual modes, live parameters, reusable presets and PNG export.

**Private v0.1.0 product release.** Original LuxLeaf code is proprietary to Michelle L. Wu. Licensed foundations retain their own rights. This is a functional initial product with an explicit supported scope; it is not a full replacement for the upstream ecosystem.

## Run the workbench

```sh
npm ci --ignore-scripts
npm run verify
npm run dev -- --port 4176
```

Use Node 22.12+ (Node 24 recommended). Open the local URL printed by Vite. The demo includes live settings, reset and preset import/export. GPU products also export PNG. Nothing is sent to a server by the demo. Vite binds to loopback by default.

## Use the private package

Build and create an installable archive:

```sh
npm run build
npm pack
# In an authorized consumer project:
npm install /absolute/path/to/luxleaf-gradient-studio-0.1.0.tgz
```

ES modules and TypeScript declarations are included. This package is intentionally marked `private: true`; no public npm publication is configured. Use one compatible React installation in the consumer. Browser components must run on the client; construction of imperative renderers requires the DOM. A preset is data, not executable code.

```tsx
import { GradientCanvas } from '@luxleaf/gradient-studio';

export function BrandBackground() {
  return <GradientCanvas
    label="LuxLeaf green and gold gradient"
    options={{ shape: 'ribbon', animate: false }}
    style={{ width: '100%', height: 420 }}
  />;
}
```

## API

| Export | Contract |
|---|---|
| `GradientCanvas` | React canvas component; `options`, accessible `label`, `onReady(renderer or null)` and canvas attributes. |
| `new Gradient(canvas, options)` | Imperative renderer; construct in the browser after the canvas is mounted. |
| `update(partial)` | Merge and validate options before updating uniforms. |
| `exportPNG()` | Promise of image/png Blob; rejects when graphics are unavailable or disposed. |
| `destroy()` | Idempotent removal of listeners, observers, frame callbacks and GPU resources. |
| `surface.status` | `ready`, `fallback`, `lost`, `disposed`; also reflected in canvas `data-renderer`. |
| `validate`, `serialize`, `deserialize`, `defaults` | Strict configuration boundary and JSON preset helpers. |

`GradientOptions`: exactly three six-digit hex colors, speed (0–2), scale (0.2–8), warp (0–2), grain (0–0.2), shape (`plane`, `orb`, `ribbon`), animate (boolean). Shapes are procedural visual modes in a fullscreen shader, not separate 3D meshes. Give the canvas an explicit CSS width and height. React cleans up on unmount; imperative consumers must call `destroy()`.

All numeric fields must be finite and in range. Unknown configuration keys are rejected, and JSON input is limited to 16 KiB. Presets use the v0.1 schema; there is no version-migration promise yet. Exported defaults should be treated as immutable.

## Quality and operations

`npm run verify` checks TypeScript, runs 6 unit tests and builds both library and demo. `/checks.html` exposes 7 actual browser integration assertions; open it in the local server and press **Run checks**. Browser checks are manual and are not represented as automated CI coverage. See [validation](docs/VALIDATION.md) for evidence and limits.

- [Architecture and lifecycle](docs/ARCHITECTURE.md)
- [Capability comparison and known gaps](docs/CAPABILITIES.md)
- [Private release procedure](docs/RELEASING.md)
- [Research and provenance](docs/PROVENANCE.md)
- [Third-party notices](THIRD_PARTY_NOTICES.md)
- [Security reporting and data handling](SECURITY.md)

The demo is a workbench for this package. Authentication, tenancy, persistence, payments and deployment infrastructure belong to the integrating application and are not supplied by this browser library.
