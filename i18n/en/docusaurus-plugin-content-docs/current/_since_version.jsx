// FIXME surely there's a better way of translating this than just relying on repeating the entire export for every language?!

import React from "react";

export default ({ version }) => (
  <span
    className="theme-doc-version-badge badge badge--secondary"
    style={{ marginBottom: "1rem" }}
  >
    Ab Version {version}
  </span>
);
