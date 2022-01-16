const fs = require("fs");
const yaml = require("js-yaml");
const _ = require("lodash");

function readYamlDataFromDir(dir) {
  const path = `./templates/${dir}`;
  const files = fs.readdirSync(path);
  return files.map((file) =>
    yaml.load(fs.readFileSync(`${path}/${file}`, "utf8"))
  );
}

function indent(code) {
  return code.replace(/^/gm, "    ");
}

function templateContent(entry) {
  return `${entry.description || ""}
\`\`\`yaml
vehicles:
  - name: my_car
${indent(entry.render[0].default).trimEnd()}
\`\`\`
`;
}

function generateMarkdown(data, target) {
  const header = `---
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Config from "/src/components/ConfigCode";

# Fahrzeuge (generated)

`;

  const entries = _.toPairs(
    _.groupBy(
      _.sortBy(data, ["product.brand", "product.description"]),
      "product.brand"
    )
  )
    .map(([brand, entries]) => {
      if (entries.length > 1) {
        return `## ${brand}\n\n${entries
          .map(
            (entry) =>
              `### ${entry.product.description}\n${templateContent(entry)}`
          )
          .join("\n")}`;
      } else {
        const headline = `${brand || ""} ${
          entries[0].product.description || ""
        }`;
        return `## ${headline}\n\n${templateContent(entries[0])}`;
      }
    })
    .join("\n");

  fs.writeFileSync(target, header + entries, "utf-8");
}

const vehicles = readYamlDataFromDir("vehicle");
const meters = readYamlDataFromDir("meter");
const chargers = readYamlDataFromDir("meter");

generateMarkdown(vehicles, "./docs/devices/vehicles_new.mdx");
