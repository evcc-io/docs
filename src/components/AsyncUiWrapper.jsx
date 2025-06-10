import React, { useRef, useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import CodeBlock from "@theme/CodeBlock";
import mqttApiYaml from "!!raw-loader!../../static/mqtt-api.yaml";

const configs = {
  show: {
    info: false,
  },
  expand: {
    messageExamples: true,
  },
};

const customCss = "@import url('/asyncapi.css');";

function AsyncUiComponent() {
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

        import("@asyncapi/react-component/browser/standalone")
          .then((module) => {
            module.default.render(
              {
                schema: { url: "/mqtt-api.yaml" },
                config: configs,
              },
              asyncDiv,
            );
          })
          .catch((error) => console.error("AsyncAPI render error:", error));
      } catch (error) {
        console.error("Shadow DOM error:", error);
      }
    }
  }, []);

  return <div ref={containerRef}></div>;
}

export default function AsyncUiWrapper() {
  return (
    <BrowserOnly
      fallback={
        <CodeBlock language="yaml" title="mqtt-api.yaml">
          {mqttApiYaml}
        </CodeBlock>
      }
    >
      {() => <AsyncUiComponent />}
    </BrowserOnly>
  );
}
