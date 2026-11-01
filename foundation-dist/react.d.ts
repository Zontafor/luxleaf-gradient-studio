import type * as React from 'react';
import type {GradientT} from './types.js';
export * from '@shadergradient/react';
export * from './types.js';
export type {GradientT,MeshT,Position,Rotation,ShaderGradientType,typeT,animateT,LightTypeT,EnvironmentPresetT,LightsT} from './types.js';
type ShaderGradientCanvasProps = {
  children: React.ReactNode
  style?: React.CSSProperties
  pixelDensity?: number
  fov?: number
  pointerEvents?: 'none' | 'auto'
  className?: string
  envBasePath?: string
  lazyLoad?: boolean
  threshold?: number
  rootMargin?: string
  preserveDrawingBuffer?: boolean
  powerPreference?: WebGLPowerPreference
}
export declare function ShaderGradient(props:GradientT):React.JSX.Element;
export declare function ShaderGradientCanvas(props:ShaderGradientCanvasProps):React.JSX.Element;
export declare function useShaderGradientCanvasContext():{envBasePath?:string};
export declare function mergeCanvasProps(input:{queryPixelDensity?:number;queryFov?:number;queryPreserveDrawingBuffer?:boolean;queryPowerPreference?:WebGLPowerPreference;props:Record<string,unknown>;defaultPixelDensity?:number;defaultFov?:number}):{pixelDensity:number;fov:number;preserveDrawingBuffer?:boolean;powerPreference?:WebGLPowerPreference};
