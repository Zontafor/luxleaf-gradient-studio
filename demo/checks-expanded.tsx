import React from "react";
import { createRoot } from "react-dom/client";
import { createApp, h } from "vue";
import { ShaderGradient, ShaderGradientCanvas } from "../src/react-engine";
import {
  ShaderGradient as VueGradient,
  ShaderGradientCanvas as VueCanvas,
} from "../src/vue";
const output = document.querySelector("#result")!;
const lines: string[] = [];
function check(name: string, value: unknown) {
  if (!value) throw new Error(name);
  lines.push("PASS " + name);
  output.textContent = lines.join("\n");
}
const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));
document.querySelector("#run")!.addEventListener("click", async () => {
  lines.length = 0;
  try {
    await run();
    output.textContent = lines.join("\n") + "\nALL PASSED: " + lines.length;
  } catch (error) {
    output.textContent = lines.join("\n") + "\nFAILED: " + String(error);
  }
});
async function run() {
  const host = document.createElement("div");
  host.style.cssText = "width:320px;height:240px";
  document.body.append(host);
  const root = createRoot(host);
  try {
    for (const shader of ["defaults", "positionMix", "cosmic", "glass"])
      for (const type of ["plane", "sphere", "waterPlane"] as const) {
        root.render(
          <ShaderGradientCanvas
            style={{ width: "100%", height: "100%" }}
            preserveDrawingBuffer
            lazyLoad={false}
          >
            <ShaderGradient
              key={shader + type}
              shader={shader}
              type={type}
              animate="off"
              grain="off"
              lightType="3d"
              color1="#114d40"
              color2="#c4deaa"
              color3="#e4bd75"
            />
          </ShaderGradientCanvas>,
        );
        await wait(450);
        const canvas = host.querySelector("canvas")!,
          gl = canvas?.getContext("webgl2");
        check(
          "React " + shader + " " + type + " creates a real GPU renderer",
          !!gl && gl.getError() === 0,
        );
        const pixels = new Uint8Array(canvas.width * canvas.height * 4);
        gl!.readPixels(
          0,
          0,
          canvas.width,
          canvas.height,
          gl!.RGBA,
          gl!.UNSIGNED_BYTE,
          pixels,
        );
        check(
          "React " + shader + " " + type + " produces nonuniform pixels",
          new Set(pixels).size > 8,
        );
      }
    root.unmount();
    check("React engine unmount removes canvas", !host.querySelector("canvas"));
    const app = createApp({
      render: () =>
        h(
          VueCanvas,
          {
            preserveDrawingBuffer: true,
            lazyLoad: false,
            style: { width: "100%", height: "100%" },
          },
          {
            default: () =>
              h(VueGradient, {
                type: "sphere",
                animate: "off",
                grain: "off",
                lightType: "3d",
                color1: "#114d40",
                color2: "#c4deaa",
                color3: "#e4bd75",
              }),
          },
        ),
    });
    app.mount(host);
    try {
      await wait(650);
      const canvas = host.querySelector("canvas")!,
        gl = canvas?.getContext("webgl2");
      check(
        "Vue engine creates a real GPU renderer",
        !!gl && gl.getError() === 0,
      );
      const pixels = new Uint8Array(canvas.width * canvas.height * 4);
      gl!.readPixels(
        0,
        0,
        canvas.width,
        canvas.height,
        gl!.RGBA,
        gl!.UNSIGNED_BYTE,
        pixels,
      );
      check(
        "Vue engine produces rendered output",
        pixels.some((v) => v > 0),
      );
    } finally {
      app.unmount();
    }
    check("Vue engine unmount removes canvas", !host.querySelector("canvas"));
  } finally {
    root.unmount();
    host.remove();
  }
}
