import React from "react";
import {
  ShaderGradient,
  ShaderGradientCanvas,
  propertyControls,
  formatFramerProps,
} from "./react-engine.js";
/** Host injection keeps proprietary editor runtimes out of the package. */
export function createFramerComponent(host: {
  ControlType: any;
  addPropertyControls: (component: any, controls: any) => void;
}) {
  function LuxLeafGradient(props: any) {
    const flat = formatFramerProps(props);
    return (
      <ShaderGradientCanvas
        style={{ width: "100%", height: "100%" }}
        pixelDensity={Math.min(2, flat.pixelDensity ?? 1)}
        fov={flat.fov}
        preserveDrawingBuffer={flat.preserveDrawingBuffer}
      >
        <ShaderGradient {...flat} />
      </ShaderGradientCanvas>
    );
  }
  host.addPropertyControls(LuxLeafGradient, propertyControls(host.ControlType));
  return LuxLeafGradient;
}
