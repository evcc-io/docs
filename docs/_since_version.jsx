import React from "react";

export default ({ version }) => (
  <span
    className="theme-doc-version-badge badge badge--secondary"
    style={{ marginBottom: "1rem" }}
  >
    Ab Version {version}
  </span>
);
