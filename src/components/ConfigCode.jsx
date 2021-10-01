import React from "react";
import CodeBlock from "@theme/CodeBlock";

const contexts = {
  chargers: (name = "my_charger") => `chargers:\n  - name: ${name}\n`,
  meters: (name = "my_meter") => `meters:\n  - name: ${name}\n`,
  vehicles: (name = "my_car") => `vehicles:\n  - name: ${name}\n`,
};

function indent(code) {
  return code.replace(/^/gm, "    ");
}

function addContext(code, type, part, name) {
  const context = contexts[part];
  return context ? `${context(name)}    type: ${type}\n${indent(code)}` : code;
}

export default ({ file, part, name }) => {
  try {
    const code = require(`js-yaml-loader!/evcc-config/yaml/${part}/${file}.yaml`);
    const codesample = addContext(code.sample, code.type, part, name).trim();
    return <CodeBlock className="language-yaml">{codesample}</CodeBlock>;
  } catch (e) {
    console.warn(e);
    return (
      <p className="admonition admonition-danger alert alert--danger">
        Config file{" "}
        <code>
          ${part}/{file}.yaml
        </code>{" "}
        not found
      </p>
    );
  }
};
