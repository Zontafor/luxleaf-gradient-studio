// ShaderGradient MIT foundation built from pinned source. See foundations/manifest.json.
// LuxLeaf build compatibility patch: current query-string default ESM import.
var __defProp = Object.defineProperty;
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradientCanvas.tsx
import { useEffect as useEffect2, createContext, useMemo, useContext } from "react";
import { Canvas } from "@react-three/fiber";

// foundations/shadergradient/packages/shadergradient/src/consts.ts
var canvasProps = (pixelDensity, fov, glOverrides) => {
  return {
    dpr: pixelDensity,
    //device pixel ratio - 1 default and fast, 2 detailed and slow
    // mode: 'concurrent' as 'legacy' | 'blocking' | 'concurrent',
    camera: { fov },
    // could be replaced with zoom or distance?
    linear: true,
    //sRGBEncoding
    flat: true,
    //ACESFilmicToneMapping
    gl: {
      preserveDrawingBuffer: glOverrides?.preserveDrawingBuffer,
      powerPreference: glOverrides?.powerPreference
    }
  };
};
var defaultPlanesZoom = 1;
var defaultSphereDistance = 14;
var zoomOutPlanes = { zoom: 1, distance: 14 };
var zoomOutSphere = { zoom: 5, distance: 14 };
var defaultEnvBasePath = "https://ruucm.github.io/shadergradient/ui@0.0.0/assets/hdr/";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradientCanvas.tsx
import * as THREE from "three";

// foundations/shadergradient/packages/shadergradient/src/hooks/useInView.ts
import { useEffect, useState, useRef } from "react";
function useInView(enabled = true, threshold = 0.1, rootMargin = "0px") {
  const [isInView, setIsInView] = useState(!enabled);
  const containerRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [enabled, threshold, rootMargin]);
  return { isInView, containerRef };
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradientCanvas.tsx
import { jsx } from "react/jsx-runtime";
var Context = createContext(
  {}
);
var useShaderGradientCanvasContext = () => {
  return useContext(Context);
};
function ShaderGradientCanvas({
  children,
  style = {},
  pixelDensity = 1,
  fov = 45,
  pointerEvents,
  className,
  envBasePath,
  lazyLoad = true,
  threshold = 0.1,
  rootMargin = "0px",
  preserveDrawingBuffer,
  powerPreference
}) {
  const { isInView, containerRef } = useInView(lazyLoad, threshold, rootMargin);
  const contextValue = useMemo(
    () => ({ envBasePath }),
    [envBasePath]
  );
  useShaderChunkFix();
  return /* @__PURE__ */ jsx("div", { ref: containerRef, style: { width: "100%", height: "100%", ...style }, children: (!lazyLoad || isInView) && /* @__PURE__ */ jsx(Context.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    Canvas,
    {
      id: "gradientCanvas",
      style: { pointerEvents },
      resize: { offsetSize: true },
      className,
      ...canvasProps(pixelDensity, fov, {
        preserveDrawingBuffer,
        powerPreference
      }),
      children
    },
    pixelDensity + fov
  ) }) });
}
function useShaderChunkFix() {
  useEffect2(() => {
    THREE.ShaderChunk["uv2_pars_vertex"] = ``;
    THREE.ShaderChunk["uv2_vertex"] = ``;
    THREE.ShaderChunk["uv2_pars_fragment"] = ``;
    THREE.ShaderChunk["encodings_fragment"] = ``;
  }, []);
}

// foundations/shadergradient/packages/shadergradient/src/presets.ts
var presets = {
  halo: {
    title: "Halo",
    color: "white",
    props: {
      type: "plane",
      uAmplitude: 1,
      uDensity: 1.3,
      uSpeed: 0.4,
      uStrength: 4,
      uTime: 0,
      uFrequency: 5.5,
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      axesHelper: "off",
      brightness: 1.2,
      cAzimuthAngle: 180,
      cDistance: 3.6,
      cPolarAngle: 90,
      cameraZoom: 1,
      color1: "#ff5005",
      color2: "#dbba95",
      color3: "#d0bce1",
      embedMode: "off",
      envPreset: "city",
      gizmoHelper: "hide",
      grain: "on",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: -1.4,
      positionY: 0,
      positionZ: 0,
      reflection: 0.1,
      rotationX: 0,
      rotationY: 10,
      rotationZ: 50,
      shader: "defaults",
      animate: "on",
      wireframe: false
    }
  },
  pensive: {
    title: "Pensive",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "off",
      brightness: 1.5,
      cAzimuthAngle: 250,
      cDistance: 1.5,
      cPolarAngle: 140,
      cameraZoom: 12.5,
      color1: "#809bd6",
      color2: "#910aff",
      color3: "#af38ff",
      embedMode: "off",
      envPreset: "city",
      gizmoHelper: "hide",
      grain: "on",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      reflection: 0.5,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 140,
      shader: "defaults",
      type: "sphere",
      uAmplitude: 7,
      uDensity: 0.8,
      uFrequency: 5.5,
      uSpeed: 0.3,
      uStrength: 0.4,
      uTime: 0,
      wireframe: false
    }
  },
  mint: {
    title: "Mint",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "off",
      brightness: 1.2,
      cAzimuthAngle: 170,
      cDistance: 4.4,
      cPolarAngle: 70,
      cameraZoom: 1,
      color1: "#94ffd1",
      color2: "#6bf5ff",
      color3: "#ffffff",
      embedMode: "off",
      envPreset: "city",
      gizmoHelper: "hide",
      grain: "off",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: 0,
      positionY: 0.9,
      positionZ: -0.3,
      reflection: 0.1,
      rotationX: 45,
      rotationY: 0,
      rotationZ: 0,
      shader: "defaults",
      type: "waterPlane",
      uAmplitude: 0,
      uDensity: 1.2,
      uFrequency: 0,
      uSpeed: 0.2,
      uStrength: 3.4,
      uTime: 0,
      wireframe: false
    }
  },
  interstella: {
    title: "Interstella",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "off",
      brightness: 0.8,
      cAzimuthAngle: 270,
      cDistance: 0.5,
      cPolarAngle: 180,
      cameraZoom: 15.1,
      color1: "#73bfc4",
      color2: "#ff810a",
      color3: "#8da0ce",
      embedMode: "off",
      envPreset: "city",
      gizmoHelper: "hide",
      grain: "on",
      lightType: "env",
      pixelDensity: 1,
      fov: 45,
      positionX: -0.1,
      positionY: 0,
      positionZ: 0,
      reflection: 0.4,
      rotationX: 0,
      rotationY: 130,
      rotationZ: 70,
      shader: "defaults",
      type: "sphere",
      uAmplitude: 3.2,
      uDensity: 0.8,
      uFrequency: 5.5,
      uSpeed: 0.3,
      uStrength: 0.3,
      uTime: 0,
      wireframe: false
    }
  },
  nightyNight: {
    title: "Nighty night",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "off",
      brightness: 1,
      cAzimuthAngle: 180,
      cDistance: 2.8,
      cPolarAngle: 80,
      cameraZoom: 9.1,
      color1: "#606080",
      color2: "#8d7dca",
      color3: "#212121",
      embedMode: "off",
      envPreset: "city",
      gizmoHelper: "hide",
      grain: "on",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      reflection: 0.1,
      rotationX: 50,
      rotationY: 0,
      rotationZ: -60,
      shader: "defaults",
      type: "waterPlane",
      uAmplitude: 0,
      uDensity: 1.5,
      uFrequency: 0,
      uSpeed: 0.3,
      uStrength: 1.5,
      uTime: 8,
      wireframe: false
    }
  },
  violaOrientalis: {
    title: "Viola",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "on",
      brightness: 1.1,
      cAzimuthAngle: 0,
      cDistance: 7.1,
      cPolarAngle: 140,
      cameraZoom: 17.3,
      color1: "#ffffff",
      color2: "#ffbb00",
      color3: "#0700ff",
      embedMode: "off",
      envPreset: "city",
      grain: "off",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      reflection: 0.1,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      shader: "defaults",
      type: "sphere",
      uAmplitude: 1.4,
      uDensity: 1.1,
      uSpeed: 0.1,
      uStrength: 1,
      uTime: 0,
      uFrequency: 5.5,
      wireframe: false
    }
  },
  universe: {
    title: "Universe",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "on",
      brightness: 1.1,
      cAzimuthAngle: 180,
      cDistance: 3.9,
      cPolarAngle: 115,
      cameraZoom: 1,
      color1: "#5606ff",
      color2: "#fe8989",
      color3: "#000000",
      embedMode: "off",
      envPreset: "city",
      grain: "off",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: -0.5,
      positionY: 0.1,
      positionZ: 0,
      reflection: 0.1,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 235,
      shader: "defaults",
      type: "waterPlane",
      uAmplitude: 0,
      uDensity: 1.1,
      uSpeed: 0.1,
      uStrength: 2.4,
      uTime: 0.2,
      uFrequency: 5.5,
      wireframe: false
    }
  },
  sunset: {
    title: "Sunset",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "on",
      bgColor1: "#000000",
      bgColor2: "#000000",
      brightness: 1.5,
      cAzimuthAngle: 60,
      cDistance: 7.1,
      cPolarAngle: 90,
      cameraZoom: 15.3,
      color1: "#ff7a33",
      color2: "#33a0ff",
      color3: "#ffc53d",
      embedMode: "off",
      envPreset: "dawn",
      grain: "off",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: 0,
      positionY: -0.15,
      positionZ: 0,
      reflection: 0.1,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      shader: "defaults",
      type: "sphere",
      uAmplitude: 1.4,
      uDensity: 1.1,
      uSpeed: 0.1,
      uStrength: 0.4,
      uTime: 0,
      uFrequency: 5.5,
      wireframe: false
    }
  },
  mandarin: {
    title: "Mandarin",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "on",
      bgColor1: "#000000",
      bgColor2: "#000000",
      brightness: 1.2,
      cAzimuthAngle: 180,
      cDistance: 2.4,
      cPolarAngle: 95,
      cameraZoom: 1,
      color1: "#ff6a1a",
      color2: "#c73c00",
      color3: "#FD4912",
      embedMode: "off",
      envPreset: "city",
      grain: "off",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: 0,
      positionY: -2.1,
      positionZ: 0,
      reflection: 0.1,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 225,
      shader: "defaults",
      type: "waterPlane",
      uAmplitude: 0,
      uDensity: 1.8,
      uSpeed: 0.2,
      uStrength: 3,
      uTime: 0.2,
      uFrequency: 5.5,
      wireframe: false
    }
  },
  cottonCandy: {
    title: "Cotton Candy",
    color: "white",
    props: {
      range: "disabled",
      rangeStart: 0,
      rangeEnd: 40,
      frameRate: 10,
      destination: "onCanvas",
      format: "gif",
      animate: "on",
      axesHelper: "off",
      brightness: 1.2,
      cAzimuthAngle: 180,
      cDistance: 2.9,
      cPolarAngle: 120,
      cameraZoom: 1,
      color1: "#ebedff",
      color2: "#f3f2f8",
      color3: "#dbf8ff",
      embedMode: "off",
      envPreset: "city",
      grain: "off",
      lightType: "3d",
      pixelDensity: 1,
      fov: 45,
      positionX: 0,
      positionY: 1.8,
      positionZ: 0,
      reflection: 0.1,
      rotationX: 0,
      rotationY: 0,
      rotationZ: -90,
      shader: "defaults",
      type: "waterPlane",
      uAmplitude: 0,
      uDensity: 1,
      uSpeed: 0.3,
      uStrength: 3,
      uTime: 0.2,
      uFrequency: 5.5,
      wireframe: false
    }
  }
};
var initialActivePreset = 0;
var presetsArray = Object.values(presets);

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Mesh/Geometry.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var meshCount = 192;
function Geometry({ type }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    type === "plane" && /* @__PURE__ */ jsx2("planeGeometry", { args: [10, 10, 1, meshCount] }),
    type === "sphere" && /* @__PURE__ */ jsx2("icosahedronGeometry", { args: [1, meshCount / 3] }),
    type === "waterPlane" && /* @__PURE__ */ jsx2("planeGeometry", { args: [10, 10, meshCount, meshCount] })
  ] });
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Mesh/Materials.tsx
import { useEffect as useEffect3, useMemo as useMemo2, useRef as useRef2 } from "react";
import * as THREE2 from "three";

// foundations/shadergradient/packages/shadergradient/src/utils/color.ts
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function rgbStringToRgb(rgbString) {
  const result = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return result ? {
    r: parseInt(result[1]),
    g: parseInt(result[2]),
    b: parseInt(result[3])
  } : null;
}
function colorToRgb(color) {
  if (color.startsWith("#")) {
    return hexToRgb(color);
  } else if (color.startsWith("rgb")) {
    return rgbStringToRgb(color);
  } else {
    throw new Error("Invalid color format");
  }
}
function formatColor(color = 0) {
  return color / 255;
}

