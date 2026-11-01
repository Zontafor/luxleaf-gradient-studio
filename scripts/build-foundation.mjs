import { build } from "esbuild";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve("foundations/shadergradient/packages/shadergradient/src");
await mkdir("foundation-dist", { recursive: true });
await build({
  entryPoints: [root + "/index.ts"],
  outfile: "foundation-dist/react.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  jsx: "automatic",
  loader: {
    ".glsl": "text",
    ".frag": "text",
    ".vert": "text",
    ".vs": "text",
    ".fs": "text",
  },
  alias: { "@": root },
  external: [
    "react",
    "react/*",
    "react-dom",
    "react-dom/*",
    "three",
    "three/*",
    "@react-three/fiber",
    "@react-three/drei",
    "camera-controls",
    "three-stdlib",
    "query-string",
  ],
  plugins: [
    {
      name: "luxleaf-patched-query-import",
      setup(b) {
        b.onLoad({ filter: /ShaderGradient\.tsx$/ }, async ({ path }) => ({
          contents: (await readFile(path, "utf8")).replace(
            "import * as qs from 'query-string'",
            "import qs from 'query-string'",
          ),
          loader: "tsx",
        }));
      },
    },
  ],
  banner: {
    js: "// ShaderGradient MIT foundation built from pinned source. See foundations/manifest.json.\n// LuxLeaf build compatibility patch: current query-string default ESM import.",
  },
});
const types = await readFile(root + "/types.ts", "utf8");
await writeFile("foundation-dist/types.d.ts", types);
const canvas = await readFile(root + "/ShaderGradientCanvas.tsx", "utf8");
const canvasProps = canvas
  .slice(
    canvas.indexOf("type ShaderGradientCanvasProps"),
    canvas.indexOf("const Context"),
  )
  .trim();
await writeFile(
  "foundation-dist/react.d.ts",
  `import type * as React from 'react';
import type {GradientT} from './types.js';
export * from '@shadergradient/react';
export * from './types.js';
export type {GradientT,MeshT,Position,Rotation,ShaderGradientType,typeT,animateT,LightTypeT,EnvironmentPresetT,LightsT} from './types.js';
${canvasProps}
export declare function ShaderGradient(props:GradientT):React.JSX.Element;
export declare function ShaderGradientCanvas(props:ShaderGradientCanvasProps):React.JSX.Element;
export declare function useShaderGradientCanvasContext():{envBasePath?:string};
export declare function mergeCanvasProps(input:{queryPixelDensity?:number;queryFov?:number;queryPreserveDrawingBuffer?:boolean;queryPowerPreference?:WebGLPowerPreference;props:Record<string,unknown>;defaultPixelDensity?:number;defaultFov?:number}):{pixelDensity:number;fov:number;preserveDrawingBuffer?:boolean;powerPreference?:WebGLPowerPreference};
`,
);
