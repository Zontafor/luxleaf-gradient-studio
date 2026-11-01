import { createApp, h, ref } from "vue";
import { ShaderGradientCanvas, ShaderGradient } from "../src/vue";
import "./style.css";
createApp({
  setup() {
    const type = ref<"plane" | "sphere" | "waterPlane">("sphere");
    return () =>
      h("main", [
        h("h1", "LuxLeaf · Vue rendering"),
        h("p", "The same complete gradient engine in a Vue host."),
        h(
          "select",
          {
            "aria-label": "Geometry",
            value: type.value,
            onChange: (e: Event) =>
              (type.value = (e.target as HTMLSelectElement).value as
                | "plane"
                | "sphere"
                | "waterPlane"),
          },
          ["plane", "sphere", "waterPlane"].map((x) => h("option", x)),
        ),
        h("section", { class: "preview" }, [
          h(
            ShaderGradientCanvas,
            {
              preserveDrawingBuffer: true,
              lazyLoad: false,
              style: { width: "100%", height: "100%" },
            },
            {
              default: () =>
                h(ShaderGradient, {
                  type: type.value,
                  color1: "#114d40",
                  color2: "#b2d8b4",
                  color3: "#e2be6b",
                  lightType: "3d",
                  grain: "off",
                }),
            },
          ),
        ]),
        h("a", { href: "/advanced.html" }, "React workbench"),
      ]);
  },
}).mount("#root");