// foundations/shadergradient/packages/shadergradient/src/utils/index.ts
function dToR(d) {
  return d / 180 * Math.PI;
}
function dToRArr(degrees) {
  return degrees.map((d) => dToR(d));
}
function formatUrlString(urlString) {
  return urlString.replace("http://localhost:3001/customize", "").replace("https://shadergradient.co/customize", "").replace("https://www.shadergradient.co/customize", "");
}
function formatFramerProps({
  position,
  rotation,
  cameraAngle,
  noise,
  canvas,
  ...rest
}) {
  const { positionX, positionY, positionZ } = position || {};
  const { rotationX, rotationY, rotationZ } = rotation || {};
  const { cAzimuthAngle, cPolarAngle } = cameraAngle || {};
  const { uDensity, uStrength } = noise || {};
  const {
    pixelDensity,
    fov,
    preserveDrawingBuffer,
    powerPreference
  } = canvas || {};
  const parsedPowerPreference = powerPreference && powerPreference !== "default" ? powerPreference : void 0;
  return {
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    cAzimuthAngle,
    cPolarAngle,
    uDensity,
    uStrength,
    pixelDensity,
    fov,
    preserveDrawingBuffer,
    powerPreference: parsedPowerPreference,
    ...rest
  };
}
function mergeCanvasProps({
  queryPixelDensity,
  queryFov,
  queryPreserveDrawingBuffer,
  queryPowerPreference,
  props,
  defaultPixelDensity = 1,
  defaultFov = 45
}) {
  const flattened = formatFramerProps(props);
  return {
    pixelDensity: queryPixelDensity ?? flattened.pixelDensity ?? props.pixelDensity ?? defaultPixelDensity,
    fov: queryFov ?? flattened.fov ?? props.fov ?? defaultFov,
    preserveDrawingBuffer: queryPreserveDrawingBuffer ?? flattened.preserveDrawingBuffer ?? props.preserveDrawingBuffer,
    powerPreference: queryPowerPreference ?? flattened.powerPreference ?? props.powerPreference
  };
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Mesh/Materials.tsx
import { useFrame } from "@react-three/fiber";
import { jsx as jsx3 } from "react/jsx-runtime";
var Materials = ({
  animate,
  range,
  rangeStart,
  rangeEnd,
  loop,
  loopDuration,
  reflection,
  uniforms,
  vertexShader,
  fragmentShader,
  onInit,
  shader
}) => {
  const localClockRef = useRef2(new THREE2.Clock());
  const material = useMemo2(() => {
    const entries = Object.entries(uniforms);
    const colors = uniforms.colors;
    const uC1 = colorToRgb(colors[0]);
    const uC2 = colorToRgb(colors[1]);
    const uC3 = colorToRgb(colors[2]);
    const rgbColors = {
      uC1r: { value: formatColor(uC1?.r) },
      uC1g: { value: formatColor(uC1?.g) },
      uC1b: { value: formatColor(uC1?.b) },
      uC2r: { value: formatColor(uC2?.r) },
      uC2g: { value: formatColor(uC2?.g) },
      uC2b: { value: formatColor(uC2?.b) },
      uC3r: { value: formatColor(uC3?.r) },
      uC3g: { value: formatColor(uC3?.g) },
      uC3b: { value: formatColor(uC3?.b) }
    };
    const uniformValues = entries.reduce((acc, [name, value]) => {
      const uniform = THREE2.UniformsUtils.clone({ [name]: { value } });
      return {
        ...acc,
        ...uniform
      };
    }, {});
    const materialConfig = {
      userData: uniformValues,
      // sync uniform and userData to update uniforms from outside (MeshPhysicalMaterial)
      metalness: shader === "glass" ? 0 : 0.2,
      roughness: shader === "glass" ? 0.1 : 1 - (typeof reflection === "number" ? reflection : 0.1),
      side: THREE2.DoubleSide,
      onBeforeCompile: (shader2) => {
        shader2.uniforms = {
          ...shader2.uniforms,
          ...uniformValues,
          ...rgbColors
        };
        shader2.vertexShader = vertexShader;
        shader2.fragmentShader = fragmentShader;
      }
      // wireframe: true,
    };
    if (shader === "glass") {
      materialConfig.transparent = true;
      materialConfig.opacity = 0.3;
      materialConfig.transmission = 0.9;
      materialConfig.thickness = 0.5;
      materialConfig.clearcoat = 1;
      materialConfig.clearcoatRoughness = 0;
      materialConfig.ior = 1.5;
      materialConfig.envMapIntensity = 1;
    }
    const material2 = new THREE2.MeshPhysicalMaterial(materialConfig);
    entries.forEach(
      ([name]) => Object.defineProperty(material2, name, {
        get: () => material2.uniforms[name].value,
        set: (v) => material2.uniforms[name].value = v
      })
    );
    if (onInit) onInit(material2);
    return material2;
  }, [uniforms, vertexShader, fragmentShader, onInit, reflection, shader]);
  useEffect3(() => {
    return () => {
      material.dispose();
    };
  }, [material]);
  useEffect3(() => {
    if (animate === "on") {
      localClockRef.current.start();
    } else {
      localClockRef.current.stop();
    }
  }, [animate]);
  useFrame(() => {
    if (animate === "on" && material.userData.uTime) {
      let elapsed = localClockRef.current.getElapsedTime();
      if (loop === "on" && Number.isFinite(loopDuration) && loopDuration > 0) {
        elapsed = elapsed % loopDuration;
        if (material.userData.uLoop) {
          material.userData.uLoop.value = 1;
        }
        if (material.userData.uLoopDuration) {
          material.userData.uLoopDuration.value = loopDuration;
        }
      } else {
        if (material.userData.uLoop) {
          material.userData.uLoop.value = 0;
        }
        if (range === "enabled" && Number.isFinite(rangeStart) && Number.isFinite(rangeEnd) && rangeEnd > rangeStart) {
          elapsed = rangeStart + elapsed;
          if (elapsed >= rangeEnd) {
            elapsed = rangeStart;
            localClockRef.current.start();
          }
        }
      }
      material.userData.uTime.value = elapsed;
    }
  });
  return /* @__PURE__ */ jsx3("primitive", { attach: "material", object: material });
};

// foundations/shadergradient/packages/shadergradient/src/shaders/index.ts
var shaders_exports = {};
__export(shaders_exports, {
  cosmic: () => cosmic_exports,
  defaults: () => defaults_exports,
  glass: () => glass_exports,
  positionMix: () => positionMix_exports
});

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/index.ts
var defaults_exports = {};
__export(defaults_exports, {
  plane: () => plane_exports,
  sphere: () => sphere_exports,
  waterPlane: () => waterPlane_exports
});

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/plane/index.ts
var plane_exports = {};
__export(plane_exports, {
  fragment: () => fragment_default,
  vertex: () => vertex_default
});

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/plane/fragment.glsl
var fragment_default = "\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n// #include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment\n// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\n\nuniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\n\nvarying vec3 color1;\nvarying vec3 color2;\nvarying vec3 color3;\n\n// for npm package, need to add this manually\nfloat linearToRelativeLuminance2( const in vec3 color ) {\n    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n    return dot( weights, color.rgb );\n}\n\nvoid main() {\n\n  //-------- basic gradient ------------\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n  float clearcoat = 1.0;\n  float clearcoatRoughness = 0.5;\n\n  #include <clipping_planes_fragment>\n\n  vec4 diffuseColor = vec4(\n      mix(mix(color1, color2, smoothstep(-3.0, 3.0, vPos.x)), color3, vPos.z),\n      1);\n  // diffuseColor\uB294 \uC624\uBE0C\uC81D\uD2B8\uC758 \uBCA0\uC774\uC2A4 \uC0C9\uC0C1 (\uD658\uACBD\uC774\uB098 \uBE5B\uC774 \uACE0\uB824\uB418\uC9C0 \uC54A\uC740 \uBCF8\uC5F0\uC758\n  // \uC0C9)\n\n  // mix(x, y, a): a\uB97C \uCD95\uC73C\uB85C \uD588\uC744 \uB54C \uAC00\uC7A5 \uB0AE\uC740 \uAC12\uC5D0\uC11C x\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%, \uAC00\uC7A5\n  // \uB192\uC740 \uAC12\uC5D0\uC11C y\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%\uB85C \uB9CC\uB4E0\uB2E4. smoothstep(x, y, a): a\uCD95\uC744\n  // \uAE30\uC900\uC73C\uB85C x\uB97C \uCD5C\uC18C\uAC12, y\uB97C \uCD5C\uB300\uAC12\uC73C\uB85C \uADF8 \uC0AC\uC774\uC758 \uAC12\uC744 \uCABC\uAC20\uB2E4. x\uC640 y \uC0AC\uC774\uB97C\n  // 0-100 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uCC98\uB7FC \uB2E8\uACC4\uBCC4\uB85C \uD45C\uD604\uD558\uACE0, x \uBBF8\uB9CC\uC758 \uAC12\uC740 0, y \uC774\uC0C1\uC758\n  // \uAC12\uC740 100\uC73C\uB85C \uCC98\uB9AC\n\n  // 1. smoothstep(-3.0, 3.0,vPos.x)\uB85C x\uCD95\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uD45C\uD604 \uB420 \uBC94\uC704\uB97C -3,\n  // 3\uC73C\uB85C \uC815\uD55C\uB2E4.\n  // 2. mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x))\uB85C color1\uACFC color3\uC744\n  // \uC704\uC758 \uBC94\uC704 \uC548\uC5D0\uC11C \uADF8\uB77C\uB514\uC5B8\uD2B8\uB85C \uD45C\uD604\uD55C\uB2E4.\n  // \uC608\uB97C \uB4E4\uC5B4 color1\uC774 \uB178\uB791, color3\uC774 \uD30C\uB791\uC774\uB77C\uACE0 \uCE58\uBA74, x\uCD95 \uAE30\uC900 -3\uBD80\uD130 3\uAE4C\uC9C0\n  // \uB178\uB791\uACFC \uD30C\uB791 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uB098\uD0C0\uB098\uACE0, -3\uBCF4\uB2E4 \uC791\uC740 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uB178\uB791,\n  // 3\uBCF4\uB2E4 \uD070 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uD30C\uB791\uC774 \uB098\uD0C0\uB09C\uB2E4.\n  // 3. mix()\uB97C \uD55C \uBC88 \uB354 \uC0AC\uC6A9\uD574\uC11C \uC704\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uC640 color2\uB97C z\uCD95 \uAE30\uC900\uC73C\uB85C\n  // \uBD84\uBC30\uD55C\uB2E4.\n\n  //-------- materiality ------------\n  ReflectedLight reflectedLight =\n      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive;\n\n  #ifdef TRANSMISSION\n    float totalTransmission = transmission;\n  #endif\n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n  #include <color_fragment>\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <roughnessmap_fragment>\n  #include <metalnessmap_fragment>\n  #include <normal_fragment_begin>\n  #include <normal_fragment_maps>\n  #include <clearcoat_normal_fragment_begin>\n  #include <clearcoat_normal_fragment_maps>\n  #include <emissivemap_fragment>\n  // #include <transmissionmap_fragment>\n  #include <lights_physical_fragment>\n  #include <lights_fragment_begin>\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n  #include <aomap_fragment>\n    vec3 outgoingLight =\n        reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +\n        reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n    //\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.\n  #ifdef TRANSMISSION\n    diffuseColor.a *=\n        mix(saturate(1. - totalTransmission +\n                    linearToRelativeLuminance2(reflectedLight.directSpecular +\n                                              reflectedLight.indirectSpecular)),\n            1.0, metalness);\n  #endif\n\n\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n\n\n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C\n  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.\n  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),\n  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD\n  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/plane/vertex.glsl
var vertex_default = "// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) \n\n// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n//-------- start here ------------\n\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\n\nvarying vec2 vUv;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uLoop;\nuniform float uLoopDuration;\n\nuniform float uLoadingTime;\n\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvoid main() {\n\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- start vertex ------------\n  vUv = uv;\n\n  float t = uTime * uSpeed;\n  \n  // For seamless loops, sample noise using 4D-like circular interpolation\n  vec3 noisePos = 0.43 * position * uNoiseDensity;\n  float distortion;\n  \n  if (uLoop > 0.5) {\n    // Create truly dynamic seamless loop using 4D noise simulation\n    // Loop progress only depends on time and duration, not speed\n    float loopProgress = uTime / uLoopDuration;\n    float angle = loopProgress * 6.28318530718; // 2*PI\n    \n    // Radius scales with speed to maintain consistent visual speed\n    // Larger radius = more distance traveled = faster perceived motion\n    float radius = 5.0 * uSpeed;\n    \n    // Sample 4 noise values at cardinal points around the circle\n    vec3 offset0 = vec3(cos(angle) * radius, sin(angle) * radius, 0.0);\n    vec3 offset1 = vec3(cos(angle + 1.57079632679) * radius, sin(angle + 1.57079632679) * radius, 0.0);\n    vec3 offset2 = vec3(cos(angle + 3.14159265359) * radius, sin(angle + 3.14159265359) * radius, 0.0);\n    vec3 offset3 = vec3(cos(angle + 4.71238898038) * radius, sin(angle + 4.71238898038) * radius, 0.0);\n    \n    // Get noise at all 4 points\n    float n0 = cnoise(noisePos + offset0);\n    float n1 = cnoise(noisePos + offset1);\n    float n2 = cnoise(noisePos + offset2);\n    float n3 = cnoise(noisePos + offset3);\n    \n    // Smooth interpolation weights using cosine\n    float w0 = (cos(angle) + 1.0) * 0.5;\n    float w1 = (cos(angle + 1.57079632679) + 1.0) * 0.5;\n    float w2 = (cos(angle + 3.14159265359) + 1.0) * 0.5;\n    float w3 = (cos(angle + 4.71238898038) + 1.0) * 0.5;\n    \n    // Normalize weights\n    float totalWeight = w0 + w1 + w2 + w3;\n    w0 /= totalWeight;\n    w1 /= totalWeight;\n    w2 /= totalWeight;\n    w3 /= totalWeight;\n    \n    // Blend all samples with amplitude boost to match single-sample strength\n    // Blending reduces amplitude by ~30%, so we compensate\n    float blendedNoise = n0 * w0 + n1 * w1 + n2 * w2 + n3 * w3;\n    distortion = 0.75 * blendedNoise * 1.5;\n  } else {\n    // Normal linear time progression\n    distortion = 0.75 * cnoise(noisePos + t);\n  }\n\n  vec3 pos = position + normal * distortion * uNoiseStrength * uLoadingTime;\n  vPos = pos;\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/sphere/index.ts
var sphere_exports = {};
__export(sphere_exports, {
  fragment: () => fragment_default2,
  vertex: () => vertex_default2
});

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/sphere/fragment.glsl
var fragment_default2 = "\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n// #include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment\n// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\nuniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\nvarying vec3 color1;\nvarying vec3 color2;\nvarying vec3 color3;\nvarying float distanceToCenter;\n\n\n// for npm package, need to add this manually\n// 'linearToRelativeLuminance' : function already has a body\nfloat linearToRelativeLuminance2( const in vec3 color ) {\n    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n    return dot( weights, color.rgb );\n}\n\nvoid main() {\n  //-------- basic gradient ------------\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n  float clearcoat = 1.0;\n  float clearcoatRoughness = 0.5;\n#include <clipping_planes_fragment>\n\n  float distanceToCenter = distance(vPos, vec3(0, 0, 0));\n  // distanceToCenter\uB85C \uC911\uC2EC\uC810\uACFC\uC758 \uAC70\uB9AC\uB97C \uAD6C\uD568.\n\n  vec4 diffuseColor =\n      vec4(mix(color3, mix(color2, color1, smoothstep(-1.0, 1.0, vPos.y)),\n               distanceToCenter),\n           1);\n\n  //-------- materiality ------------\n  ReflectedLight reflectedLight =\n      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive;\n#ifdef TRANSMISSION\n  float totalTransmission = transmission;\n#endif\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <roughnessmap_fragment>\n#include <metalnessmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <clearcoat_normal_fragment_begin>\n#include <clearcoat_normal_fragment_maps>\n#include <emissivemap_fragment>\n// #include <transmissionmap_fragment>\n#include <lights_physical_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\n  vec3 outgoingLight =\n      reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +\n      reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n//\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.\n#ifdef TRANSMISSION\n  diffuseColor.a *=\n      mix(saturate(1. - totalTransmission +\n                   linearToRelativeLuminance2(reflectedLight.directSpecular +\n                                             reflectedLight.indirectSpecular)),\n          1.0, metalness);\n#endif\n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C\n  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.\n  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),\n  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD\n  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.\n\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/sphere/vertex.glsl
var vertex_default2 = "// #pragma glslify: pnoise = require(glsl-noise/periodic/3d)\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n\n//-------- start here ------------\n\nvarying vec3 vNormal;\nuniform float uTime;\nuniform float uSpeed;\nuniform float uLoop;\nuniform float uLoopDuration;\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\nuniform float uFrequency;\nuniform float uAmplitude;\nvarying vec3 vPos;\nvarying float vDistort;\nvarying vec2 vUv;\nvarying vec3 vViewPosition;\n\n#define STANDARD\n#ifndef FLAT_SHADED\n  #ifdef USE_TANGENT\n    varying vec3 vTangent;\n    varying vec3 vBitangent;\n  #endif\n#endif\n\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\n\n// rotation\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\n\nvoid main() {\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- start vertex ------------\n  float t = uTime * uSpeed;\n  \n  // For seamless loops, sample noise using 4D-like circular interpolation\n  float distortion;\n  float angle;\n  \n  if (uLoop > 0.5) {\n    // Create truly dynamic seamless loop using 4D noise simulation\n    float loopProgress = uTime / uLoopDuration;\n    float loopAngle = loopProgress * 6.28318530718; // 2*PI\n    \n    // Radius scales with speed to maintain consistent visual speed\n    float radius = 5.0 * uSpeed;\n    \n    // Sample 4 noise values at cardinal points\n    vec3 offset0 = vec3(cos(loopAngle) * radius, sin(loopAngle) * radius, 0.0);\n    vec3 offset1 = vec3(cos(loopAngle + 1.57079632679) * radius, sin(loopAngle + 1.57079632679) * radius, 0.0);\n    vec3 offset2 = vec3(cos(loopAngle + 3.14159265359) * radius, sin(loopAngle + 3.14159265359) * radius, 0.0);\n    vec3 offset3 = vec3(cos(loopAngle + 4.71238898038) * radius, sin(loopAngle + 4.71238898038) * radius, 0.0);\n    \n    // Get noise at all 4 points\n    float n0 = pnoise((normal + offset0) * uNoiseDensity, vec3(10.0));\n    float n1 = pnoise((normal + offset1) * uNoiseDensity, vec3(10.0));\n    float n2 = pnoise((normal + offset2) * uNoiseDensity, vec3(10.0));\n    float n3 = pnoise((normal + offset3) * uNoiseDensity, vec3(10.0));\n    \n    // Smooth interpolation weights\n    float w0 = (cos(loopAngle) + 1.0) * 0.5;\n    float w1 = (cos(loopAngle + 1.57079632679) + 1.0) * 0.5;\n    float w2 = (cos(loopAngle + 3.14159265359) + 1.0) * 0.5;\n    float w3 = (cos(loopAngle + 4.71238898038) + 1.0) * 0.5;\n    \n    float totalWeight = w0 + w1 + w2 + w3;\n    w0 /= totalWeight;\n    w1 /= totalWeight;\n    w2 /= totalWeight;\n    w3 /= totalWeight;\n    \n    // Blend samples with amplitude boost to match single-sample strength\n    float blendedNoise = n0 * w0 + n1 * w1 + n2 * w2 + n3 * w3;\n    distortion = blendedNoise * 1.5 * uNoiseStrength;\n    \n    // Apply loop to spiral effect with blended offset\n    float angleOffset = offset0.x * w0 + offset1.x * w1 + offset2.x * w2 + offset3.x * w3;\n    angle = sin(uv.y * uFrequency + angleOffset) * uAmplitude;\n  } else {\n    // Normal linear time progression\n    distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;\n    angle = sin(uv.y * uFrequency + t) * uAmplitude;\n  }\n  \n  vec3 pos = position + (normal * distortion);\n  pos = rotateY(pos, angle);\n\n  vPos = pos;\n  vDistort = distortion;\n  vNormal = normal;\n  vUv = uv;\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/waterPlane/index.ts
var waterPlane_exports = {};
__export(waterPlane_exports, {
  fragment: () => fragment_default3,
  vertex: () => vertex_default3
});

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/waterPlane/fragment.glsl
var fragment_default3 = "\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n// #include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment\n// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\n\nuniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\n\nvarying vec3 color1;\nvarying vec3 color2;\nvarying vec3 color3;\n\n// for npm package, need to add this manually\n// 'linearToRelativeLuminance' : function already has a body\nfloat linearToRelativeLuminance2( const in vec3 color ) {\n    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n    return dot( weights, color.rgb );\n}\n\nvoid main() {\n\n  //-------- basic gradient ------------\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n  float clearcoat = 1.0;\n  float clearcoatRoughness = 0.5;\n\n  #include <clipping_planes_fragment>\n\n  vec4 diffuseColor = vec4(\n      mix(mix(color1, color2, smoothstep(-3.0, 3.0, vPos.x)), color3, vPos.z),\n      1);\n  // diffuseColor\uB294 \uC624\uBE0C\uC81D\uD2B8\uC758 \uBCA0\uC774\uC2A4 \uC0C9\uC0C1 (\uD658\uACBD\uC774\uB098 \uBE5B\uC774 \uACE0\uB824\uB418\uC9C0 \uC54A\uC740 \uBCF8\uC5F0\uC758\n  // \uC0C9)\n\n  // mix(x, y, a): a\uB97C \uCD95\uC73C\uB85C \uD588\uC744 \uB54C \uAC00\uC7A5 \uB0AE\uC740 \uAC12\uC5D0\uC11C x\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%, \uAC00\uC7A5\n  // \uB192\uC740 \uAC12\uC5D0\uC11C y\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%\uB85C \uB9CC\uB4E0\uB2E4. smoothstep(x, y, a): a\uCD95\uC744\n  // \uAE30\uC900\uC73C\uB85C x\uB97C \uCD5C\uC18C\uAC12, y\uB97C \uCD5C\uB300\uAC12\uC73C\uB85C \uADF8 \uC0AC\uC774\uC758 \uAC12\uC744 \uCABC\uAC20\uB2E4. x\uC640 y \uC0AC\uC774\uB97C\n  // 0-100 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uCC98\uB7FC \uB2E8\uACC4\uBCC4\uB85C \uD45C\uD604\uD558\uACE0, x \uBBF8\uB9CC\uC758 \uAC12\uC740 0, y \uC774\uC0C1\uC758\n  // \uAC12\uC740 100\uC73C\uB85C \uCC98\uB9AC\n\n  // 1. smoothstep(-3.0, 3.0,vPos.x)\uB85C x\uCD95\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uD45C\uD604 \uB420 \uBC94\uC704\uB97C -3,\n  // 3\uC73C\uB85C \uC815\uD55C\uB2E4.\n  // 2. mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x))\uB85C color1\uACFC color3\uC744\n  // \uC704\uC758 \uBC94\uC704 \uC548\uC5D0\uC11C \uADF8\uB77C\uB514\uC5B8\uD2B8\uB85C \uD45C\uD604\uD55C\uB2E4.\n  // \uC608\uB97C \uB4E4\uC5B4 color1\uC774 \uB178\uB791, color3\uC774 \uD30C\uB791\uC774\uB77C\uACE0 \uCE58\uBA74, x\uCD95 \uAE30\uC900 -3\uBD80\uD130 3\uAE4C\uC9C0\n  // \uB178\uB791\uACFC \uD30C\uB791 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uB098\uD0C0\uB098\uACE0, -3\uBCF4\uB2E4 \uC791\uC740 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uB178\uB791,\n  // 3\uBCF4\uB2E4 \uD070 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uD30C\uB791\uC774 \uB098\uD0C0\uB09C\uB2E4.\n  // 3. mix()\uB97C \uD55C \uBC88 \uB354 \uC0AC\uC6A9\uD574\uC11C \uC704\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uC640 color2\uB97C z\uCD95 \uAE30\uC900\uC73C\uB85C\n  // \uBD84\uBC30\uD55C\uB2E4.\n\n  //-------- materiality ------------\n  ReflectedLight reflectedLight =\n      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive;\n\n  #ifdef TRANSMISSION\n    float totalTransmission = transmission;\n  #endif\n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n  #include <color_fragment>\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <roughnessmap_fragment>\n  #include <metalnessmap_fragment>\n  #include <normal_fragment_begin>\n  #include <normal_fragment_maps>\n  #include <clearcoat_normal_fragment_begin>\n  #include <clearcoat_normal_fragment_maps>\n  #include <emissivemap_fragment>\n  // #include <transmissionmap_fragment>\n  #include <lights_physical_fragment>\n  #include <lights_fragment_begin>\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n  #include <aomap_fragment>\n    vec3 outgoingLight =\n        reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +\n        reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n    //\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.\n  #ifdef TRANSMISSION\n    diffuseColor.a *=\n        mix(saturate(1. - totalTransmission +\n                    linearToRelativeLuminance2(reflectedLight.directSpecular +\n                                              reflectedLight.indirectSpecular)),\n            1.0, metalness);\n  #endif\n\n\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n\n\n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C\n  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.\n  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),\n  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD\n  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/defaults/waterPlane/vertex.glsl
var vertex_default3 = "// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) \nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n//-------- start here ------------\n\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uLoop;\nuniform float uLoopDuration;\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvoid main() {\n\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- start vertex ------------\n  float t = uTime * uSpeed;\n  \n  // For seamless loops, sample noise using 4D-like circular interpolation\n  vec3 noisePos = 0.43 * position * uNoiseDensity;\n  float distortion;\n  \n  if (uLoop > 0.5) {\n    // Create truly dynamic seamless loop using 4D noise simulation\n    float loopProgress = uTime / uLoopDuration;\n    float angle = loopProgress * 6.28318530718; // 2*PI\n    \n    // Radius scales with speed to maintain consistent visual speed\n    float radius = 5.0 * uSpeed;\n    \n    // Sample 4 noise values at cardinal points\n    vec3 offset0 = vec3(cos(angle) * radius, sin(angle) * radius, 0.0);\n    vec3 offset1 = vec3(cos(angle + 1.57079632679) * radius, sin(angle + 1.57079632679) * radius, 0.0);\n    vec3 offset2 = vec3(cos(angle + 3.14159265359) * radius, sin(angle + 3.14159265359) * radius, 0.0);\n    vec3 offset3 = vec3(cos(angle + 4.71238898038) * radius, sin(angle + 4.71238898038) * radius, 0.0);\n    \n    // Get noise at all 4 points\n    float n0 = cnoise(noisePos + offset0);\n    float n1 = cnoise(noisePos + offset1);\n    float n2 = cnoise(noisePos + offset2);\n    float n3 = cnoise(noisePos + offset3);\n    \n    // Smooth interpolation weights\n    float w0 = (cos(angle) + 1.0) * 0.5;\n    float w1 = (cos(angle + 1.57079632679) + 1.0) * 0.5;\n    float w2 = (cos(angle + 3.14159265359) + 1.0) * 0.5;\n    float w3 = (cos(angle + 4.71238898038) + 1.0) * 0.5;\n    \n    float totalWeight = w0 + w1 + w2 + w3;\n    w0 /= totalWeight;\n    w1 /= totalWeight;\n    w2 /= totalWeight;\n    w3 /= totalWeight;\n    \n    // Blend samples with amplitude boost to match single-sample strength\n    float blendedNoise = n0 * w0 + n1 * w1 + n2 * w2 + n3 * w3;\n    distortion = 0.75 * blendedNoise * 1.5;\n  } else {\n    // Normal linear time progression\n    distortion = 0.75 * cnoise(noisePos + t);\n  }\n\n  vec3 pos = position + normal * distortion * uNoiseStrength;\n  vPos = pos;\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/index.ts
var positionMix_exports = {};
__export(positionMix_exports, {
  plane: () => plane_exports2,
  sphere: () => sphere_exports2,
  waterPlane: () => waterPlane_exports2
});

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/plane/index.ts
var plane_exports2 = {};
__export(plane_exports2, {
  fragment: () => fragment_default4,
  vertex: () => vertex_default4
});

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/plane/fragment.glsl
var fragment_default4 = "uniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\n\n\nvarying vec3 vNormal;\nvarying vec3 vPos;\n\nvoid main() {\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n\n  gl_FragColor = vec4(color1 * vPos.x + color2 * vPos.y + color3 * vPos.z, 1.);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/plane/vertex.glsl
var vertex_default4 = "// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) \n\n// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n//-------- start here ------------\n\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\n\nvarying vec2 vUv;\n\nuniform float uTime;\nuniform float uSpeed;\n\nuniform float uLoadingTime;\n\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvoid main() {\n\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- start vertex ------------\n  vUv = uv;\n\n  // vNormal = normal;\n\n  float t = uTime * uSpeed;\n  // Create a sine wave from top to bottom of the sphere\n  float distortion = 0.75 * cnoise(0.43 * position * uNoiseDensity + t);\n\n  vec3 pos = position + normal * distortion * uNoiseStrength * uLoadingTime;\n  vPos = pos;\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/sphere/index.ts
var sphere_exports2 = {};
__export(sphere_exports2, {
  fragment: () => fragment_default5,
  vertex: () => vertex_default5
});

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/sphere/fragment.glsl
var fragment_default5 = "\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n// #include <transmissionmap_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment\n// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\nuniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\nvarying vec3 color1;\nvarying vec3 color2;\nvarying vec3 color3;\nvarying float distanceToCenter;\nvoid main() {\n  //-------- basic gradient ------------\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n  float clearcoat = 1.0;\n  float clearcoatRoughness = 0.5;\n#include <clipping_planes_fragment>\n\n  float distanceToCenter = distance(vPos, vec3(0, 0, 0));\n  // distanceToCenter\uB85C \uC911\uC2EC\uC810\uACFC\uC758 \uAC70\uB9AC\uB97C \uAD6C\uD568.\n\n  vec4 diffuseColor =\n      vec4(mix(color3, mix(color2, color1, smoothstep(-1.0, 1.0, vPos.y)),\n               distanceToCenter),\n           1);\n\n  //-------- materiality ------------\n  ReflectedLight reflectedLight =\n      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive;\n#ifdef TRANSMISSION\n  float totalTransmission = transmission;\n#endif\n#include <logdepthbuf_fragment>\n#include <map_fragment>\n#include <color_fragment>\n#include <alphamap_fragment>\n#include <alphatest_fragment>\n#include <roughnessmap_fragment>\n#include <metalnessmap_fragment>\n#include <normal_fragment_begin>\n#include <normal_fragment_maps>\n#include <clearcoat_normal_fragment_begin>\n#include <clearcoat_normal_fragment_maps>\n#include <emissivemap_fragment>\n// #include <transmissionmap_fragment>\n#include <lights_physical_fragment>\n#include <lights_fragment_begin>\n#include <lights_fragment_maps>\n#include <lights_fragment_end>\n#include <aomap_fragment>\n  vec3 outgoingLight =\n      reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +\n      reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n//\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.\n#ifdef TRANSMISSION\n  diffuseColor.a *=\n      mix(saturate(1. - totalTransmission +\n                   linearToRelativeLuminance(reflectedLight.directSpecular +\n                                             reflectedLight.indirectSpecular)),\n          1.0, metalness);\n#endif\n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C\n  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.\n  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),\n  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD\n  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.\n\n#include <tonemapping_fragment>\n#include <encodings_fragment>\n#include <fog_fragment>\n#include <premultiplied_alpha_fragment>\n#include <dithering_fragment>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/sphere/vertex.glsl
var vertex_default5 = "// #pragma glslify: pnoise = require(glsl-noise/periodic/3d)\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n\n//-------- start here ------------\n\nvarying vec3 vNormal;\nuniform float uTime;\nuniform float uSpeed;\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\nuniform float uFrequency;\nuniform float uAmplitude;\nvarying vec3 vPos;\nvarying float vDistort;\nvarying vec2 vUv;\nvarying vec3 vViewPosition;\n\n#define STANDARD\n#ifndef FLAT_SHADED\n  #ifdef USE_TANGENT\n    varying vec3 vTangent;\n    varying vec3 vBitangent;\n  #endif\n#endif\n\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\n\n// rotation\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\n\nvoid main() {\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- start vertex ------------\n  float t = uTime * uSpeed;\n  float distortion =\n      pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;\n  vec3 pos = position + (normal * distortion);\n  float angle = sin(uv.y * uFrequency + t) * uAmplitude;\n  pos = rotateY(pos, angle);\n\n  vPos = pos;\n  vDistort = distortion;\n  vNormal = normal;\n  vUv = uv;\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/waterPlane/index.ts
var waterPlane_exports2 = {};
__export(waterPlane_exports2, {
  fragment: () => fragment_default6,
  vertex: () => vertex_default6
});

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/waterPlane/fragment.glsl
var fragment_default6 = "uniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\n\n\nvarying vec3 vNormal;\nvarying vec3 vPos;\n\nvoid main() {\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n\n  gl_FragColor = vec4(color1 * vPos.x + color2 * vPos.y + color3 * vPos.z, 1.);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/positionMix/waterPlane/vertex.glsl
var vertex_default6 = "// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) \n\n// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n//-------- start here ------------\n\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\n\nvarying vec2 vUv;\n\nuniform float uTime;\nuniform float uSpeed;\n\nuniform float uLoadingTime;\n\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvoid main() {\n\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- start vertex ------------\n  vUv = uv;\n\n  // vNormal = normal;\n\n  float t = uTime * uSpeed;\n  // Create a sine wave from top to bottom of the sphere\n  float distortion = 0.75 * cnoise(0.43 * position * uNoiseDensity + t);\n\n  vec3 pos = position + normal * distortion * uNoiseStrength * uLoadingTime;\n  vPos = pos;\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/index.ts
var cosmic_exports = {};
__export(cosmic_exports, {
  plane: () => plane_exports3,
  sphere: () => sphere_exports3,
  waterPlane: () => waterPlane_exports3
});

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/plane/index.ts
var plane_exports3 = {};
__export(plane_exports3, {
  fragment: () => fragment_default7,
  vertex: () => vertex_default7
});

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/plane/fragment.glsl
var fragment_default7 = "// Cosmic Plane Fragment Shader - Holographic Gradient\n\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\nvarying vec2 vUv;\nvarying float vHolographicIntensity;\nvarying float vCosmicWave;\n\nuniform float uTime;\nuniform float uSpeed;\n\nuniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\n\n// Holographic helper functions\nfloat hash(vec2 p) {\n    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);\n}\n\nfloat noise2D(vec2 p) {\n    vec2 i = floor(p);\n    vec2 f = fract(p);\n    vec2 u = f * f * (3.0 - 2.0 * f);\n    \n    return mix(mix(hash(i + vec2(0.0, 0.0)), \n                   hash(i + vec2(1.0, 0.0)), u.x),\n               mix(hash(i + vec2(0.0, 1.0)), \n                   hash(i + vec2(1.0, 1.0)), u.x), u.y);\n}\n\n// for npm package, need to add this manually\nfloat linearToRelativeLuminance2( const in vec3 color ) {\n    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n    return dot( weights, color.rgb );\n}\n\nvoid main() {\n\n  //-------- Cosmic Holographic Gradient ------------\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n  \n  float clearcoat = 1.0;\n  float clearcoatRoughness = 0.2; // More reflective for holographic effect\n\n  #include <clipping_planes_fragment>\n\n  float t = uTime * uSpeed;\n  \n  // Create holographic interference patterns\n  float interference1 = sin(vPos.x * 20.0 + t * 3.0) * cos(vPos.y * 15.0 + t * 2.0);\n  float interference2 = sin(vPos.x * 35.0 + t * 4.0) * sin(vPos.y * 30.0 + t * 3.5);\n  float interference3 = cos(vPos.x * 50.0 + t * 5.0) * cos(vPos.y * 45.0 + t * 4.5);\n  \n  // Combine interference patterns\n  float holographicPattern = (interference1 + interference2 * 0.5 + interference3 * 0.25) / 1.75;\n  \n  // Create cosmic shimmer effect\n  float shimmer = noise2D(vPos.xy * 40.0 + t * 2.0) * 0.3;\n  float cosmicGlow = noise2D(vPos.xy * 8.0 + t * 0.5) * 0.5;\n  \n  // Holographic color shifting\n  vec3 holographicShift = vec3(\n    sin(vPos.x * 10.0 + t * 2.0 + 0.0) * 0.1,\n    sin(vPos.x * 10.0 + t * 2.0 + 2.094) * 0.1,  // 120 degrees\n    sin(vPos.x * 10.0 + t * 2.0 + 4.188) * 0.1   // 240 degrees\n  );\n  \n  // Enhanced gradient mixing with cosmic effects\n  float gradientX = smoothstep(-4.0, 4.0, vPos.x + holographicPattern * 2.0);\n  float gradientY = smoothstep(-4.0, 4.0, vPos.y + vCosmicWave * 1.5);\n  float gradientZ = smoothstep(-2.0, 2.0, vPos.z + shimmer);\n  \n  // Multi-layer color mixing for depth\n  vec3 baseGradient = mix(\n    mix(color1, color2, gradientX), \n    color3, \n    gradientY * 0.7 + gradientZ * 0.3\n  );\n  \n  // Apply holographic color shifts\n  vec3 holographicColor = baseGradient + holographicShift;\n  \n  // Add cosmic glow and shimmer\n  vec3 cosmicEnhancement = vec3(\n    cosmicGlow * 0.2,\n    shimmer * 0.15,\n    (cosmicGlow + shimmer) * 0.1\n  );\n  \n  // Holographic intensity modulation\n  float intensityMod = 1.0 + vHolographicIntensity * 0.5 + abs(holographicPattern) * 0.3;\n  \n  // Final color with cosmic and holographic effects\n  vec3 finalColor = (holographicColor + cosmicEnhancement) * intensityMod;\n  \n  // Add subtle iridescence\n  float iridescence = sin(vPos.x * 25.0 + t * 3.0) * cos(vPos.y * 20.0 + t * 2.5) * 0.1;\n  finalColor += vec3(iridescence * 0.2, iridescence * 0.3, iridescence * 0.4);\n\n  vec4 diffuseColor = vec4(finalColor, 1.0);\n\n  //-------- Enhanced Materiality for Holographic Effect ------------\n  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive + finalColor * 0.1; // Add some emission for glow\n\n  #ifdef TRANSMISSION\n    float totalTransmission = transmission;\n  #endif\n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n  #include <color_fragment>\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <roughnessmap_fragment>\n  #include <metalnessmap_fragment>\n  #include <normal_fragment_begin>\n  #include <normal_fragment_maps>\n  #include <clearcoat_normal_fragment_begin>\n  #include <clearcoat_normal_fragment_maps>\n  #include <emissivemap_fragment>\n  #include <lights_physical_fragment>\n  #include <lights_fragment_begin>\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n  #include <aomap_fragment>\n  \n  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +\n                      reflectedLight.directSpecular + reflectedLight.indirectSpecular +\n                      totalEmissiveRadiance;\n\n  #ifdef TRANSMISSION\n    diffuseColor.a *= mix(saturate(1. - totalTransmission +\n                        linearToRelativeLuminance2(reflectedLight.directSpecular +\n                                                  reflectedLight.indirectSpecular)),\n                1.0, metalness);\n  #endif\n\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n\n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/plane/vertex.glsl
var vertex_default7 = "// Cosmic Plane Vertex Shader - Holographic Effect\n// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) \n\n// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n//-------- Holographic Effect Functions ------------\n\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nmat3 rotation3dX(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\nvec3 rotateX(vec3 v, float angle) { return rotation3dX(angle) * v; }\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\nvarying vec2 vUv;\nvarying float vHolographicIntensity;\nvarying float vCosmicWave;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uLoadingTime;\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvoid main() {\n\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- Cosmic Holographic Effect ------------\n  vUv = uv;\n  \n  float t = uTime * uSpeed;\n  \n  // Create holographic interference patterns\n  float holographicPattern = sin(position.x * 15.0 + t * 2.0) * \n                            sin(position.y * 12.0 + t * 1.5) * 0.1;\n  \n  // Cosmic wave distortion\n  float cosmicWave = cnoise(position * uNoiseDensity * 0.5 + vec3(t * 0.3, t * 0.2, t * 0.4));\n  vCosmicWave = cosmicWave;\n  \n  // Multi-layer noise for depth\n  float noise1 = cnoise(position * uNoiseDensity * 2.0 + t * 0.8);\n  float noise2 = cnoise(position * uNoiseDensity * 0.3 + t * 0.2) * 0.5;\n  float noise3 = cnoise(position * uNoiseDensity * 4.0 + t * 1.2) * 0.25;\n  \n  float combinedNoise = noise1 + noise2 + noise3;\n  \n  // Holographic shimmer effect\n  float shimmer = sin(position.x * 30.0 + t * 4.0) * \n                  cos(position.y * 25.0 + t * 3.0) * 0.05;\n  \n  // Calculate holographic intensity for fragment shader\n  vHolographicIntensity = abs(holographicPattern) + abs(shimmer) * 2.0;\n  \n  // Apply displacement with holographic and cosmic effects\n  float totalDisplacement = (combinedNoise + holographicPattern + shimmer) * uNoiseStrength * uLoadingTime;\n  \n  vec3 pos = position + normal * totalDisplacement;\n  vPos = pos;\n  \n  // Add subtle rotation effect for cosmic feel\n  pos = rotateY(pos, sin(t * 0.1) * 0.05);\n  pos = rotateX(pos, cos(t * 0.07) * 0.03);\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/sphere/index.ts
var sphere_exports3 = {};
__export(sphere_exports3, {
  fragment: () => fragment_default8,
  vertex: () => vertex_default8
});

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/sphere/fragment.glsl
var fragment_default8 = "// Cosmic Sphere Fragment Shader - Nebula Particle Effect\n\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\nvarying vec2 vUv;\nvarying float vNebulaIntensity;\nvarying float vParticleDensity;\nvarying vec3 vCosmicSwirl;\n\nuniform float uTime;\nuniform float uSpeed;\n\nuniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\n\n// Nebula helper functions\nfloat hash(vec2 p) {\n    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);\n}\n\nfloat noise2D(vec2 p) {\n    vec2 i = floor(p);\n    vec2 f = fract(p);\n    vec2 u = f * f * (3.0 - 2.0 * f);\n    \n    return mix(mix(hash(i + vec2(0.0, 0.0)), \n                   hash(i + vec2(1.0, 0.0)), u.x),\n               mix(hash(i + vec2(0.0, 1.0)), \n                   hash(i + vec2(1.0, 1.0)), u.x), u.y);\n}\n\n// Fractal Brownian Motion for complex nebula patterns\nfloat fbm(vec2 p) {\n    float value = 0.0;\n    float amplitude = 0.5;\n    float frequency = 1.0;\n    \n    for(int i = 0; i < 5; i++) {\n        value += amplitude * noise2D(p * frequency);\n        amplitude *= 0.5;\n        frequency *= 2.0;\n    }\n    return value;\n}\n\n// Star field generation\nfloat stars(vec2 p, float density) {\n    vec2 n = floor(p * density);\n    vec2 f = fract(p * density);\n    \n    float d = 1.0;\n    for(int i = -1; i <= 1; i++) {\n        for(int j = -1; j <= 1; j++) {\n            vec2 g = vec2(float(i), float(j));\n            vec2 o = hash(n + g) * vec2(1.0);\n            vec2 r = g + o - f;\n            d = min(d, dot(r, r));\n        }\n    }\n    \n    return 1.0 - smoothstep(0.0, 0.02, sqrt(d));\n}\n\n// for npm package, need to add this manually\nfloat linearToRelativeLuminance2( const in vec3 color ) {\n    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n    return dot( weights, color.rgb );\n}\n\nvoid main() {\n\n  //-------- Cosmic Nebula Gradient ------------\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n  \n  float clearcoat = 1.0;\n  float clearcoatRoughness = 0.1; // Very reflective for cosmic shine\n\n  #include <clipping_planes_fragment>\n\n  float t = uTime * uSpeed;\n  \n  // Calculate distance from center for radial effects\n  float distanceFromCenter = length(vPos);\n  float angle = atan(vPos.y, vPos.x);\n  \n  // Create complex nebula patterns using FBM\n  vec2 nebulaCoords = vPos.xy * 3.0 + vCosmicSwirl.xy;\n  float nebulaPattern1 = fbm(nebulaCoords + t * 0.1);\n  float nebulaPattern2 = fbm(nebulaCoords * 2.0 + t * 0.15);\n  float nebulaPattern3 = fbm(nebulaCoords * 4.0 + t * 0.2);\n  \n  // Combine nebula patterns\n  float combinedNebula = (nebulaPattern1 + nebulaPattern2 * 0.5 + nebulaPattern3 * 0.25) / 1.75;\n  \n  // Create particle-like bright spots\n  float particleField = stars(vPos.xy * 20.0 + t * 0.5, 50.0);\n  float microParticles = stars(vPos.xy * 80.0 + t * 1.0, 200.0) * 0.5;\n  \n  // Create cosmic dust clouds\n  float dustClouds = fbm(vPos.xy * 8.0 + t * 0.05) * 0.3;\n  \n  // Energy streams\n  float energyStream1 = sin(vPos.x * 15.0 + t * 3.0 + angle * 2.0) * 0.1;\n  float energyStream2 = cos(vPos.y * 20.0 + t * 2.5 + distanceFromCenter * 5.0) * 0.1;\n  \n  // Cosmic gradient mixing with nebula influence\n  float gradientX = smoothstep(-3.0, 3.0, vPos.x + combinedNebula * 2.0 + vCosmicSwirl.x * 3.0);\n  float gradientY = smoothstep(-3.0, 3.0, vPos.y + vNebulaIntensity * 1.5 + vCosmicSwirl.y * 2.0);\n  float gradientZ = smoothstep(-2.0, 2.0, vPos.z + dustClouds * 2.0);\n  \n  // Multi-layer color mixing\n  vec3 baseGradient = mix(\n    mix(color1, color2, gradientX), \n    color3, \n    gradientY * 0.6 + gradientZ * 0.4\n  );\n  \n  // Add nebula color variations\n  vec3 nebulaColor = baseGradient;\n  nebulaColor.r += combinedNebula * 0.3 + energyStream1;\n  nebulaColor.g += vNebulaIntensity * 0.2 + energyStream2;\n  nebulaColor.b += dustClouds * 0.4 + abs(vCosmicSwirl.z) * 0.5;\n  \n  // Add particle brightness\n  vec3 particleGlow = vec3(\n    particleField * 0.8 + microParticles * 0.4,\n    particleField * 0.6 + microParticles * 0.3,\n    particleField * 0.9 + microParticles * 0.5\n  );\n  \n  // Create pulsing cosmic energy\n  float cosmicPulse = sin(t * 1.5 + distanceFromCenter * 3.0) * 0.1 + 1.0;\n  \n  // Combine all effects\n  vec3 finalColor = (nebulaColor + particleGlow * 2.0) * cosmicPulse;\n  \n  // Add cosmic rim lighting effect\n  float rimLight = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.0);\n  finalColor += rimLight * 0.3 * (color1 + color2 + color3) / 3.0;\n  \n  // Enhance particle density areas\n  finalColor = mix(finalColor, finalColor * 1.5, vParticleDensity * 0.5);\n  \n  // Add subtle color temperature variation\n  float temperature = sin(angle * 3.0 + t * 0.8) * 0.1;\n  finalColor.r += temperature * 0.1;\n  finalColor.b -= temperature * 0.1;\n\n  vec4 diffuseColor = vec4(finalColor, 1.0);\n\n  //-------- Enhanced Materiality for Cosmic Effect ------------\n  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive + finalColor * 0.2; // Strong emission for nebula glow\n\n  #ifdef TRANSMISSION\n    float totalTransmission = transmission;\n  #endif\n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n  #include <color_fragment>\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <roughnessmap_fragment>\n  #include <metalnessmap_fragment>\n  #include <normal_fragment_begin>\n  #include <normal_fragment_maps>\n  #include <clearcoat_normal_fragment_begin>\n  #include <clearcoat_normal_fragment_maps>\n  #include <emissivemap_fragment>\n  #include <lights_physical_fragment>\n  #include <lights_fragment_begin>\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n  #include <aomap_fragment>\n  \n  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +\n                      reflectedLight.directSpecular + reflectedLight.indirectSpecular +\n                      totalEmissiveRadiance;\n\n  #ifdef TRANSMISSION\n    diffuseColor.a *= mix(saturate(1. - totalTransmission +\n                        linearToRelativeLuminance2(reflectedLight.directSpecular +\n                                                  reflectedLight.indirectSpecular)),\n                1.0, metalness);\n  #endif\n\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n\n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/sphere/vertex.glsl
var vertex_default8 = "// Cosmic Sphere Vertex Shader - Nebula Effect\n// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) \n\n// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n//-------- Nebula Effect Functions ------------\n\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nmat3 rotation3dX(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c);\n}\n\nmat3 rotation3dZ(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\nvec3 rotateX(vec3 v, float angle) { return rotation3dX(angle) * v; }\nvec3 rotateZ(vec3 v, float angle) { return rotation3dZ(angle) * v; }\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\nvarying vec2 vUv;\nvarying float vNebulaIntensity;\nvarying float vParticleDensity;\nvarying vec3 vCosmicSwirl;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uLoadingTime;\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvoid main() {\n\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- Cosmic Nebula Effect ------------\n  vUv = uv;\n  \n  float t = uTime * uSpeed;\n  \n  // Create swirling nebula patterns\n  vec3 swirlCenter = vec3(0.0, 0.0, 0.0);\n  vec3 toCenter = position - swirlCenter;\n  float distanceFromCenter = length(toCenter);\n  \n  // Create spiral motion\n  float angle = atan(toCenter.y, toCenter.x);\n  float spiralAngle = angle + distanceFromCenter * 2.0 + t * 0.5;\n  \n  // Multi-octave noise for nebula density\n  float nebula1 = cnoise(position * uNoiseDensity * 0.8 + vec3(t * 0.2, t * 0.3, t * 0.1));\n  float nebula2 = cnoise(position * uNoiseDensity * 1.5 + vec3(t * 0.4, t * 0.2, t * 0.5)) * 0.7;\n  float nebula3 = cnoise(position * uNoiseDensity * 3.0 + vec3(t * 0.8, t * 0.6, t * 0.9)) * 0.4;\n  float nebula4 = cnoise(position * uNoiseDensity * 6.0 + vec3(t * 1.2, t * 1.0, t * 1.4)) * 0.2;\n  \n  // Combine nebula layers for complexity\n  float nebulaPattern = nebula1 + nebula2 + nebula3 + nebula4;\n  vNebulaIntensity = abs(nebulaPattern);\n  \n  // Create particle-like density variations\n  float particleDensity = cnoise(position * uNoiseDensity * 8.0 + vec3(t * 2.0, t * 1.5, t * 2.5));\n  vParticleDensity = smoothstep(-0.3, 0.8, particleDensity);\n  \n  // Create cosmic swirl effect\n  vec3 swirl = vec3(\n    sin(spiralAngle + t * 0.3) * distanceFromCenter * 0.1,\n    cos(spiralAngle + t * 0.2) * distanceFromCenter * 0.1,\n    sin(distanceFromCenter * 3.0 + t * 0.4) * 0.05\n  );\n  vCosmicSwirl = swirl;\n  \n  // Create pulsing effect for cosmic energy\n  float pulse = sin(t * 2.0 + distanceFromCenter * 5.0) * 0.1 + 1.0;\n  \n  // Apply complex displacement\n  float totalDisplacement = nebulaPattern * uNoiseStrength * uLoadingTime * pulse;\n  \n  // Add swirl displacement\n  vec3 pos = position + normal * totalDisplacement + swirl * 0.3;\n  vPos = pos;\n  \n  // Add cosmic rotation for dynamic feel\n  pos = rotateY(pos, sin(t * 0.1 + distanceFromCenter) * 0.1);\n  pos = rotateX(pos, cos(t * 0.08 + angle) * 0.08);\n  pos = rotateZ(pos, sin(t * 0.05 + spiralAngle) * 0.05);\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/waterPlane/index.ts
var waterPlane_exports3 = {};
__export(waterPlane_exports3, {
  fragment: () => fragment_default9,
  vertex: () => vertex_default9
});

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/waterPlane/fragment.glsl
var fragment_default9 = "// Cosmic WaterPlane Fragment Shader - Aurora Wave Effect\n\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef TRANSMISSION\nuniform float transmission;\n#endif\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\nvarying vec2 vUv;\nvarying float vAuroraIntensity;\nvarying float vWaveHeight;\nvarying vec3 vFlowDirection;\n\nuniform float uTime;\nuniform float uSpeed;\n\nuniform float uC1r;\nuniform float uC1g;\nuniform float uC1b;\nuniform float uC2r;\nuniform float uC2g;\nuniform float uC2b;\nuniform float uC3r;\nuniform float uC3g;\nuniform float uC3b;\n\n// Aurora helper functions\nfloat hash(vec2 p) {\n    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);\n}\n\nfloat noise2D(vec2 p) {\n    vec2 i = floor(p);\n    vec2 f = fract(p);\n    vec2 u = f * f * (3.0 - 2.0 * f);\n    \n    return mix(mix(hash(i + vec2(0.0, 0.0)), \n                   hash(i + vec2(1.0, 0.0)), u.x),\n               mix(hash(i + vec2(0.0, 1.0)), \n                   hash(i + vec2(1.0, 1.0)), u.x), u.y);\n}\n\n// Fractal Brownian Motion for aurora patterns\nfloat fbm(vec2 p) {\n    float value = 0.0;\n    float amplitude = 0.5;\n    float frequency = 1.0;\n    \n    for(int i = 0; i < 4; i++) {\n        value += amplitude * noise2D(p * frequency);\n        amplitude *= 0.5;\n        frequency *= 2.0;\n    }\n    return value;\n}\n\n// Aurora curtain effect\nfloat aurora(vec2 p, float time) {\n    vec2 q = vec2(fbm(p + vec2(0.0, time * 0.1)),\n                  fbm(p + vec2(5.2, time * 0.15)));\n    \n    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, time * 0.2)),\n                  fbm(p + 4.0 * q + vec2(8.3, time * 0.18)));\n    \n    return fbm(p + 4.0 * r);\n}\n\n// Water caustics effect\nfloat caustics(vec2 p, float time) {\n    vec2 uv = p * 4.0;\n    vec2 p0 = uv + vec2(time * 0.3, time * 0.2);\n    vec2 p1 = uv + vec2(time * -0.4, time * 0.3);\n    \n    float c1 = sin(length(p0) * 8.0 - time * 2.0) * 0.5 + 0.5;\n    float c2 = sin(length(p1) * 6.0 - time * 1.5) * 0.5 + 0.5;\n    \n    return (c1 + c2) * 0.5;\n}\n\n// for npm package, need to add this manually\nfloat linearToRelativeLuminance2( const in vec3 color ) {\n    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n    return dot( weights, color.rgb );\n}\n\nvoid main() {\n\n  //-------- Cosmic Aurora Water Gradient ------------\n  vec3 color1 = vec3(uC1r, uC1g, uC1b);\n  vec3 color2 = vec3(uC2r, uC2g, uC2b);\n  vec3 color3 = vec3(uC3r, uC3g, uC3b);\n  \n  float clearcoat = 1.0;\n  float clearcoatRoughness = 0.05; // Very smooth for water-like reflection\n\n  #include <clipping_planes_fragment>\n\n  float t = uTime * uSpeed;\n  \n  // Create aurora patterns\n  vec2 auroraCoords = vPos.xy * 2.0 + vFlowDirection.xy * t * 0.5;\n  float auroraPattern1 = aurora(auroraCoords, t);\n  float auroraPattern2 = aurora(auroraCoords * 1.5 + vec2(3.0, 1.0), t * 1.2);\n  float auroraPattern3 = aurora(auroraCoords * 0.7 + vec2(-2.0, 4.0), t * 0.8);\n  \n  // Combine aurora layers\n  float combinedAurora = (auroraPattern1 + auroraPattern2 * 0.7 + auroraPattern3 * 0.5) / 2.2;\n  \n  // Create water caustics\n  float causticsPattern = caustics(vPos.xy, t);\n  \n  // Create flowing light streams\n  float lightStream1 = sin(vPos.x * 8.0 + t * 2.0 + combinedAurora * 3.0) * 0.2;\n  float lightStream2 = cos(vPos.y * 6.0 + t * 1.5 + vWaveHeight * 4.0) * 0.15;\n  float lightStream3 = sin((vPos.x + vPos.y) * 10.0 + t * 2.5) * 0.1;\n  \n  // Create cosmic energy waves\n  float distanceFromCenter = length(vPos.xy);\n  float energyWave = sin(distanceFromCenter * 5.0 - t * 3.0) * \n                     exp(-distanceFromCenter * 0.05) * 0.3;\n  \n  // Aurora color shifting effect\n  vec3 auroraShift = vec3(\n    sin(combinedAurora * 6.28 + t * 1.0) * 0.2,\n    sin(combinedAurora * 6.28 + t * 1.0 + 2.094) * 0.2,  // 120 degrees\n    sin(combinedAurora * 6.28 + t * 1.0 + 4.188) * 0.2   // 240 degrees\n  );\n  \n  // Enhanced gradient mixing with aurora and water effects\n  float gradientX = smoothstep(-4.0, 4.0, vPos.x + combinedAurora * 3.0 + vFlowDirection.x * 2.0);\n  float gradientY = smoothstep(-4.0, 4.0, vPos.y + vWaveHeight * 2.0 + lightStream1 * 3.0);\n  float gradientZ = smoothstep(-3.0, 3.0, vPos.z + causticsPattern * 2.0);\n  \n  // Multi-layer color mixing\n  vec3 baseGradient = mix(\n    mix(color1, color2, gradientX), \n    color3, \n    gradientY * 0.7 + gradientZ * 0.3\n  );\n  \n  // Apply aurora color shifts\n  vec3 auroraColor = baseGradient + auroraShift;\n  \n  // Add water caustics coloring\n  vec3 causticsColor = vec3(\n    causticsPattern * 0.3,\n    causticsPattern * 0.4,\n    causticsPattern * 0.5\n  );\n  \n  // Add light streams\n  vec3 lightStreams = vec3(\n    abs(lightStream1) * 0.4,\n    abs(lightStream2) * 0.3,\n    abs(lightStream3) * 0.5\n  );\n  \n  // Aurora intensity modulation\n  float auroraIntensityMod = 1.0 + vAuroraIntensity * 0.8 + abs(combinedAurora) * 0.6;\n  \n  // Combine all effects\n  vec3 finalColor = (auroraColor + causticsColor + lightStreams + vec3(energyWave * 0.2)) * auroraIntensityMod;\n  \n  // Add water-like shimmer\n  float shimmer = sin(vPos.x * 20.0 + t * 4.0) * \n                  cos(vPos.y * 18.0 + t * 3.5) * \n                  vWaveHeight * 0.1;\n  finalColor += vec3(shimmer * 0.3, shimmer * 0.4, shimmer * 0.6);\n  \n  // Add aurora dancing effect\n  float auroraMovement = sin(vPos.x * 3.0 + t * 1.2 + combinedAurora * 2.0) * \n                         cos(vPos.y * 2.5 + t * 0.9) * 0.15;\n  finalColor.g += abs(auroraMovement) * 0.4;\n  finalColor.b += abs(auroraMovement) * 0.2;\n  \n  // Add cosmic depth variation\n  float depthVariation = noise2D(vPos.xy * 5.0 + t * 0.3) * 0.1;\n  finalColor *= (1.0 + depthVariation);\n\n  vec4 diffuseColor = vec4(finalColor, 1.0);\n\n  //-------- Enhanced Materiality for Water Aurora Effect ------------\n  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive + finalColor * 0.15; // Moderate emission for aurora glow\n\n  #ifdef TRANSMISSION\n    float totalTransmission = transmission;\n  #endif\n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n  #include <color_fragment>\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <roughnessmap_fragment>\n  #include <metalnessmap_fragment>\n  #include <normal_fragment_begin>\n  #include <normal_fragment_maps>\n  #include <clearcoat_normal_fragment_begin>\n  #include <clearcoat_normal_fragment_maps>\n  #include <emissivemap_fragment>\n  #include <lights_physical_fragment>\n  #include <lights_fragment_begin>\n  #include <lights_fragment_maps>\n  #include <lights_fragment_end>\n  #include <aomap_fragment>\n  \n  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +\n                      reflectedLight.directSpecular + reflectedLight.indirectSpecular +\n                      totalEmissiveRadiance;\n\n  #ifdef TRANSMISSION\n    diffuseColor.a *= mix(saturate(1. - totalTransmission +\n                        linearToRelativeLuminance2(reflectedLight.directSpecular +\n                                                  reflectedLight.indirectSpecular)),\n                1.0, metalness);\n  #endif\n\n  #include <tonemapping_fragment>\n  #include <encodings_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n\n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/cosmic/waterPlane/vertex.glsl
var vertex_default9 = "// Cosmic WaterPlane Vertex Shader - Aurora Wave Effect\n// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) \n\n// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl\n\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n//-------- Aurora Wave Effect Functions ------------\n\nmat3 rotation3dY(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);\n}\n\nvec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }\n\nvarying vec3 vNormal;\nvarying float displacement;\nvarying vec3 vPos;\nvarying float vDistort;\nvarying vec2 vUv;\nvarying float vAuroraIntensity;\nvarying float vWaveHeight;\nvarying vec3 vFlowDirection;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uLoadingTime;\nuniform float uNoiseDensity;\nuniform float uNoiseStrength;\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvoid main() {\n\n  #include <beginnormal_vertex>\n  #include <color_vertex>\n  #include <defaultnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <uv2_vertex>\n  #include <uv_vertex>\n  #ifndef FLAT_SHADED\n    vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n    vTangent = normalize(transformedTangent);\n    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  #include <begin_vertex>\n\n  //-------- Cosmic Aurora Wave Effect ------------\n  vUv = uv;\n  \n  float t = uTime * uSpeed;\n  \n  // Create flowing aurora patterns\n  float auroraFlow1 = sin(position.x * 5.0 + t * 1.5) * cos(position.y * 3.0 + t * 1.0);\n  float auroraFlow2 = sin(position.x * 8.0 + t * 2.0) * sin(position.y * 6.0 + t * 1.8);\n  float auroraFlow3 = cos(position.x * 12.0 + t * 2.5) * cos(position.y * 9.0 + t * 2.2);\n  \n  // Combine aurora flows\n  float auroraPattern = (auroraFlow1 + auroraFlow2 * 0.7 + auroraFlow3 * 0.4) / 2.1;\n  vAuroraIntensity = abs(auroraPattern);\n  \n  // Create multi-layered waves\n  float wave1 = cnoise(vec3(position.xy * uNoiseDensity * 0.5, t * 0.3));\n  float wave2 = cnoise(vec3(position.xy * uNoiseDensity * 1.2, t * 0.5)) * 0.6;\n  float wave3 = cnoise(vec3(position.xy * uNoiseDensity * 2.5, t * 0.8)) * 0.3;\n  float wave4 = cnoise(vec3(position.xy * uNoiseDensity * 5.0, t * 1.2)) * 0.15;\n  \n  // Combine waves for complex water surface\n  float combinedWaves = wave1 + wave2 + wave3 + wave4;\n  vWaveHeight = combinedWaves;\n  \n  // Create flowing current patterns\n  vec2 flowDirection = vec2(\n    sin(position.x * 2.0 + t * 0.8) + cos(position.y * 1.5 + t * 0.6),\n    cos(position.x * 1.8 + t * 0.7) + sin(position.y * 2.2 + t * 0.9)\n  );\n  vFlowDirection = vec3(normalize(flowDirection), 0.0);\n  \n  // Aurora-influenced wave distortion\n  float auroraWave = sin(position.x * 15.0 + t * 3.0 + auroraPattern * 5.0) * \n                     cos(position.y * 12.0 + t * 2.5 + auroraPattern * 4.0) * 0.2;\n  \n  // Create cosmic energy ripples\n  float distanceFromCenter = length(position.xy);\n  float cosmicRipple = sin(distanceFromCenter * 8.0 - t * 4.0) * \n                       exp(-distanceFromCenter * 0.1) * 0.3;\n  \n  // Pulsing effect for cosmic energy\n  float cosmicPulse = sin(t * 1.5 + distanceFromCenter * 2.0) * 0.1 + 1.0;\n  \n  // Apply complex displacement\n  float totalDisplacement = (combinedWaves + auroraWave + cosmicRipple) * \n                           uNoiseStrength * uLoadingTime * cosmicPulse;\n  \n  vec3 pos = position + normal * totalDisplacement;\n  vPos = pos;\n  \n  // Add subtle rotation for cosmic flow\n  pos = rotateY(pos, sin(t * 0.05 + distanceFromCenter * 0.1) * 0.02);\n\n  // route the deformed position through <project_vertex> so gl_Position is\n  // written exactly once; a second gl_Position write after the chunks breaks\n  // on some OpenGL drivers (#157)\n  transformed = pos;\n\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n\n  // keep vViewPosition based on the undeformed position so lighting and\n  // reflections look exactly as before\n  vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;\n\n  #include <worldpos_vertex>\n  #include <shadowmap_vertex>\n  #include <fog_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/index.ts
var glass_exports = {};
__export(glass_exports, {
  plane: () => plane_exports4,
  sphere: () => sphere_exports4,
  waterPlane: () => waterPlane_exports4
});

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/plane/index.ts
var plane_exports4 = {};
__export(plane_exports4, {
  fragment: () => fragment_default10,
  vertex: () => vertex_default10
});

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/plane/fragment.glsl
var fragment_default10 = "// Glass Plane Fragment Shader - Transparency & Refraction\n\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n// transmission is already defined by Three.js when TRANSMISSION is enabled\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\n\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <transmission_pars_fragment>\n\n// Custom uniforms for glass effect\nuniform float uTime;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform vec3 uColor3;\nuniform float uTransparency;\nuniform float uRefraction;\nuniform float uChromaticAberration;\nuniform float uFresnelPower;\nuniform float uReflectivity;\n// envMap and envMapIntensity are provided by Three.js\n\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vGlassWorldPos;\nvarying vec3 vReflect;\nvarying vec3 vRefract;\n\n// Fresnel calculation\nfloat fresnel(vec3 viewDirection, vec3 normal, float power) {\n  return pow(1.0 - dot(viewDirection, normal), power);\n}\n\n// Chromatic aberration for refraction\nvec3 chromaticRefraction(vec3 viewDirection, vec3 normal, float ior, float chromaticStrength) {\n  vec3 refractedR = refract(viewDirection, normal, 1.0 / (ior - chromaticStrength));\n  vec3 refractedG = refract(viewDirection, normal, 1.0 / ior);\n  vec3 refractedB = refract(viewDirection, normal, 1.0 / (ior + chromaticStrength));\n  \n  #ifdef ENVMAP_TYPE_CUBE\n  return vec3(\n    textureCube(envMap, refractedR).r,\n    textureCube(envMap, refractedG).g,\n    textureCube(envMap, refractedB).b\n  );\n  #else\n  return vec3(0.5);\n  #endif\n}\n\nvoid main() {\n  #include <clipping_planes_fragment>\n  \n  vec4 diffuseColor = vec4(diffuse, opacity);\n  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive;\n  \n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n  #include <color_fragment>\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <specularmap_fragment>\n  #include <roughnessmap_fragment>\n  #include <metalnessmap_fragment>\n  #include <normal_fragment_begin>\n  #include <normal_fragment_maps>\n  #include <clearcoat_normal_fragment_begin>\n  #include <clearcoat_normal_fragment_maps>\n  #include <emissivemap_fragment>\n  \n  // Glass-specific calculations\n  vec3 viewDirection = normalize(vViewPosition);\n  vec3 worldNormal = normalize(vNormal);\n  \n  // Calculate Fresnel effect\n  float fresnelFactor = fresnel(viewDirection, worldNormal, uFresnelPower);\n  \n  // Base glass color gradient\n  vec3 gradientColor = mix(uColor1, uColor2, vUv.y);\n  gradientColor = mix(gradientColor, uColor3, fresnelFactor);\n  \n  // Reflection\n  #ifdef ENVMAP_TYPE_CUBE\n  vec3 reflectionColor = textureCube(envMap, vReflect).rgb * envMapIntensity;\n  #else\n  vec3 reflectionColor = vec3(0.5);\n  #endif\n  \n  // Refraction with chromatic aberration\n  vec3 refractionColor;\n  #ifdef ENVMAP_TYPE_CUBE\n  if (uChromaticAberration > 0.0) {\n    refractionColor = chromaticRefraction(-viewDirection, worldNormal, uRefraction, uChromaticAberration);\n  } else {\n    refractionColor = textureCube(envMap, vRefract).rgb;\n  }\n  refractionColor *= envMapIntensity;\n  #else\n  refractionColor = vec3(0.3);\n  #endif\n  \n  // Mix reflection and refraction based on Fresnel\n  vec3 envColor = mix(refractionColor, reflectionColor, fresnelFactor * uReflectivity);\n  \n  // Combine with gradient color\n  vec3 finalColor = mix(gradientColor, envColor, 0.7);\n  \n  // Apply transparency\n  float finalAlpha = mix(uTransparency, 1.0, fresnelFactor * 0.5);\n  \n  // Set diffuse color for standard lighting\n  diffuseColor.rgb = finalColor;\n  diffuseColor.a = finalAlpha;\n  \n  // Skip transmission_fragment to avoid conflicts\n  \n  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + \n                       reflectedLight.directSpecular + reflectedLight.indirectSpecular + \n                       totalEmissiveRadiance;\n  \n  // Add our glass color contribution\n  outgoingLight += finalColor * 0.8;\n  \n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n  \n  #include <tonemapping_fragment>\n  #include <colorspace_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/plane/vertex.glsl
var vertex_default10 = "// Glass Plane Vertex Shader - Refraction & Transparency Effects\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vGlassWorldPos;\nvarying vec3 vReflect;\nvarying vec3 vRefract;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uWaveAmplitude;\nuniform float uWaveFrequency;\nuniform float uNoiseStrength;\nuniform float uDistortion;\n\n// Noise functions for glass distortion\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n  return mod289(((x * 34.0) + 1.0) * x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v) {\n  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);\n  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\n\n  vec3 i = floor(v + dot(v, C.yyy));\n  vec3 x0 = v - i + dot(i, C.xxx);\n\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min(g.xyz, l.zxy);\n  vec3 i2 = max(g.xyz, l.zxy);\n\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy;\n  vec3 x3 = x0 - D.yyy;\n\n  i = mod289(i);\n  vec4 p = permute(permute(permute(\n    i.z + vec4(0.0, i1.z, i2.z, 1.0))\n    + i.y + vec4(0.0, i1.y, i2.y, 1.0))\n    + i.x + vec4(0.0, i1.x, i2.x, 1.0));\n\n  float n_ = 0.142857142857;\n  vec3 ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_);\n\n  vec4 x = x_ * ns.x + ns.yyyy;\n  vec4 y = y_ * ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4(x.xy, y.xy);\n  vec4 b1 = vec4(x.zw, y.zw);\n\n  vec4 s0 = floor(b0) * 2.0 + 1.0;\n  vec4 s1 = floor(b1) * 2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;\n  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;\n\n  vec3 p0 = vec3(a0.xy, h.x);\n  vec3 p1 = vec3(a0.zw, h.y);\n  vec3 p2 = vec3(a1.xy, h.z);\n  vec3 p3 = vec3(a1.zw, h.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),\n    dot(p2, x2), dot(p3, x3)));\n}\n\nvoid main() {\n  #include <uv_pars_vertex>\n  #include <uv_vertex>\n  #include <uv2_pars_vertex>\n  #include <uv2_vertex>\n  #include <color_pars_vertex>\n  #include <color_vertex>\n  #include <morphcolor_vertex>\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <defaultnormal_vertex>\n  #include <normal_vertex>\n  \n  #ifndef FLAT_SHADED\n  vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n  vTangent = normalize(transformedTangent);\n  vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  \n  #include <begin_vertex>\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  \n  // Pass UV coordinates\n  vUv = uv;\n\n  // Calculate time-based animation\n  float time = uTime * uSpeed;\n  \n  // Create subtle wave distortion for glass effect\n  float waveX = sin(position.x * uWaveFrequency + time) * uWaveAmplitude;\n  float waveY = cos(position.y * uWaveFrequency + time) * uWaveAmplitude;\n  float waveZ = sin(position.z * uWaveFrequency + time * 0.5) * uWaveAmplitude * 0.5;\n  \n  // Add noise for organic glass distortion\n  vec3 noisePos = position + vec3(time * 0.1);\n  float noise = snoise(noisePos * 0.5) * uNoiseStrength;\n  \n  // Apply distortion to transformed position\n  transformed += vec3(waveX, waveY, waveZ) * uDistortion + normal * noise;\n  \n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n  \n  vViewPosition = -mvPosition.xyz;\n  vPosition = transformed;\n  \n  // Calculate world position for refraction\n  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);\n  vGlassWorldPos = worldPosition.xyz;\n  \n  // Calculate reflection and refraction vectors\n  vec3 worldNormal = normalize(mat3(modelMatrix) * normal);\n  vec3 viewVector = normalize(cameraPosition - worldPosition.xyz);\n  \n  // Reflection vector\n  vReflect = reflect(-viewVector, worldNormal);\n  \n  // Refraction vector with index of refraction for glass (1.5)\n  float ior = 1.5;\n  vRefract = refract(-viewVector, worldNormal, 1.0 / ior);\n  \n  #include <fog_vertex>\n  #include <shadowmap_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/sphere/index.ts
var sphere_exports4 = {};
__export(sphere_exports4, {
  fragment: () => fragment_default11,
  vertex: () => vertex_default11
});

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/sphere/fragment.glsl
var fragment_default11 = "// Glass Sphere Fragment Shader - Transparency & Refraction\n\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n// transmission is already defined by Three.js when TRANSMISSION is enabled\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\n\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <transmission_pars_fragment>\n\n// Custom uniforms for glass effect\nuniform float uTime;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform vec3 uColor3;\nuniform float uTransparency;\nuniform float uRefraction;\nuniform float uChromaticAberration;\nuniform float uFresnelPower;\nuniform float uReflectivity;\n// envMap and envMapIntensity are provided by Three.js\n\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vGlassWorldPos;\nvarying vec3 vReflect;\nvarying vec3 vRefract;\nvarying float vDistortion;\n\n// Fresnel calculation\nfloat fresnel(vec3 viewDirection, vec3 normal, float power) {\n  return pow(1.0 - abs(dot(viewDirection, normal)), power);\n}\n\n// Chromatic aberration for refraction\nvec3 chromaticRefraction(vec3 viewDirection, vec3 normal, float ior, float chromaticStrength) {\n  vec3 refractedR = refract(viewDirection, normal, 1.0 / (ior - chromaticStrength));\n  vec3 refractedG = refract(viewDirection, normal, 1.0 / ior);\n  vec3 refractedB = refract(viewDirection, normal, 1.0 / (ior + chromaticStrength));\n  \n  #ifdef ENVMAP_TYPE_CUBE\n  return vec3(\n    textureCube(envMap, refractedR).r,\n    textureCube(envMap, refractedG).g,\n    textureCube(envMap, refractedB).b\n  );\n  #else\n  return vec3(0.5);\n  #endif\n}\n\n// Caustics simulation for sphere\nfloat caustics(vec3 position, float time) {\n  float c1 = sin(position.x * 4.0 + time) * sin(position.y * 4.0 + time * 0.8);\n  float c2 = sin(position.z * 3.0 - time * 1.2) * sin(position.x * 3.0 + time);\n  return (c1 + c2) * 0.5 + 0.5;\n}\n\nvoid main() {\n  #include <clipping_planes_fragment>\n  \n  vec4 diffuseColor = vec4(diffuse, opacity);\n  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive;\n  \n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n  #include <color_fragment>\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <specularmap_fragment>\n  #include <roughnessmap_fragment>\n  #include <metalnessmap_fragment>\n  #include <normal_fragment_begin>\n  #include <normal_fragment_maps>\n  #include <clearcoat_normal_fragment_begin>\n  #include <clearcoat_normal_fragment_maps>\n  #include <emissivemap_fragment>\n  \n  // Glass-specific calculations\n  vec3 viewDirection = normalize(vViewPosition);\n  vec3 worldNormal = normalize(vNormal);\n  \n  // Calculate Fresnel effect\n  float fresnelFactor = fresnel(viewDirection, worldNormal, uFresnelPower);\n  \n  // For sphere, use spherical UV mapping for gradient\n  float sphericalU = atan(vPosition.z, vPosition.x) / (2.0 * PI) + 0.5;\n  float sphericalV = acos(vPosition.y / length(vPosition)) / PI;\n  vec2 sphericalUV = vec2(sphericalU, sphericalV);\n  \n  // Create color gradient based on spherical coordinates\n  vec3 gradientColor = mix(uColor1, uColor2, sphericalUV.y);\n  gradientColor = mix(gradientColor, uColor3, pow(fresnelFactor, 1.5));\n  \n  // Add caustics effect for sphere\n  float causticsValue = caustics(vGlassWorldPos, uTime);\n  gradientColor += vec3(causticsValue * 0.1);\n  \n  // Reflection\n  #ifdef ENVMAP_TYPE_CUBE\n  vec3 reflectionColor = textureCube(envMap, vReflect).rgb * envMapIntensity;\n  #else\n  vec3 reflectionColor = vec3(0.5);\n  #endif\n  \n  // Refraction with chromatic aberration (enhanced for sphere)\n  vec3 refractionColor;\n  #ifdef ENVMAP_TYPE_CUBE\n  if (uChromaticAberration > 0.0) {\n    float chromaticIntensity = uChromaticAberration * (1.0 + vDistortion * 0.5);\n    refractionColor = chromaticRefraction(-viewDirection, worldNormal, uRefraction, chromaticIntensity);\n  } else {\n    refractionColor = textureCube(envMap, vRefract).rgb;\n  }\n  refractionColor *= envMapIntensity;\n  #else\n  refractionColor = vec3(0.3);\n  #endif\n  \n  // Mix reflection and refraction based on Fresnel (stronger effect for sphere)\n  vec3 envColor = mix(refractionColor, reflectionColor, fresnelFactor * uReflectivity);\n  \n  // Add inner glow effect for sphere\n  float innerGlow = pow(1.0 - abs(dot(viewDirection, worldNormal)), 3.0);\n  vec3 glowColor = mix(uColor2, uColor3, innerGlow) * innerGlow * 0.5;\n  \n  // Combine all effects\n  vec3 finalColor = mix(gradientColor, envColor, 0.8) + glowColor;\n  \n  // Apply transparency with sphere thickness consideration\n  float thickness = 1.0 - pow(abs(dot(viewDirection, worldNormal)), 0.5);\n  float finalAlpha = mix(uTransparency * thickness, 1.0, fresnelFactor * 0.7);\n  \n  // Set diffuse color for standard lighting\n  diffuseColor.rgb = finalColor;\n  diffuseColor.a = finalAlpha;\n  \n  // Skip transmission_fragment to avoid conflicts\n  \n  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + \n                       reflectedLight.directSpecular + reflectedLight.indirectSpecular + \n                       totalEmissiveRadiance;\n  \n  // Add our glass color contribution\n  outgoingLight += finalColor * 0.9;\n  \n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n  \n  #include <tonemapping_fragment>\n  #include <colorspace_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/sphere/vertex.glsl
var vertex_default11 = "// Glass Sphere Vertex Shader - Refraction & Transparency Effects\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vGlassWorldPos;\nvarying vec3 vReflect;\nvarying vec3 vRefract;\nvarying float vDistortion;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uWaveAmplitude;\nuniform float uWaveFrequency;\nuniform float uNoiseStrength;\nuniform float uDistortion;\n\n// Noise functions for glass distortion\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n  return mod289(((x * 34.0) + 1.0) * x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v) {\n  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);\n  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\n\n  vec3 i = floor(v + dot(v, C.yyy));\n  vec3 x0 = v - i + dot(i, C.xxx);\n\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min(g.xyz, l.zxy);\n  vec3 i2 = max(g.xyz, l.zxy);\n\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy;\n  vec3 x3 = x0 - D.yyy;\n\n  i = mod289(i);\n  vec4 p = permute(permute(permute(\n    i.z + vec4(0.0, i1.z, i2.z, 1.0))\n    + i.y + vec4(0.0, i1.y, i2.y, 1.0))\n    + i.x + vec4(0.0, i1.x, i2.x, 1.0));\n\n  float n_ = 0.142857142857;\n  vec3 ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_);\n\n  vec4 x = x_ * ns.x + ns.yyyy;\n  vec4 y = y_ * ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4(x.xy, y.xy);\n  vec4 b1 = vec4(x.zw, y.zw);\n\n  vec4 s0 = floor(b0) * 2.0 + 1.0;\n  vec4 s1 = floor(b1) * 2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;\n  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;\n\n  vec3 p0 = vec3(a0.xy, h.x);\n  vec3 p1 = vec3(a0.zw, h.y);\n  vec3 p2 = vec3(a1.xy, h.z);\n  vec3 p3 = vec3(a1.zw, h.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),\n    dot(p2, x2), dot(p3, x3)));\n}\n\nvoid main() {\n  #include <uv_pars_vertex>\n  #include <uv_vertex>\n  #include <uv2_pars_vertex>\n  #include <uv2_vertex>\n  #include <color_pars_vertex>\n  #include <color_vertex>\n  #include <morphcolor_vertex>\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <defaultnormal_vertex>\n  #include <normal_vertex>\n  \n  #ifndef FLAT_SHADED\n  vNormal = normalize(transformedNormal);\n  #ifdef USE_TANGENT\n  vTangent = normalize(transformedTangent);\n  vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  \n  #include <begin_vertex>\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  \n  // Pass UV coordinates\n  vUv = uv;\n\n  // Calculate time-based animation\n  float time = uTime * uSpeed;\n  \n  // For sphere, use spherical coordinates for better distortion\n  float theta = atan(position.z, position.x);\n  float phi = acos(position.y / length(position));\n  \n  // Create waves based on spherical coordinates\n  float waveTheta = sin(theta * uWaveFrequency * 2.0 + time) * uWaveAmplitude;\n  float wavePhi = cos(phi * uWaveFrequency + time * 1.5) * uWaveAmplitude;\n  \n  // Add noise for organic glass distortion\n  vec3 noisePos = position + vec3(time * 0.1);\n  float noise = snoise(noisePos * 0.8) * uNoiseStrength;\n  \n  // Calculate distortion based on position on sphere\n  float distortionAmount = (waveTheta + wavePhi) * uDistortion + noise;\n  vDistortion = distortionAmount;\n  \n  // Apply distortion along normal for sphere\n  transformed += normal * distortionAmount;\n  \n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n  \n  vViewPosition = -mvPosition.xyz;\n  vPosition = transformed;\n  \n  // Calculate world position for refraction\n  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);\n  vGlassWorldPos = worldPosition.xyz;\n  \n  // Calculate reflection and refraction vectors\n  vec3 worldNormal = normalize(mat3(modelMatrix) * normal);\n  vec3 viewVector = normalize(cameraPosition - worldPosition.xyz);\n  \n  // Reflection vector\n  vReflect = reflect(-viewVector, worldNormal);\n  \n  // Refraction vector with index of refraction for glass (1.5)\n  // For sphere, adjust IOR based on curvature\n  float ior = 1.5 + sin(theta * 2.0 + time) * 0.1;\n  vRefract = refract(-viewVector, worldNormal, 1.0 / ior);\n  \n  #include <fog_vertex>\n  #include <shadowmap_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/waterPlane/index.ts
var waterPlane_exports4 = {};
__export(waterPlane_exports4, {
  fragment: () => fragment_default12,
  vertex: () => vertex_default12
});

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/waterPlane/fragment.glsl
var fragment_default12 = "// Glass WaterPlane Fragment Shader - Liquid Glass Effect\n\n#define STANDARD\n#ifdef PHYSICAL\n#define REFLECTIVITY\n#define CLEARCOAT\n#define TRANSMISSION\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n// transmission is already defined by Three.js when TRANSMISSION is enabled\n#ifdef REFLECTIVITY\nuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\nuniform float clearcoat;\nuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\nuniform vec3 sheen;\n#endif\n\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <color_pars_fragment>\n#include <common>\n#include <dithering_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <map_pars_fragment>\n#include <packing>\n#include <uv2_pars_fragment>\n#include <uv_pars_fragment>\n#include <bsdfs>\n#include <bumpmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <clipping_planes_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <transmission_pars_fragment>\n\n// Custom uniforms for liquid glass effect\nuniform float uTime;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform vec3 uColor3;\nuniform float uTransparency;\nuniform float uRefraction;\nuniform float uChromaticAberration;\nuniform float uFresnelPower;\nuniform float uReflectivity;\n// envMap and envMapIntensity are provided by Three.js\nuniform float uLiquidEffect;\nuniform float uFoamIntensity;\n\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vGlassWorldPos;\nvarying vec3 vReflect;\nvarying vec3 vRefract;\nvarying float vWaveHeight;\nvarying vec3 vWaveNormal;\n\n// Fresnel calculation\nfloat fresnel(vec3 viewDirection, vec3 normal, float power) {\n  return pow(1.0 - abs(dot(viewDirection, normal)), power);\n}\n\n// Chromatic aberration for refraction\nvec3 chromaticRefraction(vec3 viewDirection, vec3 normal, float ior, float chromaticStrength) {\n  vec3 refractedR = refract(viewDirection, normal, 1.0 / (ior - chromaticStrength));\n  vec3 refractedG = refract(viewDirection, normal, 1.0 / ior);\n  vec3 refractedB = refract(viewDirection, normal, 1.0 / (ior + chromaticStrength));\n  \n  #ifdef ENVMAP_TYPE_CUBE\n  vec3 result = vec3(\n    textureCube(envMap, refractedR).r,\n    textureCube(envMap, refractedG).g,\n    textureCube(envMap, refractedB).b\n  );\n  \n  // Add distortion based on wave height\n  float distortion = vWaveHeight * 0.1;\n  result = mix(result, textureCube(envMap, refractedG + vec3(distortion)).rgb, 0.3);\n  #else\n  vec3 result = vec3(0.5);\n  #endif\n  \n  return result;\n}\n\n// Foam effect for water surface\nfloat foam(vec2 uv, float waveHeight, float time) {\n  float foamThreshold = 0.3;\n  float foamAmount = smoothstep(foamThreshold - 0.1, foamThreshold + 0.1, abs(waveHeight));\n  \n  // Add foam texture pattern\n  float foamPattern = sin(uv.x * 40.0 + time) * cos(uv.y * 30.0 - time * 0.5);\n  foamPattern += sin(uv.x * 25.0 - time * 0.8) * sin(uv.y * 35.0 + time);\n  foamPattern = clamp(foamPattern * 0.5 + 0.5, 0.0, 1.0);\n  \n  return foamAmount * foamPattern;\n}\n\n// Caustics for underwater effect\nvec3 caustics(vec3 position, float time) {\n  float c1 = sin(position.x * 6.0 + time * 1.5) * sin(position.z * 6.0 + time);\n  float c2 = cos(position.x * 4.0 - time) * cos(position.z * 5.0 + time * 1.2);\n  float c3 = sin((position.x + position.z) * 3.0 + time * 0.8);\n  \n  float causticPattern = (c1 + c2 + c3) / 3.0;\n  causticPattern = pow(max(0.0, causticPattern), 2.0);\n  \n  return vec3(causticPattern) * vec3(0.3, 0.6, 1.0);\n}\n\nvoid main() {\n  #include <clipping_planes_fragment>\n  \n  vec4 diffuseColor = vec4(diffuse, opacity);\n  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\n  vec3 totalEmissiveRadiance = emissive;\n  \n  #include <logdepthbuf_fragment>\n  #include <map_fragment>\n  #include <color_fragment>\n  #include <alphamap_fragment>\n  #include <alphatest_fragment>\n  #include <specularmap_fragment>\n  #include <roughnessmap_fragment>\n  #include <metalnessmap_fragment>\n  #include <normal_fragment_begin>\n  #include <normal_fragment_maps>\n  #include <clearcoat_normal_fragment_begin>\n  #include <clearcoat_normal_fragment_maps>\n  #include <emissivemap_fragment>\n  \n  // Use wave normal for more accurate water surface\n  vec3 viewDirection = normalize(vViewPosition);\n  vec3 worldNormal = normalize(vWaveNormal);\n  \n  // Calculate Fresnel effect\n  float fresnelFactor = fresnel(viewDirection, worldNormal, uFresnelPower);\n  \n  // Water color gradient with depth effect\n  float depth = 1.0 - abs(vWaveHeight) * 2.0;\n  vec3 shallowColor = mix(uColor1, uColor2, vUv.y);\n  vec3 deepColor = mix(uColor2, uColor3, depth);\n  vec3 gradientColor = mix(shallowColor, deepColor, fresnelFactor);\n  \n  // Add foam effect\n  float foamAmount = foam(vUv, vWaveHeight, uTime) * uFoamIntensity;\n  vec3 foamColor = vec3(1.0, 1.0, 1.0);\n  gradientColor = mix(gradientColor, foamColor, foamAmount);\n  \n  // Reflection\n  #ifdef ENVMAP_TYPE_CUBE\n  vec3 reflectionColor = textureCube(envMap, vReflect).rgb * envMapIntensity;\n  \n  // Add slight blur to reflection for water effect\n  vec3 blurredReflection = reflectionColor;\n  for (int i = 0; i < 4; i++) {\n    vec3 offset = vec3(\n      sin(float(i) * 2.0) * 0.01,\n      0.0,\n      cos(float(i) * 2.0) * 0.01\n    );\n    blurredReflection += textureCube(envMap, vReflect + offset).rgb * envMapIntensity;\n  }\n  blurredReflection /= 5.0;\n  reflectionColor = mix(reflectionColor, blurredReflection, uLiquidEffect);\n  #else\n  vec3 reflectionColor = vec3(0.5);\n  #endif\n  \n  // Refraction with chromatic aberration (stronger for water)\n  vec3 refractionColor;\n  #ifdef ENVMAP_TYPE_CUBE\n  if (uChromaticAberration > 0.0) {\n    float waterIOR = 1.33 + vWaveHeight * 0.1;\n    refractionColor = chromaticRefraction(-viewDirection, worldNormal, waterIOR, uChromaticAberration * 1.5);\n  } else {\n    refractionColor = textureCube(envMap, vRefract).rgb;\n  }\n  refractionColor *= envMapIntensity;\n  #else\n  refractionColor = vec3(0.3);\n  #endif\n  \n  // Add caustics to refraction\n  vec3 causticsColor = caustics(vGlassWorldPos, uTime);\n  refractionColor += causticsColor * 0.3 * uLiquidEffect;\n  \n  // Mix reflection and refraction based on Fresnel and wave\n  float reflectionMix = fresnelFactor * uReflectivity * (1.0 + abs(vWaveHeight));\n  vec3 envColor = mix(refractionColor, reflectionColor, clamp(reflectionMix, 0.0, 1.0));\n  \n  // Combine all effects\n  vec3 finalColor = mix(gradientColor, envColor, 0.85);\n  \n  // Apply transparency with wave variation\n  float waveAlpha = 1.0 - abs(vWaveHeight) * 0.3;\n  float finalAlpha = mix(uTransparency * waveAlpha, 1.0, fresnelFactor * 0.6 + foamAmount * 0.4);\n  \n  // Set diffuse color for standard lighting\n  diffuseColor.rgb = finalColor;\n  diffuseColor.a = finalAlpha;\n  \n  // Skip transmission_fragment to avoid conflicts\n  \n  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + \n                       reflectedLight.directSpecular + reflectedLight.indirectSpecular + \n                       totalEmissiveRadiance;\n  \n  // Add our liquid glass color contribution\n  outgoingLight += finalColor * 0.95;\n  \n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\n  \n  #include <tonemapping_fragment>\n  #include <colorspace_fragment>\n  #include <fog_fragment>\n  #include <premultiplied_alpha_fragment>\n  #include <dithering_fragment>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/shaders/glass/waterPlane/vertex.glsl
var vertex_default12 = "// Glass WaterPlane Vertex Shader - Liquid Glass Effect\n\n#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n#ifdef USE_TANGENT\nvarying vec3 vTangent;\nvarying vec3 vBitangent;\n#endif\n#endif\n#include <clipping_planes_pars_vertex>\n#include <color_pars_vertex>\n#include <common>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <skinning_pars_vertex>\n#include <uv2_pars_vertex>\n#include <uv_pars_vertex>\n\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vGlassWorldPos;\nvarying vec3 vReflect;\nvarying vec3 vRefract;\nvarying float vWaveHeight;\nvarying vec3 vWaveNormal;\n\nuniform float uTime;\nuniform float uSpeed;\nuniform float uWaveAmplitude;\nuniform float uWaveFrequency;\nuniform float uNoiseStrength;\nuniform float uDistortion;\nuniform float uFlowSpeed;\nuniform vec2 uFlowDirection;\n\n// Noise functions for water-like glass distortion\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n  return mod289(((x * 34.0) + 1.0) * x);\n}\n\nvec4 taylorInvSqrt(vec4 r) {\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v) {\n  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);\n  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\n\n  vec3 i = floor(v + dot(v, C.yyy));\n  vec3 x0 = v - i + dot(i, C.xxx);\n\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min(g.xyz, l.zxy);\n  vec3 i2 = max(g.xyz, l.zxy);\n\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy;\n  vec3 x3 = x0 - D.yyy;\n\n  i = mod289(i);\n  vec4 p = permute(permute(permute(\n    i.z + vec4(0.0, i1.z, i2.z, 1.0))\n    + i.y + vec4(0.0, i1.y, i2.y, 1.0))\n    + i.x + vec4(0.0, i1.x, i2.x, 1.0));\n\n  float n_ = 0.142857142857;\n  vec3 ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_);\n\n  vec4 x = x_ * ns.x + ns.yyyy;\n  vec4 y = y_ * ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4(x.xy, y.xy);\n  vec4 b1 = vec4(x.zw, y.zw);\n\n  vec4 s0 = floor(b0) * 2.0 + 1.0;\n  vec4 s1 = floor(b1) * 2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;\n  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;\n\n  vec3 p0 = vec3(a0.xy, h.x);\n  vec3 p1 = vec3(a0.zw, h.y);\n  vec3 p2 = vec3(a1.xy, h.z);\n  vec3 p3 = vec3(a1.zw, h.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),\n    dot(p2, x2), dot(p3, x3)));\n}\n\n// Water wave function\nvec3 waterWave(vec2 pos, float time) {\n  // Flow effect\n  vec2 flowPos = pos + uFlowDirection * time * uFlowSpeed;\n  \n  // Multiple wave layers for realistic water\n  float wave1 = sin(flowPos.x * uWaveFrequency + time) * cos(flowPos.y * uWaveFrequency * 0.8 + time * 0.7);\n  float wave2 = sin(flowPos.x * uWaveFrequency * 1.7 - time * 1.3) * sin(flowPos.y * uWaveFrequency * 1.3 + time);\n  float wave3 = cos(flowPos.x * uWaveFrequency * 0.5 + time * 0.5) * sin(flowPos.y * uWaveFrequency * 0.6 - time * 0.8);\n  \n  // Combine waves\n  float height = (wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2) * uWaveAmplitude;\n  \n  // Calculate wave normals\n  float dx = cos(flowPos.x * uWaveFrequency + time) * uWaveFrequency * 0.5 * uWaveAmplitude;\n  float dz = -sin(flowPos.y * uWaveFrequency * 0.8 + time * 0.7) * uWaveFrequency * 0.8 * 0.5 * uWaveAmplitude;\n  \n  return vec3(dx, height, dz);\n}\n\nvoid main() {\n  #include <uv_pars_vertex>\n  #include <uv_vertex>\n  #include <uv2_pars_vertex>\n  #include <uv2_vertex>\n  #include <color_pars_vertex>\n  #include <color_vertex>\n  #include <morphcolor_vertex>\n  #include <beginnormal_vertex>\n  #include <morphnormal_vertex>\n  #include <skinbase_vertex>\n  #include <skinnormal_vertex>\n  #include <defaultnormal_vertex>\n  #include <normal_vertex>\n  \n  // Pass UV coordinates\n  vUv = uv;\n\n  // Calculate time-based animation\n  float time = uTime * uSpeed;\n  \n  // Calculate water waves\n  vec3 waveData = waterWave(position.xz, time);\n  float waveHeight = waveData.y;\n  vec2 waveGradient = waveData.xz;\n  \n  // Add noise for organic water movement\n  vec3 noisePos = vec3(position.x, position.y, position.z) + vec3(time * 0.05);\n  float noise = snoise(noisePos * 1.2) * uNoiseStrength * 0.5;\n  \n  // Store wave height for fragment shader\n  vWaveHeight = waveHeight + noise;\n  \n  // Calculate perturbed normal for water surface\n  vec3 waveNormal = normalize(vec3(-waveGradient.x, 1.0, -waveGradient.y));\n  vWaveNormal = waveNormal;\n  \n  // Blend original normal with wave normal\n  vec3 blendedNormal = normalize(mix(normal, waveNormal, 0.7));\n  \n  #ifndef FLAT_SHADED\n  vNormal = normalize(mat3(modelViewMatrix) * blendedNormal);\n  #ifdef USE_TANGENT\n  vTangent = normalize(transformedTangent);\n  vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);\n  #endif\n  #endif\n  \n  #include <begin_vertex>\n  #include <morphtarget_vertex>\n  #include <skinning_vertex>\n  #include <displacementmap_vertex>\n  \n  // Apply wave displacement and additional distortion\n  transformed.y += waveHeight + noise;\n  transformed += blendedNormal * uDistortion * noise;\n  \n  #include <project_vertex>\n  #include <logdepthbuf_vertex>\n  #include <clipping_planes_vertex>\n  \n  vViewPosition = -mvPosition.xyz;\n  vPosition = transformed;\n  \n  // Calculate world position for refraction\n  vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);\n  vGlassWorldPos = worldPosition.xyz;\n  \n  // Calculate reflection and refraction vectors with wave normal\n  vec3 worldNormal = normalize(mat3(modelMatrix) * blendedNormal);\n  vec3 viewVector = normalize(cameraPosition - worldPosition.xyz);\n  \n  // Reflection vector\n  vReflect = reflect(-viewVector, worldNormal);\n  \n  // Refraction vector with varying IOR for water effect\n  float ior = 1.33 + sin(time + position.x * 2.0) * 0.1; // Water IOR ~1.33\n  vRefract = refract(-viewVector, worldNormal, 1.0 / ior);\n  \n  #include <fog_vertex>\n  #include <shadowmap_vertex>\n}\n";

// foundations/shadergradient/packages/shadergradient/src/utils/debug.ts
var debugState = {
  performance: false,
  render: true
};
var debug = {
  enable: (category) => {
    debugState[category] = true;
  },
  disable: (category) => {
    debugState[category] = false;
  },
  enableAll: () => {
    Object.keys(debugState).forEach((key) => {
      debugState[key] = true;
    });
  },
  disableAll: () => {
    Object.keys(debugState).forEach((key) => {
      debugState[key] = false;
    });
  },
  performance: (...args) => {
    if (debugState.performance) {
      console.log("[Performance]", ...args);
    }
  },
  render: (...args) => {
    if (debugState.render) {
      console.log("[Render]", ...args);
    }
  }
};
if (typeof window !== "undefined") {
  window.debug = debug;
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Mesh/Mesh.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function Mesh({
  animate,
  range,
  rangeStart,
  rangeEnd,
  loop,
  loopDuration,
  positionX,
  positionY,
  positionZ,
  rotationX,
  rotationY,
  rotationZ,
  type,
  color1,
  color2,
  color3,
  reflection,
  uTime,
  uSpeed,
  uDensity,
  uStrength,
  uFrequency,
  uAmplitude,
  shader
}) {
  const { vertex, fragment } = shaders_exports[shader][type];
  const baseUniforms = {
    colors: [color1, color2, color3],
    uTime,
    uSpeed,
    uLoadingTime: 1,
    // no loading animation
    uNoiseDensity: uDensity,
    uNoiseStrength: uStrength,
    uFrequency,
    uAmplitude,
    uIntensity: 0.5,
    uLoop: loop === "on" ? 1 : 0,
    uLoopDuration: loopDuration || 5
  };
  const glassUniforms = shader === "glass" ? {
    uColor1: colorToRgb(color1),
    uColor2: colorToRgb(color2),
    uColor3: colorToRgb(color3),
    uTransparency: 0.1,
    uRefraction: 1.5,
    uChromaticAberration: 0.1,
    uFresnelPower: 2,
    uReflectivity: 0.9,
    uWaveAmplitude: 0.02,
    uWaveFrequency: 5,
    uDistortion: 0.1,
    uFlowSpeed: 0.1,
    uFlowDirection: { x: 1, y: 0.5 },
    uLiquidEffect: 0.5,
    uFoamIntensity: 0.3,
    envMapIntensity: 1
  } : {};
  const uniforms = {
    ...baseUniforms,
    ...glassUniforms
  };
  return /* @__PURE__ */ jsxs2(
    "mesh",
    {
      name: "shadergradient-mesh",
      position: [positionX, positionY, positionZ],
      rotation: dToRArr([rotationX, rotationY, rotationZ]),
      children: [
        /* @__PURE__ */ jsx4(Geometry, { type }),
        /* @__PURE__ */ jsx4(
          Materials,
          {
            animate,
            range,
            rangeStart,
            rangeEnd,
            loop,
            loopDuration,
            reflection,
            shader,
            uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
            onInit: (material) => {
              debug.performance("material (onInit)", material);
            }
          }
        )
      ]
    }
  );
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Lights/Lights.tsx
import { Suspense } from "react";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Lights/Environment/EnvironmentMap.tsx
import React2 from "react";
import { EquirectangularReflectionMapping } from "three";
import { useThree } from "@react-three/fiber";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Lights/Environment/useRGBELoader.ts
import { RGBELoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
function useRGBELoader(file, { path }) {
  const cubeTexture = useLoader(
    // @ts-ignore
    RGBELoader,
    file,
    (loader) => loader.setPath(path)
  );
  return cubeTexture;
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Lights/Environment/EnvironmentMap.tsx
var isRef = (obj) => obj.current && obj.current.isScene;
var resolveScene = (scene) => isRef(scene) ? scene.current : scene;
function EnvironmentMap({ background = false, envPreset }) {
  const { envBasePath } = useShaderGradientCanvasContext();
  const path = envBasePath || defaultEnvBasePath;
  const city = useRGBELoader("city.hdr", { path });
  const dawn = useRGBELoader("dawn.hdr", { path });
  const lobby = useRGBELoader("lobby.hdr", { path });
  const textures = { city, dawn, lobby };
  const map = textures[envPreset];
  const defaultScene = useThree((state) => state.scene);
  React2.useLayoutEffect(() => {
    if (map) {
      const target2 = resolveScene(defaultScene);
      const oldbg = target2.background;
      const oldenv = target2.environment;
      if (background !== "only") target2.environment = map;
      if (background) target2.background = map;
      return () => {
        if (background !== "only") target2.environment = oldenv;
        if (background) target2.background = "black";
      };
    }
  }, [defaultScene, map, background]);
  const texture = map;
  texture.mapping = EquirectangularReflectionMapping;
  return null;
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Lights/Lights.tsx
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function Lights({ lightType, brightness, envPreset }) {
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    lightType === "3d" && /* @__PURE__ */ jsx5("ambientLight", { intensity: (brightness || 1) * Math.PI }),
    lightType === "env" && /* @__PURE__ */ jsx5(Suspense, { fallback: /* @__PURE__ */ jsx5(Loader, {}), children: /* @__PURE__ */ jsx5(
      EnvironmentMap,
      {
        envPreset,
        background: false,
        loadingCallback: () => void 0
      }
    ) })
  ] });
}
function Loader() {
  return /* @__PURE__ */ jsx5("ambientLight", { intensity: 0.4 });
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/PostProcessing.tsx
import { useEffect as useEffect4, useMemo as useMemo3, useRef as useRef3 } from "react";
import { useThree as useThree2, useFrame as useFrame2 } from "@react-three/fiber";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/from-threejs/postprocessing/EffectComposer.js
import {
  BufferGeometry as BufferGeometry2,
  Clock as Clock2,
  Float32BufferAttribute as Float32BufferAttribute2,
  LinearFilter,
  Mesh as Mesh3,
  OrthographicCamera as OrthographicCamera2,
  RGBAFormat,
  Vector2,
  WebGLRenderTarget
} from "three";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/from-threejs/postprocessing/Pass.js
import {
  BufferGeometry,
  Float32BufferAttribute,
  OrthographicCamera,
  Mesh as Mesh2
} from "three";
var Pass = class {
  constructor() {
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;
    this.renderToScreen = false;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
};
var _camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
var _geometry = new BufferGeometry();
_geometry.setAttribute(
  "position",
  new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)
);
_geometry.setAttribute("uv", new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
var FullScreenQuad = class {
  constructor(material) {
    this._mesh = new Mesh2(_geometry, material);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(renderer) {
    renderer.render(this._mesh, _camera);
  }
  get material() {
    return this._mesh.material;
  }
  set material(value) {
    this._mesh.material = value;
  }
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/from-threejs/postprocessing/MaskPass.js
var MaskPass = class extends Pass {
  constructor(scene, camera) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.clear = true;
    this.needsSwap = false;
    this.inverse = false;
  }
  render(renderer, writeBuffer, readBuffer) {
    const context = renderer.getContext();
    const state = renderer.state;
    state.buffers.color.setMask(false);
    state.buffers.depth.setMask(false);
    state.buffers.color.setLocked(true);
    state.buffers.depth.setLocked(true);
    let writeValue, clearValue;
    if (this.inverse) {
      writeValue = 0;
      clearValue = 1;
    } else {
      writeValue = 1;
      clearValue = 0;
    }
    state.buffers.stencil.setTest(true);
    state.buffers.stencil.setOp(
      context.REPLACE,
      context.REPLACE,
      context.REPLACE
    );
    state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 4294967295);
    state.buffers.stencil.setClear(clearValue);
    state.buffers.stencil.setLocked(true);
    renderer.setRenderTarget(readBuffer);
    if (this.clear) renderer.clear();
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(writeBuffer);
    if (this.clear) renderer.clear();
    renderer.render(this.scene, this.camera);
    state.buffers.color.setLocked(false);
    state.buffers.depth.setLocked(false);
    state.buffers.stencil.setLocked(false);
    state.buffers.stencil.setFunc(context.EQUAL, 1, 4294967295);
    state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
    state.buffers.stencil.setLocked(true);
  }
};
var ClearMaskPass = class extends Pass {
  constructor() {
    super();
    this.needsSwap = false;
  }
  render(renderer) {
    renderer.state.buffers.stencil.setLocked(false);
    renderer.state.buffers.stencil.setTest(false);
  }
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/from-threejs/postprocessing/ShaderPass.js
import { ShaderMaterial, UniformsUtils as UniformsUtils2 } from "three";
var ShaderPass = class extends Pass {
  constructor(shader, textureID) {
    super();
    this.textureID = textureID !== void 0 ? textureID : "tDiffuse";
    if (shader instanceof ShaderMaterial) {
      this.uniforms = shader.uniforms;
      this.material = shader;
    } else if (shader) {
      this.uniforms = UniformsUtils2.clone(shader.uniforms);
      this.material = new ShaderMaterial({
        defines: Object.assign({}, shader.defines),
        uniforms: this.uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
      });
    }
    this.fsQuad = new FullScreenQuad(this.material);
  }
  render(renderer, writeBuffer, readBuffer) {
    if (this.uniforms[this.textureID]) {
      this.uniforms[this.textureID].value = readBuffer.texture;
    }
    this.fsQuad.material = this.material;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear)
        renderer.clear(
          renderer.autoClearColor,
          renderer.autoClearDepth,
          renderer.autoClearStencil
        );
      this.fsQuad.render(renderer);
    }
  }
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/from-threejs/shaders/CopyShader.js
var CopyShader = {
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;

		}`
  )
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/from-threejs/postprocessing/EffectComposer.js
var EffectComposer = class {
  constructor(renderer, renderTarget) {
    this.renderer = renderer;
    if (renderTarget === void 0) {
      const parameters = {
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        format: RGBAFormat
      };
      const size = renderer.getSize(new Vector2());
      this._pixelRatio = renderer.getPixelRatio();
      this._width = size.width;
      this._height = size.height;
      renderTarget = new WebGLRenderTarget(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
        parameters
      );
      renderTarget.texture.name = "EffectComposer.rt1";
    } else {
      this._pixelRatio = 1;
      this._width = renderTarget.width;
      this._height = renderTarget.height;
    }
    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();
    this.renderTarget2.texture.name = "EffectComposer.rt2";
    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;
    this.renderToScreen = true;
    this.passes = [];
    if (CopyShader === void 0) {
      console.error("THREE.EffectComposer relies on CopyShader");
    }
    if (ShaderPass === void 0) {
      console.error("THREE.EffectComposer relies on ShaderPass");
    }
    this.copyPass = new ShaderPass(CopyShader);
    this.clock = new Clock2();
  }
  swapBuffers() {
    const tmp = this.readBuffer;
    this.readBuffer = this.writeBuffer;
    this.writeBuffer = tmp;
  }
  addPass(pass) {
    this.passes.push(pass);
    pass.setSize(
      this._width * this._pixelRatio,
      this._height * this._pixelRatio
    );
  }
  insertPass(pass, index) {
    this.passes.splice(index, 0, pass);
    pass.setSize(
      this._width * this._pixelRatio,
      this._height * this._pixelRatio
    );
  }
  removePass(pass) {
    const index = this.passes.indexOf(pass);
    if (index !== -1) {
      this.passes.splice(index, 1);
    }
  }
  isLastEnabledPass(passIndex) {
    for (let i = passIndex + 1; i < this.passes.length; i++) {
      if (this.passes[i].enabled) {
        return false;
      }
    }
    return true;
  }
  render(deltaTime) {
    if (deltaTime === void 0) {
      deltaTime = this.clock.getDelta();
    }
    const currentRenderTarget = this.renderer.getRenderTarget();
    let maskActive = false;
    for (let i = 0, il = this.passes.length; i < il; i++) {
      const pass = this.passes[i];
      if (pass.enabled === false) continue;
      pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
      pass.render(
        this.renderer,
        this.writeBuffer,
        this.readBuffer,
        deltaTime,
        maskActive
      );
      if (pass.needsSwap) {
        if (maskActive) {
          const context = this.renderer.getContext();
          const stencil = this.renderer.state.buffers.stencil;
          stencil.setFunc(context.NOTEQUAL, 1, 4294967295);
          this.copyPass.render(
            this.renderer,
            this.writeBuffer,
            this.readBuffer,
            deltaTime
          );
          stencil.setFunc(context.EQUAL, 1, 4294967295);
        }
        this.swapBuffers();
      }
      if (MaskPass !== void 0) {
        if (pass instanceof MaskPass) {
          maskActive = true;
        } else if (pass instanceof ClearMaskPass) {
          maskActive = false;
        }
      }
    }
    this.renderer.setRenderTarget(currentRenderTarget);
  }
  reset(renderTarget) {
    if (renderTarget === void 0) {
      const size = this.renderer.getSize(new Vector2());
      this._pixelRatio = this.renderer.getPixelRatio();
      this._width = size.width;
      this._height = size.height;
      renderTarget = this.renderTarget1.clone();
      renderTarget.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio
      );
    }
    this.renderTarget1.dispose();
    this.renderTarget2.dispose();
    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();
    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;
  }
  setSize(width, height) {
    this._width = width;
    this._height = height;
    const effectiveWidth = this._width * this._pixelRatio;
    const effectiveHeight = this._height * this._pixelRatio;
    this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
    this.renderTarget2.setSize(effectiveWidth, effectiveHeight);
    for (let i = 0; i < this.passes.length; i++) {
      this.passes[i].setSize(effectiveWidth, effectiveHeight);
    }
  }
  setPixelRatio(pixelRatio) {
    this._pixelRatio = pixelRatio;
    this.setSize(this._width, this._height);
  }
};
var _camera2 = new OrthographicCamera2(-1, 1, 1, -1, 0, 1);
var _geometry2 = new BufferGeometry2();
_geometry2.setAttribute(
  "position",
  new Float32BufferAttribute2([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)
);
_geometry2.setAttribute("uv", new Float32BufferAttribute2([0, 2, 0, 0, 2, 0], 2));

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/from-threejs/postprocessing/RenderPass.js
import { Color } from "three";
var RenderPass = class extends Pass {
  constructor(scene, camera, overrideMaterial, clearColor, clearAlpha) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.overrideMaterial = overrideMaterial;
    this.clearColor = clearColor;
    this.clearAlpha = clearAlpha !== void 0 ? clearAlpha : 0;
    this.clear = true;
    this.clearDepth = false;
    this.needsSwap = false;
    this._oldClearColor = new Color();
  }
  render(renderer, writeBuffer, readBuffer) {
    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;
    let oldClearAlpha, oldOverrideMaterial;
    if (this.overrideMaterial !== void 0) {
      oldOverrideMaterial = this.scene.overrideMaterial;
      this.scene.overrideMaterial = this.overrideMaterial;
    }
    if (this.clearColor) {
      renderer.getClearColor(this._oldClearColor);
      oldClearAlpha = renderer.getClearAlpha();
      renderer.setClearColor(this.clearColor, this.clearAlpha);
    }
    if (this.clearDepth) {
      renderer.clearDepth();
    }
    renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
    if (this.clear)
      renderer.clear(
        renderer.autoClearColor,
        renderer.autoClearDepth,
        renderer.autoClearStencil
      );
    renderer.render(this.scene, this.camera);
    if (this.clearColor) {
      renderer.setClearColor(this._oldClearColor, oldClearAlpha);
    }
    if (this.overrideMaterial !== void 0) {
      this.scene.overrideMaterial = oldOverrideMaterial;
    }
    renderer.autoClear = oldAutoClear;
  }
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/HalftonePass.ts
import { ShaderMaterial as ShaderMaterial2, UniformsUtils as UniformsUtils3 } from "three";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/BlendFunction.js
var BlendFunction = {
  SKIP: 0,
  ADD: 1,
  ALPHA: 2,
  AVERAGE: 3,
  COLOR_BURN: 4,
  COLOR_DODGE: 5,
  DARKEN: 6,
  DIFFERENCE: 7,
  EXCLUSION: 8,
  LIGHTEN: 9,
  MULTIPLY: 10,
  DIVIDE: 11,
  NEGATION: 12,
  NORMAL: 13,
  OVERLAY: 14,
  REFLECT: 15,
  SCREEN: 16,
  SOFT_LIGHT: 17,
  SUBTRACT: 18
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/BlendMode.js
import { EventDispatcher, Uniform } from "three";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/add/shader.frag
var shader_default = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return min(x + y, 1.0) * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/alpha/shader.frag
var shader_default2 = "vec3 blend(const in vec3 x, const in vec3 y, const in float opacity) {\n\n	return y * opacity + x * (1.0 - opacity);\n\n}\n\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	float a = min(y.a, opacity);\n\n	return vec4(blend(x.rgb, y.rgb, a), max(x.a, a));\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/average/shader.frag
var shader_default3 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return (x + y) * 0.5 * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/color-burn/shader.frag
var shader_default4 = "float blend(const in float x, const in float y) {\n\n	return (y == 0.0) ? y : max(1.0 - (1.0 - x) / y, 0.0);\n\n}\n\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	vec4 z = vec4(\n		blend(x.r, y.r),\n		blend(x.g, y.g),\n		blend(x.b, y.b),\n		blend(x.a, y.a)\n	);\n\n	return z * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/color-dodge/shader.frag
var shader_default5 = "float blend(const in float x, const in float y) {\n\n	return (y == 1.0) ? y : min(x / (1.0 - y), 1.0);\n\n}\n\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	vec4 z = vec4(\n		blend(x.r, y.r),\n		blend(x.g, y.g),\n		blend(x.b, y.b),\n		blend(x.a, y.a)\n	);\n\n	return z * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/darken/shader.frag
var shader_default6 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return min(x, y) * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/difference/shader.frag
var shader_default7 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return abs(x - y) * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/divide/shader.frag
var shader_default8 = "float blend(const in float x, const in float y) {\n\n	return (y > 0.0) ? min(x / y, 1.0) : 1.0;\n\n}\n\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	vec4 z = vec4(\n		blend(x.r, y.r),\n		blend(x.g, y.g),\n		blend(x.b, y.b),\n		blend(x.a, y.a)\n	);\n\n	return z * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/exclusion/shader.frag
var shader_default9 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return (x + y - 2.0 * x * y) * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/lighten/shader.frag
var shader_default10 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return max(x, y) * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/multiply/shader.frag
var shader_default11 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return x * y * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/negation/shader.frag
var shader_default12 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return (1.0 - abs(1.0 - x - y)) * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/normal/shader.frag
var shader_default13 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return y * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/overlay/shader.frag
var shader_default14 = "float blend(const in float x, const in float y) {\n\n	return (x < 0.5) ? (2.0 * x * y) : (1.0 - 2.0 * (1.0 - x) * (1.0 - y));\n\n}\n\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	vec4 z = vec4(\n		blend(x.r, y.r),\n		blend(x.g, y.g),\n		blend(x.b, y.b),\n		blend(x.a, y.a)\n	);\n\n	return z * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/reflect/shader.frag
var shader_default15 = "float blend(const in float x, const in float y) {\n\n	return (y == 1.0) ? y : min(x * x / (1.0 - y), 1.0);\n\n}\n\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	vec4 z = vec4(\n		blend(x.r, y.r),\n		blend(x.g, y.g),\n		blend(x.b, y.b),\n		blend(x.a, y.a)\n	);\n\n	return z * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/screen/shader.frag
var shader_default16 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return (1.0 - (1.0 - x) * (1.0 - y)) * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/soft-light/shader.frag
var shader_default17 = "float blend(const in float x, const in float y) {\n\n	return (y < 0.5) ?\n		(2.0 * x * y + x * x * (1.0 - 2.0 * y)) :\n		(sqrt(x) * (2.0 * y - 1.0) + 2.0 * x * (1.0 - y));\n\n}\n\nvec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	vec4 z = vec4(\n		blend(x.r, y.r),\n		blend(x.g, y.g),\n		blend(x.b, y.b),\n		blend(x.a, y.a)\n	);\n\n	return z * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/glsl/subtract/shader.frag
var shader_default18 = "vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {\n\n	return max(x + y - 1.0, 0.0) * opacity + x * (1.0 - opacity);\n\n}\n";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/blending/BlendMode.js
var blendFunctions = /* @__PURE__ */ new Map([
  [BlendFunction.SKIP, null],
  [BlendFunction.ADD, shader_default],
  [BlendFunction.ALPHA, shader_default2],
  [BlendFunction.AVERAGE, shader_default3],
  [BlendFunction.COLOR_BURN, shader_default4],
  [BlendFunction.COLOR_DODGE, shader_default5],
  [BlendFunction.DARKEN, shader_default6],
  [BlendFunction.DIFFERENCE, shader_default7],
  [BlendFunction.EXCLUSION, shader_default9],
  [BlendFunction.LIGHTEN, shader_default10],
  [BlendFunction.MULTIPLY, shader_default11],
  [BlendFunction.DIVIDE, shader_default8],
  [BlendFunction.NEGATION, shader_default12],
  [BlendFunction.NORMAL, shader_default13],
  [BlendFunction.OVERLAY, shader_default14],
  [BlendFunction.REFLECT, shader_default15],
  [BlendFunction.SCREEN, shader_default16],
  [BlendFunction.SOFT_LIGHT, shader_default17],
  [BlendFunction.SUBTRACT, shader_default18]
]);
var BlendMode = class extends EventDispatcher {
  /**
   * Constructs a new blend mode.
   *
   * @param {BlendFunction} blendFunction - The blend function to use.
   * @param {Number} opacity - The opacity of the color that will be blended with the base color.
   */
  constructor(blendFunction, opacity = 1) {
    super();
    this.blendFunction = blendFunction;
    this.opacity = new Uniform(opacity);
  }
  /**
   * Returns the blend function.
   *
   * @return {BlendFunction} The blend function.
   */
  getBlendFunction() {
    return this.blendFunction;
  }
  /**
   * Sets the blend function.
   *
   * @param {BlendFunction} blendFunction - The blend function.
   */
  setBlendFunction(blendFunction) {
    this.blendFunction = blendFunction;
    this.dispatchEvent({ type: "change" });
  }
  /**
   * Returns the blend function shader code.
   *
   * @return {String} The blend function shader code.
   */
  getShaderCode() {
    return blendFunctions.get(this.blendFunction);
  }
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/HalftoneShader.js
var HalftoneShader = {
  uniforms: {
    tDiffuse: { value: null },
    shape: { value: 1 },
    radius: { value: 2 },
    rotateR: { value: Math.PI / 12 * 1 },
    rotateG: { value: Math.PI / 12 * 2 },
    rotateB: { value: Math.PI / 12 * 3 },
    scatter: { value: 1 },
    width: { value: 20 },
    height: { value: 20 },
    blending: { value: 1 },
    blendingMode: { value: 1 },
    greyscale: { value: false },
    disable: { value: false }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUV;
		varying vec3 vPosition;

		void main() {

			vUV = uv;
			vPosition = position;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		#define SQRT2_MINUS_ONE 0.41421356
		#define SQRT2_HALF_MINUS_ONE 0.20710678
		#define PI2 6.28318531
		#define SHAPE_DOT 1
		#define SHAPE_ELLIPSE 2
		#define SHAPE_LINE 3
		#define SHAPE_SQUARE 4
		#define BLENDING_LINEAR 1
		#define BLENDING_MULTIPLY 2
		#define BLENDING_ADD 3
		#define BLENDING_LIGHTER 4
		#define BLENDING_DARKER 5
		uniform sampler2D tDiffuse;
		uniform float radius;
		uniform float rotateR;
		uniform float rotateG;
		uniform float rotateB;
		uniform float scatter;
		uniform float width;
		uniform float height;
		uniform int shape;
		uniform bool disable;
		uniform float blending;
		uniform int blendingMode;
		varying vec2 vUV;
		varying vec3 vPosition;
		uniform bool greyscale;
		const int samples = 8;

		float blend( float a, float b, float t ) {

		// linear blend
			return a * ( 1.0 - t ) + b * t;

		}

		float hypot( float x, float y ) {

		// vector magnitude
			return sqrt( x * x + y * y );

		}

		float rand( vec2 seed ){

		// get pseudo-random number
			return fract( sin( dot( seed.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );

		}

		float distanceToDotRadius( float channel, vec2 coord, vec2 normal, vec2 p, float angle, float rad_max ) {

		// apply shape-specific transforms
			float dist = hypot( coord.x - p.x, coord.y - p.y );
			float rad = channel;

			if ( shape == SHAPE_DOT ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

			} else if ( shape == SHAPE_ELLIPSE ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

				if ( dist != 0.0 ) {
					float dot_p = abs( ( p.x - coord.x ) / dist * normal.x + ( p.y - coord.y ) / dist * normal.y );
					dist = ( dist * ( 1.0 - SQRT2_HALF_MINUS_ONE ) ) + dot_p * dist * SQRT2_MINUS_ONE;
				}

			} else if ( shape == SHAPE_LINE ) {

				rad = pow( abs( rad ), 1.5) * rad_max;
				float dot_p = ( p.x - coord.x ) * normal.x + ( p.y - coord.y ) * normal.y;
				dist = hypot( normal.x * dot_p, normal.y * dot_p );

			} else if ( shape == SHAPE_SQUARE ) {

				float theta = atan( p.y - coord.y, p.x - coord.x ) - angle;
				float sin_t = abs( sin( theta ) );
				float cos_t = abs( cos( theta ) );
				rad = pow( abs( rad ), 1.4 );
				rad = rad_max * ( rad + ( ( sin_t > cos_t ) ? rad - sin_t * rad : rad - cos_t * rad ) );

			}

			return rad - dist;

		}

		struct Cell {

		// grid sample positions
			vec2 normal;
			vec2 p1;
			vec2 p2;
			vec2 p3;
			vec2 p4;
			float samp2;
			float samp1;
			float samp3;
			float samp4;

		};

		vec4 getSample( vec2 point ) {

		// multi-sampled point
			vec4 tex = texture2D( tDiffuse, vec2( point.x / width, point.y / height ) );
			float base = rand( vec2( floor( point.x ), floor( point.y ) ) ) * PI2;
			float step = PI2 / float( samples );
			// float dist = radius * 0.66;
			float dist = radius * 0.0;

			for ( int i = 0; i < samples; ++i ) {

				float r = base + step * float( i );
				vec2 coord = point + vec2( cos( r ) * dist, sin( r ) * dist );
				tex += texture2D( tDiffuse, vec2( coord.x / width, coord.y / height ) );

			}

			tex /= float( samples ) + 1.0;
			return tex;

		}

		float getDotColour( Cell c, vec2 p, int channel, float angle, float aa ) {

		// get colour for given point
			float dist_c_1, dist_c_2, dist_c_3, dist_c_4, res;

			if ( channel == 0 ) {

				c.samp1 = getSample( c.p1 ).r;
				c.samp2 = getSample( c.p2 ).r;
				c.samp3 = getSample( c.p3 ).r;
				c.samp4 = getSample( c.p4 ).r;

			} else if (channel == 1) {

				c.samp1 = getSample( c.p1 ).g;
				c.samp2 = getSample( c.p2 ).g;
				c.samp3 = getSample( c.p3 ).g;
				c.samp4 = getSample( c.p4 ).g;

			} else {

				c.samp1 = getSample( c.p1 ).b;
				c.samp3 = getSample( c.p3 ).b;
				c.samp2 = getSample( c.p2 ).b;
				c.samp4 = getSample( c.p4 ).b;

			}

			dist_c_1 = distanceToDotRadius( c.samp1, c.p1, c.normal, p, angle, radius );
			dist_c_2 = distanceToDotRadius( c.samp2, c.p2, c.normal, p, angle, radius );
			dist_c_3 = distanceToDotRadius( c.samp3, c.p3, c.normal, p, angle, radius );
			dist_c_4 = distanceToDotRadius( c.samp4, c.p4, c.normal, p, angle, radius );
			res = ( dist_c_1 > 0.0 ) ? clamp( dist_c_1 / aa, 0.0, 1.0 ) : 0.0;
			// res = 0.0;
			res += ( dist_c_2 > 0.0 ) ? clamp( dist_c_2 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_3 > 0.0 ) ? clamp( dist_c_3 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_4 > 0.0 ) ? clamp( dist_c_4 / aa, 0.0, 1.0 ) : 0.0;
			res = clamp( res, 0.0, 1.0 );

			return res;
			// return 2

		}

		Cell getReferenceCell( vec2 p, vec2 origin, float grid_angle, float step ) {

		// get containing cell
			Cell c;

		// calc grid
			vec2 n = vec2( cos( grid_angle ), sin( grid_angle ) );
			float threshold = step * 0.5;
			float dot_normal = n.x * ( p.x - origin.x ) + n.y * ( p.y - origin.y );
			float dot_line = -n.y * ( p.x - origin.x ) + n.x * ( p.y - origin.y );
			vec2 offset = vec2( n.x * dot_normal, n.y * dot_normal );
			float offset_normal = mod( hypot( offset.x, offset.y ), step );
			float normal_dir = ( dot_normal < 0.0 ) ? 1.0 : -1.0;
			float normal_scale = ( ( offset_normal < threshold ) ? -offset_normal : step - offset_normal ) * normal_dir;
			float offset_line = mod( hypot( ( p.x - offset.x ) - origin.x, ( p.y - offset.y ) - origin.y ), step );
			float line_dir = ( dot_line < 0.0 ) ? 1.0 : -1.0;
			float line_scale = ( ( offset_line < threshold ) ? -offset_line : step - offset_line ) * line_dir;

		// get closest corner
			c.normal = n;
			c.p1.x = p.x - n.x * normal_scale + n.y * line_scale;
			c.p1.y = p.y - n.y * normal_scale - n.x * line_scale;

		// scatter
			if ( scatter != 0.0 ) {

				float off_mag = scatter * threshold * 0.5;
				float off_angle = rand( vec2( floor( c.p1.x ), floor( c.p1.y ) ) ) * PI2;
				c.p1.x += cos( off_angle ) * off_mag;
				c.p1.y += sin( off_angle ) * off_mag;

			}

		// find corners
			float normal_step = normal_dir * ( ( offset_normal < threshold ) ? step : -step );
			float line_step = line_dir * ( ( offset_line < threshold ) ? step : -step );
			c.p2.x = c.p1.x - n.x * normal_step;
			c.p2.y = c.p1.y - n.y * normal_step;
			c.p3.x = c.p1.x + n.y * line_step;
			c.p3.y = c.p1.y - n.x * line_step;
			c.p4.x = c.p1.x - n.x * normal_step + n.y * line_step;
			c.p4.y = c.p1.y - n.y * normal_step - n.x * line_step;

			return c;

		}

		float blendColour( float a, float b, float t ) {

		// blend colours
			if ( blendingMode == BLENDING_LINEAR ) {
				return blend( a, b, 1.0 - t );
			} else if ( blendingMode == BLENDING_ADD ) {
				return blend( a, min( 1.0, a + b ), t );
			} else if ( blendingMode == BLENDING_MULTIPLY ) {
				return blend( a, max( 0.0, a * b ), t );
			} else if ( blendingMode == BLENDING_LIGHTER ) {
				return blend( a, max( a, b ), t );
			} else if ( blendingMode == BLENDING_DARKER ) {
				return blend( a, min( a, b ), t );
			} else {
				return blend( a, b, 1.0 - t );
			}

		}

		void main() {

			if ( ! disable ) {

		// setup
				vec2 p = vec2( vUV.x * width, vUV.y * height ) - vec2(vPosition.x, vPosition.y) * 3.0; // - position values to remove black borders.
				vec2 origin = vec2( 0, 0 );
				float aa = ( radius < 2.5 ) ? radius * 0.5 : 1.25;
				// float aa = 0.0;

		// get channel samples
				Cell cell_r = getReferenceCell( p, origin, rotateR, radius );
				Cell cell_g = getReferenceCell( p, origin, rotateG, radius );
				Cell cell_b = getReferenceCell( p, origin, rotateB, radius );
				float r = getDotColour( cell_r, p, 0, rotateR, aa );
				float g = getDotColour( cell_g, p, 1, rotateG, aa );
				float b = getDotColour( cell_b, p, 2, rotateB, aa );

		// blend with original
				vec4 colour = texture2D( tDiffuse, vUV );
				
				// add masking before blendColour
				if (colour.r == 0.0) {
					r = 0.0;
				} else {
					r = blendColour( r, colour.r, blending );
				}

				if (colour.g == 0.0) {
					g = 0.0;
				} else {
					g = blendColour( g, colour.g, blending );
				}

				if (colour.b == 0.0) {
					b = 0.0;
				} else {
					b = blendColour( b, colour.b, blending );
				}
				
				
				

				if ( greyscale ) {
					r = g = b = (r + b + g) / 3.0;
				}

				// add alpha channel to each r, g, b colors
				vec4 vR;
				vec4 vG;
				vec4 vB;
	
				// apply transparent to outside of mesh
				if (r == 0.0 && colour.r == 0.0) {
					vR = vec4( 0, 0, 0, 0 );
				} else {
					vR = vec4( r, 0, 0, 1 );
				}
	
				if (g == 0.0 && colour.g == 0.0) {
					vG = vec4( 0, 0, 0, 0 );
				} else {
					vG = vec4( 0, g, 0, 1 );
				}
	
				if (b == 0.0 && colour.b == 0.0) {
					vB = vec4( 0, 0, 0, 0 );
				} else {
					vB = vec4( 0, 0, b, 1 );
				}

				// gl_FragColor = vec4( r, g, b, 1.0 );
				gl_FragColor = vR + vG + vB;

			} else {

				gl_FragColor = texture2D( tDiffuse, vUV );

			}

		}`
  )
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/Pass.js
import {
  BufferGeometry as BufferGeometry3,
  Float32BufferAttribute as Float32BufferAttribute3,
  OrthographicCamera as OrthographicCamera3,
  Mesh as Mesh4
} from "three";
var Pass2 = class {
  constructor() {
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;
    this.renderToScreen = false;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
};
var _camera3 = new OrthographicCamera3(-1, 1, 1, -1, 0, 1);
var _geometry3 = new BufferGeometry3();
_geometry3.setAttribute(
  "position",
  new Float32BufferAttribute3([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)
);
_geometry3.setAttribute("uv", new Float32BufferAttribute3([0, 2, 0, 0, 2, 0], 2));
var FullScreenQuad2 = class {
  constructor(material) {
    this._mesh = new Mesh4(_geometry3, material);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(renderer) {
    renderer.render(this._mesh, _camera3);
  }
  get material() {
    return this._mesh.material;
  }
  set material(value) {
    this._mesh.material = value;
  }
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/lib/pp/HalftonePass.ts
var usePassedMeshSize = true;
var HalftonePass = class extends Pass2 {
  constructor(width, height, params) {
    super();
    if (HalftoneShader === void 0) {
      console.error("THREE.HalftonePass requires HalftoneShader");
    }
    this.uniforms = UniformsUtils3.clone(HalftoneShader.uniforms);
    this.material = new ShaderMaterial2({
      uniforms: this.uniforms,
      fragmentShader: HalftoneShader.fragmentShader,
      vertexShader: HalftoneShader.vertexShader
    });
    if (usePassedMeshSize) {
      this.uniforms.width.value = width;
      this.uniforms.height.value = height;
    }
    this.uniforms.disable.value = params["disable"];
    this.fsQuad = new FullScreenQuad2(this.material);
    this.blendMode = new BlendMode(BlendFunction.SCREEN);
    this.extensions = null;
  }
  render(renderer, writeBuffer, readBuffer) {
    this.material.uniforms["tDiffuse"].value = readBuffer.texture;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.fsQuad.render(renderer);
    }
  }
  setSize(width, height) {
    if (usePassedMeshSize) {
      this.uniforms.width.value = width;
      this.uniforms.height.value = height;
    }
  }
  initialize(renderer, alpha, frameBufferType) {
  }
  addEventListener() {
  }
  getAttributes() {
    return this.attributes;
  }
  getFragmentShader() {
    return HalftoneShader.fragmentShader;
  }
  getVertexShader() {
    return HalftoneShader.vertexShader;
  }
  update(renderer, inputBuffer, deltaTime) {
  }
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/PostProcessing/PostProcessing.tsx
import { Fragment as Fragment3, jsx as jsx6 } from "react/jsx-runtime";
function PostProcessing({ disable = false }) {
  const { gl, scene, camera, size } = useThree2();
  const composerRef = useRef3(null);
  const halftonePassRef = useRef3(null);
  const halftoneParams = useMemo3(
    () => ({
      shape: 1,
      radius: 2,
      rotateR: Math.PI / 12,
      rotateB: Math.PI / 12 * 2,
      rotateG: Math.PI / 12 * 3,
      scatter: 1,
      blending: 1,
      blendingMode: 1,
      greyscale: false
    }),
    []
  );
  useEffect4(() => {
    const effectComposer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const halftonePass = new HalftonePass(
      size.width,
      size.height,
      { ...halftoneParams, disable }
    );
    effectComposer.addPass(renderPass);
    effectComposer.addPass(halftonePass);
    composerRef.current = effectComposer;
    halftonePassRef.current = halftonePass;
    return () => {
      renderPass.dispose?.();
      if (halftonePass.fsQuad?.dispose) halftonePass.fsQuad.dispose();
      halftonePass.material?.dispose?.();
      effectComposer.renderTarget1?.dispose?.();
      effectComposer.renderTarget2?.dispose?.();
      composerRef.current = null;
      halftonePassRef.current = null;
    };
  }, [camera, gl, halftoneParams, scene]);
  useEffect4(() => {
    const composer = composerRef.current;
    if (!composer) return;
    composer.setSize(size.width, size.height);
    halftonePassRef.current?.setSize(size.width, size.height);
  }, [size.height, size.width]);
  useEffect4(() => {
    if (halftonePassRef.current?.uniforms?.disable) {
      halftonePassRef.current.uniforms.disable.value = disable;
    }
  }, [disable]);
  useFrame2((_, delta) => {
    const composer = composerRef.current;
    if (!composer) return;
    gl.autoClear = true;
    composer.render(delta);
  }, 1);
  return /* @__PURE__ */ jsx6(Fragment3, {});
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Controls/CameraControl.tsx
import CameraControls from "camera-controls";
import * as THREE3 from "three";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Controls/useCameraAnimation.ts
import { useEffect as useEffect5, useRef as useRef4 } from "react";
import { useFrame as useFrame3 } from "@react-three/fiber";
function useCameraAnimation({
  type,
  cAzimuthAngle,
  cPolarAngle,
  cDistance,
  cameraZoom,
  zoomOut,
  enableTransition = true
}) {
  const ref = useRef4();
  useFrame3((state, delta) => ref.current.update(delta));
  useEffect5(() => {
    const control = ref.current;
    control?.rotateTo(dToR(cAzimuthAngle), dToR(cPolarAngle), enableTransition);
  }, [ref, cAzimuthAngle, cPolarAngle, enableTransition]);
  useEffect5(() => {
    const control = ref.current;
    if (zoomOut) {
      if (type === "sphere") {
        control?.dollyTo(zoomOutSphere.distance, enableTransition);
        control?.zoomTo(zoomOutSphere.zoom, enableTransition);
      } else {
        control?.dollyTo(zoomOutPlanes.distance, enableTransition);
        control?.zoomTo(zoomOutPlanes.zoom, enableTransition);
      }
    } else {
      if (type === "sphere") {
        control?.zoomTo(cameraZoom, enableTransition);
        control?.dollyTo(defaultSphereDistance, enableTransition);
      } else {
        control?.dollyTo(cDistance, enableTransition);
        control?.zoomTo(defaultPlanesZoom, enableTransition);
      }
    }
  }, [ref, zoomOut, type, cameraZoom, cDistance, enableTransition]);
  return ref;
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Controls/CameraControl.tsx
import { extend, useThree as useThree3 } from "@react-three/fiber";
import { useEffect as useEffect6, useState as useState2 } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
function CameraControl({
  smoothTime = 0.05,
  // default smoothTime of "camera-conrols"
  ...props
}) {
  CameraControls.install({ THREE: THREE3 });
  extend({ CameraControls });
  const camera = useThree3((state) => state.camera);
  const gl = useThree3((state) => state.gl);
  const ref = useCameraAnimation(props);
  const [isUserControlling, setIsUserControlling] = useState2(false);
  useEffect6(() => {
    const control = ref.current;
    if (!control) return;
    const { type, onCameraUpdate } = props || {};
    if (!onCameraUpdate) return;
    const toDegrees = (radians) => Math.round(radians * 180 / Math.PI);
    const getAngles = () => ({
      cAzimuthAngle: toDegrees(control.azimuthAngle),
      cPolarAngle: toDegrees(control.polarAngle)
    });
    const getZoomDistance = () => {
      const result = {};
      if (type === "sphere") {
        const ctrlZoom = control?.zoom;
        if (Number.isFinite(ctrlZoom)) {
          result.cameraZoom = Number(ctrlZoom.toFixed(2));
        } else {
          const camZoom = control?.camera?.zoom;
          if (Number.isFinite(camZoom)) {
            result.cameraZoom = Number(camZoom.toFixed(2));
          }
        }
      } else {
        if (Number.isFinite(control.distance)) {
          result.cDistance = Number(control.distance.toFixed(2));
        }
      }
      return result;
    };
    const handleControlStart = () => {
      setIsUserControlling(true);
    };
    const handleRest = () => {
      setIsUserControlling(false);
      onCameraUpdate({ ...getAngles(), ...getZoomDistance() });
    };
    control.addEventListener("controlstart", handleControlStart);
    control.addEventListener("rest", handleRest);
    return () => {
      control.removeEventListener("controlstart", handleControlStart);
      control.removeEventListener("rest", handleRest);
    };
  }, [ref, props]);
  return (
    // @ts-ignore
    /* @__PURE__ */ jsx7(
      "cameraControls",
      {
        ref,
        args: [camera, gl.domElement],
        smoothTime: isUserControlling ? 0 : smoothTime,
        zoomSpeed: 10,
        dollySpeed: 5,
        maxDistance: 1e3,
        restThreshold: 0.01,
        mouseButtons: {
          left: CameraControls.ACTION.ROTATE,
          middle: props.type === "sphere" ? CameraControls.ACTION.ZOOM : CameraControls.ACTION.DOLLY,
          right: CameraControls.ACTION.NONE,
          // disabling pan for now, as we don't support camera position value in props
          wheel: props.type === "sphere" ? CameraControls.ACTION.ZOOM : CameraControls.ACTION.DOLLY
        },
        touches: {
          one: CameraControls.ACTION.ROTATE,
          two: CameraControls.ACTION.NONE,
          // disable touch pan (TRUCK)
          three: CameraControls.ACTION.NONE
        }
      }
    )
  );
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Controls/Controls.tsx
import { Fragment as Fragment4, jsx as jsx8 } from "react/jsx-runtime";
function Controls(props) {
  return /* @__PURE__ */ jsx8(Fragment4, { children: /* @__PURE__ */ jsx8(CameraControl, { ...props }) });
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/ShaderGradient.tsx
import qs from "query-string";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/GizmoHelper.tsx
import * as React6 from "react";
import { createPortal, useFrame as useFrame5, useThree as useThree7 } from "@react-three/fiber";
import {
  Matrix4,
  Object3D,
  Quaternion,
  Scene,
  Vector3
} from "three";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/OrthographicCamera.tsx
import * as React4 from "react";
import { useThree as useThree5, useFrame as useFrame4 } from "@react-three/fiber";

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/mergeRefs.ts
function assignRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function mergeRefs(refs) {
  return (value) => {
    for (const ref of refs) assignRef(ref, value);
  };
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/useFBO.tsx
import * as React3 from "react";
import * as THREE4 from "three";
import { useThree as useThree4 } from "@react-three/fiber";
function useFBO(width, height, settings) {
  const { gl, size, viewport } = useThree4();
  const _width = typeof width === "number" ? width : size.width * viewport.dpr;
  const _height = typeof height === "number" ? height : size.height * viewport.dpr;
  const _settings = (typeof width === "number" ? settings : width) || {};
  const { samples, ...targetSettings } = _settings;
  const target2 = React3.useMemo(() => {
    let target3;
    target3 = new THREE4.WebGLRenderTarget(_width, _height, {
      minFilter: THREE4.LinearFilter,
      magFilter: THREE4.LinearFilter,
      encoding: gl.outputEncoding,
      type: THREE4.HalfFloatType,
      ...targetSettings
    });
    target3.samples = samples;
    return target3;
  }, []);
  React3.useLayoutEffect(() => {
    target2.setSize(_width, _height);
    if (samples) target2.samples = samples;
  }, [samples, target2, _width, _height]);
  React3.useEffect(() => {
    return () => target2.dispose();
  }, []);
  return target2;
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/OrthographicCamera.tsx
import { Fragment as Fragment5, jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
var isFunction = (node) => typeof node === "function";
var OrthographicCamera4 = React4.forwardRef(
  ({
    envMap,
    resolution = 256,
    frames = Infinity,
    children,
    makeDefault,
    ...props
  }, ref) => {
    const set = useThree5(({ set: set2 }) => set2);
    const camera = useThree5(({ camera: camera2 }) => camera2);
    const size = useThree5(({ size: size2 }) => size2);
    const cameraRef = React4.useRef(null);
    const groupRef = React4.useRef(null);
    const fbo = useFBO(resolution);
    React4.useLayoutEffect(() => {
      if (!props.manual) {
        cameraRef.current.updateProjectionMatrix();
      }
    }, [size, props]);
    React4.useLayoutEffect(() => {
      cameraRef.current.updateProjectionMatrix();
    });
    React4.useLayoutEffect(() => {
      if (makeDefault) {
        const oldCam = camera;
        set(() => ({ camera: cameraRef.current }));
        return () => set(() => ({ camera: oldCam }));
      }
    }, [cameraRef, makeDefault, set]);
    let count = 0;
    let oldEnvMap = null;
    const functional = isFunction(children);
    useFrame4((state) => {
      if (functional && (frames === Infinity || count < frames)) {
        groupRef.current.visible = false;
        state.gl.setRenderTarget(fbo);
        oldEnvMap = state.scene.background;
        if (envMap) state.scene.background = envMap;
        state.gl.render(state.scene, cameraRef.current);
        state.scene.background = oldEnvMap;
        state.gl.setRenderTarget(null);
        groupRef.current.visible = true;
        count++;
      }
    });
    return /* @__PURE__ */ jsxs4(Fragment5, { children: [
      /* @__PURE__ */ jsx9(
        "orthographicCamera",
        {
          left: size.width / -2,
          right: size.width / 2,
          top: size.height / 2,
          bottom: size.height / -2,
          ref: mergeRefs([cameraRef, ref]),
          ...props,
          children: !functional && children
        }
      ),
      /* @__PURE__ */ jsx9("group", { ref: groupRef, children: functional && children(fbo.texture) })
    ] });
  }
);

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/useCamera.tsx
import * as React5 from "react";
import { Raycaster, Camera } from "three";
import { useThree as useThree6, applyProps } from "@react-three/fiber";
function useCamera(camera, props) {
  const pointer = useThree6((state) => state.pointer);
  const [raycast] = React5.useState(() => {
    const raycaster = new Raycaster();
    if (props) applyProps(raycaster, props, {});
    return function(_, intersects) {
      raycaster.setFromCamera(
        pointer,
        camera instanceof Camera ? camera : camera.current
      );
      const rc = this.constructor.prototype.raycast.bind(this);
      if (rc) rc(raycaster, intersects);
    };
  });
  return raycast;
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/GizmoHelper.tsx
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
var Context2 = React6.createContext(
  {}
);
var useGizmoContext = () => {
  return React6.useContext(Context2);
};
var turnRate = 2 * Math.PI;
var dummy = new Object3D();
var matrix = new Matrix4();
var [q1, q2] = [new Quaternion(), new Quaternion()];
var target = new Vector3();
var targetPosition = new Vector3();
var isOrbitControls = (controls) => {
  return "minPolarAngle" in controls;
};
var GizmoHelper = ({
  alignment = "bottom-right",
  margin = [80, 80],
  renderPriority = 0,
  autoClear = true,
  onUpdate,
  onTarget,
  children: GizmoHelperComponent
}) => {
  const size = useThree7(({ size: size2 }) => size2);
  const mainCamera = useThree7(({ camera }) => camera);
  const defaultControls = useThree7(
    ({ controls }) => controls
  );
  const gl = useThree7(({ gl: gl2 }) => gl2);
  const scene = useThree7(({ scene: scene2 }) => scene2);
  const invalidate = useThree7(({ invalidate: invalidate2 }) => invalidate2);
  const backgroundRef = React6.useRef();
  const gizmoRef = React6.useRef();
  const virtualCam = React6.useRef(null);
  const [virtualScene] = React6.useState(() => new Scene());
  const animating = React6.useRef(false);
  const radius = React6.useRef(0);
  const focusPoint = React6.useRef(new Vector3(0, 0, 0));
  const defaultUp = React6.useRef(new Vector3(0, 0, 0));
  React6.useEffect(() => {
    defaultUp.current.copy(mainCamera.up);
  }, [mainCamera]);
  const tweenCamera = React6.useCallback(
    (direction) => {
      animating.current = true;
      if (defaultControls || onTarget)
        focusPoint.current = defaultControls?.target || onTarget?.();
      radius.current = mainCamera.position.distanceTo(target);
      q1.copy(mainCamera.quaternion);
      targetPosition.copy(direction).multiplyScalar(radius.current).add(target);
      dummy.lookAt(targetPosition);
      q2.copy(dummy.quaternion);
      invalidate();
    },
    [defaultControls, mainCamera, onTarget, invalidate]
  );
  React6.useEffect(() => {
    if (scene.background) {
      backgroundRef.current = scene.background;
      scene.background = null;
      virtualScene.background = backgroundRef.current;
    }
    return () => {
      if (backgroundRef.current) scene.background = backgroundRef.current;
    };
  }, []);
  useFrame5((_, delta) => {
    if (virtualCam.current && gizmoRef.current) {
      if (animating.current) {
        if (q1.angleTo(q2) < 0.01) {
          animating.current = false;
          if (isOrbitControls(defaultControls)) {
            mainCamera.up.copy(defaultUp.current);
          }
        } else {
          const step = delta * turnRate;
          q1.rotateTowards(q2, step);
          mainCamera.position.set(0, 0, 1).applyQuaternion(q1).multiplyScalar(radius.current).add(focusPoint.current);
          mainCamera.up.set(0, 1, 0).applyQuaternion(q1).normalize();
          mainCamera.quaternion.copy(q1);
          if (onUpdate) onUpdate();
          else if (defaultControls) defaultControls.update();
          invalidate();
        }
      }
      matrix.copy(mainCamera.matrix).invert();
      gizmoRef.current?.quaternion.setFromRotationMatrix(matrix);
      if (autoClear) gl.autoClear = false;
      gl.clearDepth();
      gl.render(virtualScene, virtualCam.current);
    }
  }, renderPriority);
  const raycast = useCamera(virtualCam);
  const gizmoHelperContext = React6.useMemo(
    () => ({ tweenCamera, raycast }),
    [tweenCamera]
  );
  const [marginX, marginY] = margin;
  const x = alignment.endsWith("-center") ? 0 : alignment.endsWith("-left") ? -size.width / 2 + marginX : size.width / 2 - marginX;
  const y = alignment.startsWith("center-") ? 0 : alignment.startsWith("top-") ? size.height / 2 - marginY : -size.height / 2 + marginY;
  return createPortal(
    /* @__PURE__ */ jsxs5(Context2.Provider, { value: gizmoHelperContext, children: [
      /* @__PURE__ */ jsx10(OrthographicCamera4, { ref: virtualCam, position: [0, 0, 200] }),
      /* @__PURE__ */ jsx10("group", { ref: gizmoRef, position: [x, y, 0], children: GizmoHelperComponent })
    ] }),
    virtualScene
  );
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/GizmoViewport.tsx
import * as React7 from "react";
import { useThree as useThree8 } from "@react-three/fiber";
import { CanvasTexture } from "three";
import { Fragment as Fragment6, jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
function Axis({ scale = [0.8, 0.05, 0.05], color, rotation }) {
  return /* @__PURE__ */ jsx11("group", { rotation, children: /* @__PURE__ */ jsxs6("mesh", { position: [0.4, 0, 0], children: [
    /* @__PURE__ */ jsx11("boxGeometry", { args: scale }),
    /* @__PURE__ */ jsx11("meshBasicMaterial", { color, toneMapped: false })
  ] }) });
}
function AxisHead({
  onClick,
  font,
  disabled,
  arcStyle,
  label,
  labelColor,
  axisHeadScale = 1,
  ...props
}) {
  const gl = useThree8((state) => state.gl);
  const texture = React7.useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.arc(32, 32, 16, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = arcStyle;
    context.fill();
    if (label) {
      context.font = font;
      context.textAlign = "center";
      context.fillStyle = labelColor;
      context.fillText(label, 32, 41);
    }
    return new CanvasTexture(canvas);
  }, [arcStyle, label, labelColor, font]);
  const [active, setActive] = React7.useState(false);
  const scale = (label ? 1 : 0.75) * (active ? 1.2 : 1) * axisHeadScale;
  const handlePointerOver = (e) => {
    e.stopPropagation();
    setActive(true);
  };
  const handlePointerOut = (e) => {
    e.stopPropagation();
    setActive(false);
  };
  return /* @__PURE__ */ jsx11(
    "sprite",
    {
      scale,
      onPointerOver: !disabled ? handlePointerOver : void 0,
      onPointerOut: !disabled ? onClick || handlePointerOut : void 0,
      ...props,
      children: /* @__PURE__ */ jsx11(
        "spriteMaterial",
        {
          map: texture,
          "map-encoding": gl.outputEncoding,
          "map-anisotropy": gl.capabilities.getMaxAnisotropy() || 1,
          alphaTest: 0.3,
          opacity: label ? 1 : 0.75,
          toneMapped: false
        }
      )
    }
  );
}
var GizmoViewport = ({
  hideNegativeAxes,
  hideAxisHeads,
  disabled,
  font = "18px Inter var, Arial, sans-serif",
  axisColors = ["#ff2060", "#20df80", "#2080ff"],
  axisHeadScale = 1,
  axisScale,
  labels = ["X", "Y", "Z"],
  labelColor = "#000",
  onClick,
  ...props
}) => {
  const [colorX, colorY, colorZ] = axisColors;
  const { tweenCamera, raycast } = useGizmoContext();
  const axisHeadProps = {
    font,
    disabled,
    labelColor,
    raycast,
    onClick,
    axisHeadScale,
    onPointerDown: !disabled ? (e) => {
      tweenCamera(e.object.position);
      e.stopPropagation();
    } : void 0
  };
  return /* @__PURE__ */ jsxs6("group", { scale: 40, ...props, children: [
    /* @__PURE__ */ jsx11(Axis, { color: colorX, rotation: [0, 0, 0], scale: axisScale }),
    /* @__PURE__ */ jsx11(Axis, { color: colorY, rotation: [0, 0, Math.PI / 2], scale: axisScale }),
    /* @__PURE__ */ jsx11(Axis, { color: colorZ, rotation: [0, -Math.PI / 2, 0], scale: axisScale }),
    !hideAxisHeads && /* @__PURE__ */ jsxs6(Fragment6, { children: [
      /* @__PURE__ */ jsx11(
        AxisHead,
        {
          arcStyle: colorX,
          position: [1, 0, 0],
          label: labels[0],
          ...axisHeadProps
        }
      ),
      /* @__PURE__ */ jsx11(
        AxisHead,
        {
          arcStyle: colorY,
          position: [0, 1, 0],
          label: labels[1],
          ...axisHeadProps
        }
      ),
      /* @__PURE__ */ jsx11(
        AxisHead,
        {
          arcStyle: colorZ,
          position: [0, 0, 1],
          label: labels[2],
          ...axisHeadProps
        }
      ),
      !hideNegativeAxes && /* @__PURE__ */ jsxs6(Fragment6, { children: [
        /* @__PURE__ */ jsx11(
          AxisHead,
          {
            arcStyle: colorX,
            position: [-1, 0, 0],
            ...axisHeadProps
          }
        ),
        /* @__PURE__ */ jsx11(
          AxisHead,
          {
            arcStyle: colorY,
            position: [0, -1, 0],
            ...axisHeadProps
          }
        ),
        /* @__PURE__ */ jsx11(
          AxisHead,
          {
            arcStyle: colorZ,
            position: [0, 0, -1],
            ...axisHeadProps
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx11("ambientLight", { intensity: 0.5 }),
    /* @__PURE__ */ jsx11("pointLight", { position: [10, 10, 10], intensity: 0.5 })
  ] });
};

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/Axis/Axis.tsx
import { Fragment as Fragment7, jsx as jsx12 } from "react/jsx-runtime";
function Axis2({ margin = [65, 110] }) {
  return /* @__PURE__ */ jsx12(Fragment7, { children: /* @__PURE__ */ jsx12(
    GizmoHelper,
    {
      alignment: "bottom-right",
      margin,
      renderPriority: 2,
      children: /* @__PURE__ */ jsx12(
        GizmoViewport,
        {
          axisColors: ["#FF430A", "#FF430A", "#FF430A"],
          labelColor: "white",
          hideNegativeAxes: true,
          axisHeadScale: 0.8
        }
      )
    }
  ) });
}

// foundations/shadergradient/packages/shadergradient/src/ShaderGradient/ShaderGradient.tsx
import { Fragment as Fragment8, jsx as jsx13, jsxs as jsxs7 } from "react/jsx-runtime";
function ShaderGradient(passedProps) {
  const { control, urlString, onCameraUpdate, ...rest } = {
    ...presets.halo.props,
    ...passedProps
  };
  let props = rest;
  if (control === "query")
    props = qs.parse(formatUrlString(urlString), {
      parseNumbers: true,
      parseBooleans: true,
      arrayFormat: "index"
    });
  const { lightType, envPreset, brightness, grain, toggleAxis, ...others } = props;
  return /* @__PURE__ */ jsxs7(Fragment8, { children: [
    /* @__PURE__ */ jsx13(Mesh, { ...props }),
    /* @__PURE__ */ jsx13(
      Lights,
      {
        lightType,
        brightness,
        envPreset
      }
    ),
    grain !== "off" && /* @__PURE__ */ jsx13(PostProcessing, {}),
    toggleAxis && /* @__PURE__ */ jsx13(Axis2, {}),
    /* @__PURE__ */ jsx13(Controls, { ...props, onCameraUpdate })
  ] });
}

// foundations/shadergradient/packages/shadergradient/src/FramerControls.ts
var propertyControls = (ControlType, type = "") => ({
  control: {
    type: ControlType.Enum,
    options: ["props", "query"],
    optionTitles: ["Props", "Query"],
    displaySegmentedControl: true,
    defaultValue: type === "stateless" ? "query" : "props"
  },
  activeTab: {
    title: "Settings Group",
    type: ControlType.Enum,
    options: ["Shape", "Colors", "Effects", "View"],
    hidden: (props) => props.control === "query"
  },
  // Shape
  type: {
    type: ControlType.Enum,
    options: ["plane", "sphere", "waterPlane"],
    optionTitles: ["Plane", "Sphere", "Water"],
    displaySegmentedControl: true,
    hidden: (props) => props.control === "query" || props.activeTab !== "Shape"
  },
  // shader: {
  //   type: ControlType.Enum,
  //   options: ['defaults', 'positionMix', 'glass'],
  //   optionTitles: ['Type A', 'Type B', 'Type C'],
  //   displaySegmentedControl: true,
  //   hidden: (props) => props.control === 'query' || props.activeTab !== 'Shape',
  // },
  animate: {
    type: ControlType.Enum,
    options: ["on", "off"],
    optionTitles: ["On", "Off"],
    displaySegmentedControl: true,
    hidden: (props) => props.control === "query" || props.activeTab !== "Shape" && props.activeTab !== "URL"
  },
  uTime: {
    title: "Movements",
    type: ControlType.Number,
    step: 0.1,
    displayStepper: true,
    hidden: (props) => props.animate === "on" || props.control === "query" || props.activeTab !== "Shape"
  },
  uSpeed: {
    title: "Speed",
    type: ControlType.Number,
    step: 0.1,
    min: 0.1,
    displayStepper: true,
    defaultValue: 0.4,
    hidden: (props) => props.animate === "off" || props.control === "query" || props.activeTab !== "Shape"
  },
  noise: {
    type: ControlType.Object,
    controls: {
      uStrength: {
        type: ControlType.Number,
        title: "Strength",
        step: 0.1,
        min: 0.1,
        displayStepper: true,
        defaultValue: 4
      },
      uDensity: {
        type: ControlType.Number,
        title: "Density",
        step: 0.1,
        min: 0.1,
        displayStepper: true,
        defaultValue: 1.3
      }
      // uFrequency: {
      //     type: ControlType.Number,
      //     step: 0.1,
      //     min: 0.1,
      //     displayStepper: true,
      //     hidden: (props) =>
      //         props.type !== "sphere" ||
      //         props.control === "query" ||
      //         props.activeTab !== "Shape",
      // },
    },
    hidden: (props) => props.control === "query" || props.activeTab !== "Shape"
  },
  uAmplitude: {
    type: ControlType.Number,
    title: "Spiral",
    step: 0.1,
    min: 0.1,
    displayStepper: true,
    defaultValue: 1,
    hidden: (props) => props.type !== "sphere" || props.control === "query" || props.activeTab !== "Shape"
  },
  // Effects
  grain: {
    type: ControlType.Enum,
    options: ["on", "off"],
    optionTitles: ["On", "Off"],
    displaySegmentedControl: true,
    hidden: (props) => props.control === "query" || props.activeTab !== "Effects"
  },
  lightType: {
    type: ControlType.Enum,
    options: ["env", "3d"],
    optionTitles: ["Env", "Light"],
    displaySegmentedControl: true,
    defaultValue: "3d",
    hidden: (props) => props.control === "query" || props.activeTab !== "Effects"
  },
  envPreset: {
    type: ControlType.Enum,
    options: ["city", "dawn", "lobby"],
    optionTitles: ["City", "Dawn", "Lobby"],
    displaySegmentedControl: true,
    hidden: (props) => props.lightType === "3d" || props.control === "query" || props.activeTab !== "Effects"
  },
  brightness: {
    type: ControlType.Number,
    step: 0.1,
    min: 0.1,
    max: 3,
    defaultValue: 1.2,
    hidden: (props) => props.lightType === "env" || props.control === "query" || props.activeTab !== "Effects" || props.url
  },
  reflection: {
    type: ControlType.Number,
    step: 0.1,
    min: 0,
    max: 1,
    defaultValue: 0.1,
    hidden: (props) => props.lightType === "3d" || props.control === "query" || props.activeTab !== "Effects" || props.url
  },
  // Colors
  color1: {
    type: ControlType.Color,
    defaultValue: "#ff5005",
    hidden: (props) => props.control === "query" || props.activeTab !== "Colors"
  },
  color2: {
    type: ControlType.Color,
    defaultValue: "#dbba95",
    hidden: (props) => props.control === "query" || props.activeTab !== "Colors"
  },
  color3: {
    type: ControlType.Color,
    defaultValue: "#d0bce1",
    hidden: (props) => props.control === "query" || props.activeTab !== "Colors"
  },
  // View
  cDistance: {
    title: "Distance",
    type: ControlType.Number,
    displayStepper: true,
    min: 0,
    max: 20,
    defaultValue: 3.6,
    hidden: (props) => props.type === "sphere" || props.control === "query" || props.activeTab !== "View"
  },
  cameraZoom: {
    type: ControlType.Number,
    displayStepper: true,
    step: 0.1,
    min: 0.1,
    max: 30,
    defaultValue: 1,
    hidden: (props) => props.type !== "sphere" || props.control === "query" || props.activeTab !== "View"
  },
  cameraAngle: {
    type: ControlType.Object,
    controls: {
      cAzimuthAngle: {
        title: "Azimuth",
        type: ControlType.Number,
        displayStepper: true,
        step: 10,
        min: 0,
        max: 360,
        defaultValue: 180
      },
      cPolarAngle: {
        title: "Polar",
        type: ControlType.Number,
        displayStepper: true,
        step: 10,
        min: 0,
        max: 180,
        defaultValue: 90
      }
    },
    hidden: (props) => props.control === "query" || props.activeTab !== "View"
  },
  position: {
    type: ControlType.Object,
    controls: {
      positionX: {
        type: ControlType.Number,
        step: 0.1,
        displayStepper: true,
        defaultValue: -1.4
      },
      positionY: {
        type: ControlType.Number,
        step: 0.1,
        displayStepper: true,
        defaultValue: 0
      },
      positionZ: {
        type: ControlType.Number,
        step: 0.1,
        displayStepper: true,
        defaultValue: 0
      }
    },
    hidden: (props) => props.control === "query" || props.activeTab !== "View"
  },
  rotation: {
    type: ControlType.Object,
    controls: {
      rotationX: {
        type: ControlType.Number,
        step: 10,
        min: -360,
        max: 360,
        displayStepper: true,
        defaultValue: 0
      },
      rotationY: {
        type: ControlType.Number,
        step: 10,
        min: -360,
        max: 360,
        displayStepper: true,
        defaultValue: 10
      },
      rotationZ: {
        type: ControlType.Number,
        step: 10,
        min: -360,
        max: 360,
        displayStepper: true,
        defaultValue: 50
      }
    },
    hidden: (props) => props.control === "query" || props.activeTab !== "View"
  },
  // urlString
  urlString: {
    type: ControlType.String,
    placeholder: "URL from shadergradient.co",
    defaultValue: type === "stateless" ? "" : "https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23ff5005&color2=%23dbba95&color3=%23d0bce1&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=disabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false",
    hidden: (props) => props.control === "props"
  },
  // Tools (🧰)
  zoomOut: {
    type: ControlType.Boolean,
    title: "View",
    enabledTitle: "Wide",
    disabledTitle: "-",
    defaultValue: false,
    hidden: (props) => props.control === "query"
  },
  toggleAxis: {
    type: ControlType.Boolean,
    title: "Axis",
    enabledTitle: "Guide",
    disabledTitle: "-",
    defaultValue: false,
    hidden: (props) => props.control === "query"
  },
  enableTransition: {
    type: ControlType.Boolean,
    title: "Camera Transition",
    enabledTitle: "Smooth",
    disabledTitle: "Instant",
    defaultValue: true,
    hidden: (props) => props.control === "query"
  },
  enableCameraUpdate: {
    type: ControlType.Boolean,
    title: "Camera Update",
    enabledTitle: "On",
    disabledTitle: "Off",
    defaultValue: false,
    hidden: (props) => type !== "stateless"
  },
  pointerEvents: {
    type: ControlType.Enum,
    title: "Touch Control",
    options: ["none", "auto"],
    optionTitles: ["Disable", "Enable"],
    displaySegmentedControl: true,
    hidden: (props) => props.control === "query"
  },
  lazyLoad: {
    type: ControlType.Boolean,
    defaultValue: true
  },
  threshold: {
    type: ControlType.Number,
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0.1,
    displayStepper: true,
    title: "\u21B3 Threshold",
    hidden: (props) => !props.lazyLoad
  },
  rootMargin: {
    type: ControlType.String,
    placeholder: "0px",
    defaultValue: "0px",
    title: "\u21B3 Root Margin",
    description: 'Offset before triggering (e.g., "100px", "-50px")',
    hidden: (props) => !props.lazyLoad
  },
  canvas: {
    type: ControlType.Object,
    title: "Canvas",
    controls: {
      pixelDensity: {
        type: ControlType.Number,
        step: 0.1,
        min: 0,
        max: 3,
        displayStepper: true,
        defaultValue: 1
      },
      fov: {
        type: ControlType.Number,
        step: 1,
        min: 10,
        max: 180,
        displayStepper: true,
        defaultValue: 45
      },
      preserveDrawingBuffer: {
        type: ControlType.Boolean,
        title: "Keep Buffer",
        defaultValue: false
      },
      powerPreference: {
        type: ControlType.Enum,
        title: "Power Pref",
        options: ["default", "high-performance", "low-power"],
        optionTitles: ["Auto", "High", "Low"],
        displaySegmentedControl: true,
        defaultValue: "low-power"
      }
    }
  }
});
export {
  ShaderGradient,
  ShaderGradientCanvas,
  formatFramerProps,
  formatUrlString,
  initialActivePreset,
  mergeCanvasProps,
  presets,
  presetsArray,
  propertyControls,
  useShaderGradientCanvasContext
};
