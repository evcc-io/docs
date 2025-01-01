import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import SwaggerUI from "swagger-ui-react";

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
`;

export default (props) => {
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
        root.render(<SwaggerUI {...props} />);
      } catch (e) {
        console.error(e);
      }
    }
  }, [props]);

  return <div ref={containerRef}></div>;
};
