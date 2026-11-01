# LuxLeaf Gradient Studio

React and Vue mesh gradients, twelve shader combinations, editor adapters and reversible presets.

Version **0.2.0** expands the initial workbench into a broader package. Original LuxLeaf additions are proprietary to **Michelle L. Wu**. The included licensed foundations retain their own licenses and attribution. Public source visibility does not grant a license to LuxLeaf's proprietary additions.

## Workbench

```sh
npm ci --ignore-scripts
npm run verify
npm run verify:package
npm run dev
```

Use Node 24+. Open `/advanced.html` for the expanded studio, `/` for the compact demonstration, and `/checks-expanded.html` for real browser acceptance checks. These pages run locally. Consumer applications must supply authentication, tenancy and deployment controls appropriate to their use.

## Install

The scoped package is `@zontafor/luxleaf-gradient-studio`. GitHub Packages requires registry authentication even for public npm packages. Configure your own GitHub credential outside source control, then:

```sh
npm install @zontafor/luxleaf-gradient-studio@0.2.0 --registry=https://npm.pkg.github.com
```

GitHub Release `.tgz` attachments provide a separate installable archive. A release attachment alone is not proof of registry publication. See [release procedure](docs/RELEASING.md) for verification commands and the distinction between repository and package visibility.

## Package entry points

| Import suffix | Distributed implementation |
|---|---|
| `.` | `./dist/index.js` |
| `./react` | `./dist/react-engine.js` |
| `./vue` | `./dist/vue.js` |
| `./framer` | `./dist/framer.js` |
| `./shaders` | `./dist/shader-sources.js` |

## Implemented scope

### Complete source reference

The 606-file pinned reference tree preserves packages, apps, shaders, examples, integration sources, tests and documentation. It is licensed foundation material, not newly authored LuxLeaf code.

### Active engines

`/react` builds the pinned 2.4.24 source with a documented query-string ESM compatibility patch. `/vue` exposes the complete 0.1.0 package. Three.js is pinned to the tested 0.180.0 version.

### LuxLeaf studio

Strict versioned settings, bounded share URLs, undo/redo, interpolation, mesh/shader controls, PNG export, all twelve shader pairs at `/shaders`, a Framer host adapter, and an offline Figma PNG import integration.

### Remaining host verification

The Figma and Framer adapters have not been exercised in their actual editor hosts. Third-party HDR maps may require host-provided assets/network access; the demonstrated workbenches use local 3D lighting. Auxiliary type exports use published 2.4.20 definitions; current component/option types come from pinned source.

## Verification

The current suite includes **12 unit/integration tests**. The expanded browser page contains **28 assertions**, run separately from headless CI. These counts describe specific checks, not proof of exact feature, pixel or performance parity with another product. See [validation](docs/VALIDATION.md) for evidence and known limits.

The repository includes source, tests, runnable examples, build configuration, architecture notes, dependency notices and release workflows. The npm archive includes source and examples alongside JavaScript and declarations. It intentionally excludes installed dependencies, credentials and local user media.

- [Capability matrix](docs/CAPABILITIES.md)
- [Architecture and lifecycle](docs/ARCHITECTURE.md)
- [Provenance](docs/PROVENANCE.md)
- [Third-party notices](THIRD_PARTY_NOTICES.md)
- [Security and supported deployment](SECURITY.md)
