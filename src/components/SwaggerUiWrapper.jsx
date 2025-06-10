import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import SwaggerUI from "swagger-ui-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import CodeBlock from "@theme/CodeBlock";
import restApiYaml from "!!raw-loader!../../static/rest-api.yaml";

const configs = {
  url: "/rest-api.yaml",
  showCommonExtensions: true,
  displayRequestDuration: true,
  defaultModelsExpandDepth: -1,
  requestSnippetsEnabled: true,
};

let customCss = `
@import url('/swagger-ui.css');
.swagger-ui,
.swagger-ui .opblock-tag,
.swagger-ui .opblock-description-wrapper,
.swagger-ui .opblock-description-wrapper p,
.swagger-ui .opblock-external-docs-wrapper,
.swagger-ui .opblock-title_normal,
.swagger-ui table thead tr td,
.swagger-ui table thead tr th,
.swagger-ui .response-col_links,
.swagger-ui .response-col_status,
.swagger-ui .parameter__name,
.swagger-ui .parameter__type,
.swagger-ui .tab li,
.swagger-ui .btn,
.swagger-ui .opblock .opblock-summary-path,
.swagger-ui .opblock .opblock-summary-description,
.swagger-ui .opblock .opblock-section-header h4,
.swagger-ui .responses-inner h4,
.swagger-ui .responses-inner h5 {
  color: var(--ifm-font-color-base);
}
.swagger-ui .opblock-control-arrow path,
.swagger-ui .authorization__btn path {
  fill: var(--ifm-font-color-base);
}
.swagger-ui .parameter__name.required span,
.swagger-ui .parameter__name.required:after {
  color: var(--ifm-color-danger);
}
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
.swagger-ui select {
  box-shadow: none !important;
}
.swagger-ui input {
  color: var(--lt-color-text-dark); 
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
.swagger-ui .opblock .opblock-section-header {
  background-color: var(--ifm-background-color);
}
.swagger-ui .opblock .opblock-summary .view-line-link {
  width: 24px;
  height: 24px;
  opacity: 0;
  margin: 0 5px;
  transition: opacity 0.2s ease-in-out;
}
.swagger-ui .opblock .opblock-summary:hover .view-line-link {
  opacity: 1;
}
.swagger-ui .opblock .opblock-summary-method {
  align-self: flex-start;
}
.swagger-ui table.model tbody tr td:first-of-type {
  width: auto;
}
.swagger-ui .btn.authorize {
  border-color: var(--ifm-color-success);
  color: var(--ifm-color-success);
}
.swagger-ui .btn.authorize path {
  fill: var(--ifm-color-success);
}
`;

[
  ["post", "success"],
  ["get", "info"],
  ["delete", "danger"],
  ["put", "warning"],
  ["patch", "warning"],
].forEach(([method, colors]) => {
  customCss += `
.swagger-ui .opblock.opblock-${method},
.swagger-ui .opblock.opblock-${method} .opblock-summary {
  border-color: var(--ifm-color-${colors});
}
.swagger-ui .opblock.opblock-${method} .opblock-summary-method,
.swagger-ui .opblock.opblock-${method} .tab-header .tab-item.active h4 span:after {
  background: var(--ifm-color-${colors});
}
.swagger-ui .opblock.opblock-${method} {
  background-color: var(--ifm-color-${colors}-contrast-background);
}
`;
});

function SwaggerUIComponent() {
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
}

export default function SwaggerUIWrapper() {
  return (
    <BrowserOnly
      fallback={
        <CodeBlock language="yaml" title="rest-api.yaml">
          {restApiYaml}
        </CodeBlock>
      }
    >
      {() => <SwaggerUIComponent />}
    </BrowserOnly>
  );
}
