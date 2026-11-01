import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  GradientCanvas,
  type Gradient,
  defaults,
  validate,
  serialize,
  deserialize,
  type GradientOptions,
} from "../src/index";
import "./style.css";
function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function App() {
  const [options, setOptions] = useState(defaults),
    [message, setMessage] = useState("Ready for your ideas."),
    [draft, setDraft] = useState(""),
    [ready, setReady] = useState("ready");
  const renderer = useRef<Gradient | null>(null);
  function change(p: Partial<GradientOptions>) {
    setOptions(validate({ ...options, ...p }));
  }
  return (
    <>
      <header>
        <a href="/advanced.html" style={{ color: "inherit" }}>
          Open full workbench →
        </a>
        <strong>
          LUXLEAF <small>VISUAL SYSTEMS</small>
        </strong>
        <span className="badge">GRADIENT-STUDIO / 01</span>
      </header>
      <main>
        <div className="intro">
          <div>
            <small>DESIGN ENGINEERING</small>
            <h1>Atmosphere, composed.</h1>
          </div>
          <p>
            An original moving color field for LuxLeaf. Shape the light, choose
            your palette, and keep motion considered.
          </p>
        </div>
        <div className="workspace">
          <section className="preview" aria-label="Live visual preview">
            <GradientCanvas
              options={options}
              onReady={(value) => {
                renderer.current = value;
                setReady(value?.surface.status ?? "waiting");
              }}
            />
            <div className="overlay">
              <span className="badge">LUXLEAF / ATMOSPHERE</span>
              <h2>
                Ideas grow
                <br />
                in good light.
              </h2>
            </div>
          </section>
          <aside className="controls" aria-label="Visual settings">
            <label>
              Shape
              <select
                value={options.shape}
                onChange={(e) =>
                  change({ shape: e.target.value as GradientOptions["shape"] })
                }
              >
                <option value="plane">Plane</option>
                <option value="orb">Orb</option>
                <option value="ribbon">Ribbon</option>
              </select>
            </label>
            {options.colors.map((c, i) => (
              <label key={i}>
                Color {i + 1}
                <input
                  type="color"
                  value={c}
                  onChange={(e) => {
                    const colors = [
                      ...options.colors,
                    ] as GradientOptions["colors"];
                    colors[i] = e.target.value;
                    change({ colors });
                  }}
                />
              </label>
            ))}
            <label>
              Speed · {options.speed}
              <input
                aria-label="Speed"
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={options.speed}
                onChange={(e) => change({ speed: Number(e.target.value) })}
              />
            </label>
            <label>
              Scale · {options.scale}
              <input
                aria-label="Scale"
                type="range"
                min={0.2}
                max={8}
                step={0.1}
                value={options.scale}
                onChange={(e) => change({ scale: Number(e.target.value) })}
              />
            </label>
            <label>
              Warp · {options.warp}
              <input
                aria-label="Warp"
                type="range"
                min={0}
                max={2}
                step={0.01}
                value={options.warp}
                onChange={(e) => change({ warp: Number(e.target.value) })}
              />
            </label>
            <label>
              Grain · {options.grain}
              <input
                aria-label="Grain"
                type="range"
                min={0}
                max={0.2}
                step={0.01}
                value={options.grain}
                onChange={(e) => change({ grain: Number(e.target.value) })}
              />
            </label>
            <button onClick={() => change({ animate: !options.animate })}>
              {options.animate ? "Pause motion" : "Play motion"}
            </button>
            <button
              onClick={async () => {
                try {
                  const blob = await renderer.current!.exportPNG();
                  download(blob, "luxleaf-render.png");
                  setMessage("PNG exported");
                } catch (error) {
                  setMessage((error as Error).message);
                }
              }}
            >
              Export PNG
            </button>
            <button onClick={() => setOptions(defaults)}>Reset settings</button>
          </aside>
        </div>
        <div className="notes">
          <div>
            <strong>Considered by default</strong>
            <p>
              Reduced-motion preferences and hidden tabs pause the animation.
            </p>
          </div>
          <div>
            <strong>Your configuration</strong>
            <p>
              Settings are validated before rendering. Save a preset for another
              surface.
            </p>
            <button
              onClick={() => {
                const data = serialize(options);
                setDraft(data);
                download(
                  new Blob([data], { type: "application/json" }),
                  "luxleaf-preset.json",
                );
                setMessage("Preset exported");
              }}
            >
              Export preset
            </button>
          </div>
          <div>
            <strong>Private by design</strong>
            <p>No analytics or uploads. The demo runs on this device.</p>
            <output role="status">
              {message} · renderer {ready}
            </output>
          </div>
        </div>
        <details>
          <summary>Import a preset</summary>
          <textarea
            aria-label="Preset JSON"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
          />
          <button
            onClick={() => {
              try {
                setOptions(deserialize(draft));
                setMessage("Preset imported");
              } catch (error) {
                setMessage((error as Error).message);
              }
            }}
          >
            Apply preset
          </button>
        </details>
      </main>
      <footer>
        Original LuxLeaf product · © 2026 Michelle L. Wu · Private development
        preview
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
