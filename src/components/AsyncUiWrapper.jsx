import React, { useRef, useEffect } from "react";
import AsyncAPIStandalone from "@asyncapi/react-component/browser/standalone";

const configs = {};
const customCss = "@import url('/asyncapi.css');";

export default function AsyncUiWrapper() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current?.attachShadow) {
      try {
        const shadowRoot = containerRef.current.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = customCss;
        shadowRoot.appendChild(style);

        const asyncDiv = document.createElement("div");
        shadowRoot.appendChild(asyncDiv);

        AsyncAPIStandalone.render(
          {
            schema: {
              url: "/mqtt-api.yaml",
            },
            config: configs,
          },
          asyncDiv,
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return <div ref={containerRef}></div>;
}
