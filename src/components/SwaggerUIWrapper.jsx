import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import SwaggerUI from "swagger-ui-react";

const configs = {
  url: "/rest-api.yaml",
  showCommonExtensions: true,
  displayRequestDuration: true,
  defaultModelsExpandDepth: -1,
  requestSnippetsEnabled: true,
};

const customCss = `
@import url('/swagger-ui.css');
.swagger-ui .information-container {
  display: none;
}
.swagger-ui .scheme-container {
    box-shadow: none;
    background-color: transparent;
}
.swagger-ui .wrapper {
    padding: 0;
}
.swagger-ui .copy-to-clipboard {
    transition: none !important;
}
.swagger-ui .btn {
  transition: none !important;
  box-shadow: none !important;
}
.swagger-ui a {
  color: var(--ifm-link-color);
  text-decoration: var(--ifm-link-decoration);
  transition: color var(--ifm-transition-fast) var(--ifm-transition-timing-default);
}
.swagger-ui a:hover {
  text-decoration: var(--ifm-link-hover-decoration);
}
.swagger-ui .model-box-control:focus,
.swagger-ui .models-control:focus,
.swagger-ui .opblock-summary-control:focus {
  outline: none !important;
}
.swagger-ui .opblock-tag {
  padding-right: 0.35rem;
}
`;

export default () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current?.attachShadow) {
      try {
        const shadowRoot = containerRef.current.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = customCss;
        shadowRoot.appendChild(style);

        const div = document.createElement("div");
        shadowRoot.appendChild(div);

        const root = ReactDOM.createRoot(div);
        root.render(<SwaggerUI {...configs} />);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return <div ref={containerRef}></div>;
};
