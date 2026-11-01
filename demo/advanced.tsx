import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ShaderGradient,
  ShaderGradientCanvas,
  presetsArray,
} from "../src/react-engine";
import {
  validateStudioPreset,
  presetToURL,
  presetFromURL,
  PresetHistory,
  type StudioPreset,
} from "../src/presets";
import "./style.css";
const initial = validateStudioPreset({
  version: 1,
  name: "LuxLeaf atmosphere",
  settings: {
    type: "sphere",
    color1: "#114d40",
    color2: "#b2d8b4",
    color3: "#e2be6b",
    uSpeed: 0.3,
    uStrength: 3,
    uDensity: 1.5,
    grain: "off",
    lightType: "3d",
    shader: "defaults",
    animate: "on",
  },
});
function App() {
  const [start] = useState(() => {
    try {
      return location.hash ? presetFromURL(location.hash) : initial;
    } catch {
      return initial;
    }
  });
  const history = useRef(new PresetHistory(start)),
    [p, set] = useState(start),
    [status, message] = useState(
      "Local rendering • no remote environment maps",
    ),
    [draft, edit] = useState("");
  const change = (key: string, value: any) => {
    try {
      set(
        history.current.commit({
          ...p,
          settings: { ...p.settings, [key]: value },
        }),
      );
    } catch (e) {
      message(String(e));
    }
  };
  return (
    <>
      <header>
        <strong>LUXLEAF GRADIENT STUDIO</strong>
        <a href="/vue.html">Vue workbench</a>
      </header>
      <main>
        <h1>Color, with dimension.</h1>
        <p>
          Mesh geometry, shader families, camera controls, portable presets and
          reversible edits.
        </p>
        <div className="workspace">
          <section className="preview" id="engine">
            <ShaderGradientCanvas
              style={{ width: "100%", height: "100%" }}
              pixelDensity={1.5}
              preserveDrawingBuffer
              lazyLoad={false}
            >
              <ShaderGradient {...(p.settings as any)} />
            </ShaderGradientCanvas>
          </section>
          <aside className="controls">
            <label>
              Geometry
              <select
                value={p.settings.type as string}
                onChange={(e) => change("type", e.target.value)}
              >
                {["plane", "sphere", "waterPlane"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Shader family
              <select
                value={p.settings.shader as string}
                onChange={(e) => change("shader", e.target.value)}
              >
                {["defaults", "positionMix", "cosmic", "glass"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            {["color1", "color2", "color3"].map((k) => (
              <label key={k}>
                {k}
                <input
                  type="color"
                  value={p.settings[k] as string}
                  onChange={(e) => change(k, e.target.value)}
                />
              </label>
            ))}
            {["uSpeed", "uStrength", "uDensity"].map((k) => (
              <label key={k}>
                {k}
                <input
                  type="range"
                  min="0"
                  max="5"
                  step=".1"
                  value={Number(p.settings[k])}
                  onChange={(e) => change(k, Number(e.target.value))}
                />
              </label>
            ))}
            <button
              onClick={() =>
                change("animate", p.settings.animate === "on" ? "off" : "on")
              }
            >
              {p.settings.animate === "on" ? "Pause motion" : "Play motion"}
            </button>
            <button onClick={() => change("wireframe", !p.settings.wireframe)}>
              Toggle wireframe
            </button>
            <button onClick={() => set(history.current.undo())}>Undo</button>
            <button onClick={() => set(history.current.redo())}>Redo</button>
            <button
              onClick={() => {
                const hash = presetToURL(p);
                window.history.replaceState(null, "", hash);
                edit(hash);
                message("Share settings copied into the address bar");
              }}
            >
              Share settings
            </button>
            <button
              onClick={() => {
                const canvas = document.querySelector(
                  "#engine canvas",
                ) as HTMLCanvasElement;
                canvas.toBlob((blob) => {
                  if (!blob) return;
                  const url = URL.createObjectURL(blob),
                    a = document.createElement("a");
                  a.href = url;
                  a.download = "luxleaf-gradient.png";
                  a.click();
                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                });
              }}
            >
              Export PNG
            </button>
          </aside>
        </div>
        <p role="status">{status}</p>
        <details>
          <summary>Import shared settings</summary>
          <textarea
            aria-label="Shared preset"
            value={draft}
            onChange={(e) => edit(e.target.value)}
          />
          <button
            onClick={() => {
              try {
                set(history.current.commit(presetFromURL(draft)));
                message("Imported");
              } catch (e) {
                message(String(e));
              }
            }}
          >
            Import
          </button>
        </details>
        <p>
          {presetsArray.length} foundation presets are available through the
          package API.
        </p>
        <a href="/checks-expanded.html">Run expanded acceptance checks</a>
      </main>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
