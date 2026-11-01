import { object, number, color } from "./validation.js";
export interface StudioPreset {
  version: 1;
  name: string;
  settings: Record<string, string | number | boolean>;
}
const ranges: Record<string, [number, number]> = {
  uTime: [0, 3600],
  uSpeed: [0, 10],
  uStrength: [0, 20],
  uDensity: [0, 20],
  uFrequency: [0, 20],
  uAmplitude: [0, 20],
  rangeStart: [0, 3600],
  rangeEnd: [0, 3600],
  loopDuration: [0.1, 3600],
  positionX: [-100, 100],
  positionY: [-100, 100],
  positionZ: [-100, 100],
  rotationX: [-360, 360],
  rotationY: [-360, 360],
  rotationZ: [-360, 360],
  reflection: [0, 1],
  cAzimuthAngle: [-360, 360],
  cPolarAngle: [0, 180],
  cDistance: [0.1, 100],
  cameraZoom: [0.1, 50],
  brightness: [0, 10],
  grainBlending: [0, 1],
};
const enums: Record<string, string[]> = {
  type: ["plane", "sphere", "waterPlane"],
  animate: ["on", "off"],
  shader: ["defaults", "positionMix", "cosmic", "glass"],
  lightType: ["3d", "env"],
  envPreset: ["city", "dawn", "lobby"],
  grain: ["on", "off"],
  range: ["enabled", "disabled"],
  loop: ["on", "off"],
};
const booleans = [
  "wireframe",
  "zoomOut",
  "toggleAxis",
  "enableTransition",
  "enableCameraUpdate",
];
export function validateStudioPreset(value: unknown): StudioPreset {
  const v = object(value, ["version", "name", "settings"]);
  if (
    v.version !== 1 ||
    typeof v.name !== "string" ||
    !v.name.trim() ||
    v.name.length > 80
  )
    throw new Error("Invalid preset identity");
  const source = object(v.settings, [
    ...Object.keys(ranges),
    ...Object.keys(enums),
    ...booleans,
    "color1",
    "color2",
    "color3",
  ]);
  const settings: StudioPreset["settings"] = {};
  for (const [key, x] of Object.entries(source)) {
    if (ranges[key]) settings[key] = number(x, key, ...ranges[key]);
    else if (key.startsWith("color")) settings[key] = color(x);
    else if (enums[key]) {
      if (typeof x !== "string" || !enums[key].includes(x))
        throw new Error("Invalid " + key);
      settings[key] = x;
    } else {
      if (typeof x !== "boolean") throw new Error("Boolean required");
      settings[key] = x;
    }
  }
  if (
    typeof settings.rangeStart === "number" &&
    typeof settings.rangeEnd === "number" &&
    settings.rangeStart > settings.rangeEnd
  )
    throw new Error("Reversed time range");
  return { version: 1, name: v.name.trim(), settings };
}
export function presetToURL(preset: StudioPreset) {
  const p = validateStudioPreset(preset);
  const query = new URLSearchParams();
  query.set("v", "1");
  query.set("name", p.name);
  for (const [key, value] of Object.entries(p.settings).sort())
    query.set(key, String(value));
  return "#" + query.toString();
}
export function presetFromURL(input: string) {
  if (input.length > 8192) throw new Error("Preset URL too long");
  const text = input.includes("#")
    ? input.split("#").slice(1).join("#")
    : input;
  const params = new URLSearchParams(text);
  if (params.get("v") !== "1") throw new Error("Unsupported URL preset");
  const settings: Record<string, unknown> = {};
  const seen = new Set<string>();
  for (const [key, value] of params) {
    if (seen.has(key)) throw new Error("Duplicate parameter");
    seen.add(key);
    if (key === "v" || key === "name") continue;
    settings[key] = ranges[key]
      ? Number(value)
      : booleans.includes(key)
        ? value === "true"
          ? true
          : value === "false"
            ? false
            : value
        : value;
  }
  return validateStudioPreset({
    version: 1,
    name: params.get("name"),
    settings,
  });
}
export class PresetHistory {
  private past: StudioPreset[] = [];
  private future: StudioPreset[] = [];
  private value: StudioPreset;
  constructor(
    initial: StudioPreset,
    readonly limit = 100,
  ) {
    if (!Number.isInteger(limit) || limit < 1 || limit > 1000)
      throw new Error("Invalid history limit");
    this.value = validateStudioPreset(initial);
  }
  get current() {
    return validateStudioPreset(this.value);
  }
  commit(next: StudioPreset) {
    const validated = validateStudioPreset(next);
    this.past.push(this.current);
    if (this.past.length > this.limit) this.past.shift();
    this.value = validated;
    this.future = [];
    return this.current;
  }
  undo() {
    const previous = this.past.pop();
    if (previous) {
      this.future.push(this.current);
      this.value = previous;
    }
    return this.current;
  }
  redo() {
    const next = this.future.pop();
    if (next) {
      this.past.push(this.current);
      this.value = next;
    }
    return this.current;
  }
}
export function interpolatePreset(a: StudioPreset, b: StudioPreset, t: number) {
  number(t, "progress", 0, 1);
  a = validateStudioPreset(a);
  b = validateStudioPreset(b);
  const settings = { ...a.settings };
  for (const [key, end] of Object.entries(b.settings)) {
    const start = settings[key];
    if (typeof start === "number" && typeof end === "number")
      settings[key] = start + (end - start) * t;
    else if (
      key.startsWith("color") &&
      typeof start === "string" &&
      typeof end === "string"
    ) {
      settings[key] =
        "#" +
        [1, 3, 5]
          .map((i) =>
            Math.round(
              parseInt(start.slice(i, i + 2), 16) * (1 - t) +
                parseInt(end.slice(i, i + 2), 16) * t,
            )
              .toString(16)
              .padStart(2, "0"),
          )
          .join("");
    } else if (t === 1) settings[key] = end;
  }
  return validateStudioPreset({
    version: 1,
    name: t === 1 ? b.name : a.name,
    settings,
  });
}
