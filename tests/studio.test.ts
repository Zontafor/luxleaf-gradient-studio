import test from "node:test";
import assert from "node:assert/strict";
import {
  validateStudioPreset,
  presetToURL,
  presetFromURL,
  PresetHistory,
  interpolatePreset,
} from "../src/presets.js";
import * as reactEngine from "../src/react-engine.js";
import * as vueEngine from "../src/vue.js";
import { shaderSources } from "../src/shader-sources.js";
const a = validateStudioPreset({
    version: 1,
    name: "Green",
    settings: {
      color1: "#000000",
      uSpeed: 0,
      type: "sphere",
      wireframe: false,
    },
  }),
  b = validateStudioPreset({
    version: 1,
    name: "Gold",
    settings: { color1: "#ffffff", uSpeed: 2, type: "plane", wireframe: true },
  });
test("complete React and Vue engine entry points load", () => {
  for (const key of ["ShaderGradient", "ShaderGradientCanvas"]) {
    assert.equal(typeof (reactEngine as any)[key], "function");
    assert.ok((vueEngine as any)[key]);
  }
  assert.ok(vueEngine.ShaderGradientSource);
  assert.ok(vueEngine.ShaderGradientView);
  assert.ok(Object.keys(reactEngine.presets).length > 5);
});
test("all twelve mesh/family shader pairs are preserved", () => {
  for (const family of ["defaults", "positionMix", "cosmic", "glass"])
    for (const mesh of ["plane", "sphere", "waterPlane"])
      for (const stage of ["vertex", "fragment"])
        assert.ok(shaderSources[`${family}/${mesh}/${stage}.glsl`]);
});
test("share URLs preserve values without accepting extra keys or duplicates", () => {
  assert.deepEqual(presetFromURL(presetToURL(a)), a);
  assert.throws(() => presetFromURL(presetToURL(a) + "&uSpeed=2"));
  assert.throws(() => presetFromURL("#v=1&name=x&script=evil"));
});
test("undo, redo, branching and defensive copies", () => {
  const h = new PresetHistory(a);
  h.commit(b);
  assert.equal(h.undo().name, "Green");
  assert.equal(h.redo().name, "Gold");
  h.undo();
  h.commit({ ...a, name: "Branch" });
  assert.equal(h.redo().name, "Branch");
  h.current.settings.uSpeed = 100;
  assert.equal(h.current.settings.uSpeed, 0);
});
test("interpolation mixes continuous values and defers discrete changes", () => {
  const mid = interpolatePreset(a, b, 0.5);
  assert.equal(mid.settings.uSpeed, 1);
  assert.equal(mid.settings.color1, "#808080");
  assert.equal(mid.settings.type, "sphere");
  assert.deepEqual(interpolatePreset(a, b, 1), b);
  assert.throws(() => interpolatePreset(a, b, NaN));
});
test("preset validation bounds processing and excludes executable settings", () => {
  assert.throws(() =>
    validateStudioPreset({
      version: 1,
      name: "x",
      settings: { onCameraUpdate: "evil" },
    }),
  );
  assert.throws(() =>
    validateStudioPreset({
      version: 1,
      name: "x",
      settings: { rangeStart: 5, rangeEnd: 2 },
    }),
  );
  assert.throws(() =>
    validateStudioPreset({
      version: 1,
      name: "x",
      settings: { wireframe: "true" },
    }),
  );
});
