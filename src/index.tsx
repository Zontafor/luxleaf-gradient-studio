import React, { useEffect, useRef } from "react";
import { Surface } from "./surface.js";
import {
  number,
  color,
  rgb,
  object,
  boolean,
  parseJSON,
} from "./validation.js";
export interface GradientOptions {
  colors: [string, string, string];
  speed: number;
  scale: number;
  warp: number;
  grain: number;
  shape: "plane" | "orb" | "ribbon";
  animate: boolean;
}
export const defaults: GradientOptions = {
  colors: ["#102a22", "#77b299", "#e4c477"],
  speed: 0.25,
  scale: 2.2,
  warp: 0.7,
  grain: 0.04,
  shape: "plane",
  animate: true,
};
export function validate(value: unknown): GradientOptions {
  const p = object(value, [
    "colors",
    "speed",
    "scale",
    "warp",
    "grain",
    "shape",
    "animate",
  ]);
  const v = { ...defaults, ...p };
  if (!Array.isArray(v.colors) || v.colors.length !== 3)
    throw new Error("Three colors required");
  if (!["plane", "orb", "ribbon"].includes(v.shape as string))
    throw new Error("Invalid shape");
  return {
    colors: v.colors.map(color) as GradientOptions["colors"],
    speed: number(v.speed, "speed", 0, 2),
    scale: number(v.scale, "scale", 0.2, 8),
    warp: number(v.warp, "warp", 0, 2),
    grain: number(v.grain, "grain", 0, 0.2),
    shape: v.shape as GradientOptions["shape"],
    animate: boolean(v.animate),
  };
}
export function serialize(options: GradientOptions) {
  return JSON.stringify(validate(options));
}
export function deserialize(text: string) {
  return validate(parseJSON(text));
}
const fragment = `#version 300 es
precision highp float;in vec2 uv;out vec4 frag;uniform vec2 uResolution;uniform float uTime,uSpeed,uScale,uWarp,uGrain,uShape;uniform vec3 uA,uB,uC;
void main(){vec2 p=(uv-.5)*vec2(uResolution.x/uResolution.y,1.);float t=uTime*uSpeed;float wave=sin(p.x*uScale*2.8+t)+cos(p.y*uScale*3.1-t*.7);vec2 q=p+uWarp*.14*vec2(sin(p.y*4.+t),cos(p.x*3.-t));float a=.5+.5*sin(q.x*2.4+q.y*3.1+wave*.8);float b=.5+.5*cos(q.y*3.-q.x*2.+t*.35);vec3 c=mix(mix(uA,uB,a),uC,b*.55);if(uShape>0.5&&uShape<1.5){float r=length(p*1.5);float shade=sqrt(max(0.,1.-r*r));c=mix(uA*.4,c*(.45+shade*.8),1.-smoothstep(.95,1.,r));}if(uShape>1.5){float band=.5+.5*sin(q.x*4.+q.y*6.+sin(t));c=mix(uA,c,smoothstep(.1,.8,band));}float noise=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5;frag=vec4(clamp(c+noise*uGrain,0.,1.),1.);}`;
export class Gradient {
  readonly surface: Surface;
  private options: GradientOptions;
  constructor(
    canvas: HTMLCanvasElement,
    options: Partial<GradientOptions> = {},
  ) {
    this.options = validate(options);
    canvas.style.background = this.options.colors[0];
    this.surface = new Surface(canvas, fragment);
    this.update(this.options);
  }
  update(options: Partial<GradientOptions>) {
    this.options = validate({ ...this.options, ...options });
    const o = this.options;
    this.surface.canvas.style.background = o.colors[0];
    this.surface.set({
      uA: rgb(o.colors[0]),
      uB: rgb(o.colors[1]),
      uC: rgb(o.colors[2]),
      uSpeed: o.speed,
      uScale: o.scale,
      uWarp: o.warp,
      uGrain: o.grain,
      uShape: ["plane", "orb", "ribbon"].indexOf(o.shape),
    });
    this.surface.play(o.animate);
  }
  exportPNG() {
    return this.surface.exportPNG();
  }
  destroy() {
    this.surface.destroy();
  }
}
export function GradientCanvas({
  options = {},
  label = "Decorative animated gradient",
  onReady,
  ...props
}: {
  options?: Partial<GradientOptions>;
  label?: string;
  onReady?: (renderer: Gradient | null) => void;
} & Omit<React.CanvasHTMLAttributes<HTMLCanvasElement>, "children">) {
  const ref = useRef<HTMLCanvasElement>(null),
    instance = useRef<Gradient | null>(null),
    ready = useRef(onReady);
  ready.current = onReady;
  useEffect(() => {
    const renderer = new Gradient(ref.current!, options);
    instance.current = renderer;
    ready.current?.(renderer);
    return () => {
      renderer.destroy();
      instance.current = null;
      ready.current?.(null);
    };
  }, []);
  useEffect(() => {
    instance.current?.update(options);
  }, [JSON.stringify(options)]);
  return <canvas {...props} ref={ref} role="img" aria-label={label} />;
}

export * from "./presets.js";
