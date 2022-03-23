const fs = require("fs");
const yaml = require("js-yaml");
const _ = require("lodash");

const AUTOGEN_MARKER = "{/* AUTO-GENERATED CONTENT BELOW THIS LINE */}";

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

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
  const code = `${entry.description || ""}
\`\`\`yaml
vehicles:
  - name: my_car
${indent(entry.render[0].default).trimEnd()}
\`\`\`
 `;

  const sponsor = entry.requirements?.includes("sponsorship")
    ? `\n<SponsorshipRequired />\n`
    : "";

  return code + sponsor;
}

function generateMarkdown(data, target) {
  const generated = _.toPairs(
    _.groupBy(
      _.sortBy(data, ["product.brand", "product.description"]),
      "product.brand"
    )
  )
    .map(([brand, entries]) => {
      if (entries.length > 1) {
        return `## ${brand}\n${entries
          .map(
            (entry) =>
              `### ${entry.product.description}\n${templateContent(entry)}`
          )
          .join("\n")}`;
      } else {
        const headline = `${brand || ""} ${
          entries[0].product.description || ""
        }`;
        return `## ${headline}\n${templateContent(entries[0])}`;
      }
    })
    .join("\n");

  const content = fs
    .readFileSync(target, "utf-8")
    .replace(
      new RegExp(`${escapeRegExp(AUTOGEN_MARKER)}(.|\n)*`, "gm"),
      AUTOGEN_MARKER + "\n\n" + generated
    );
  fs.writeFileSync(target, content, "utf-8");
}

const vehicles = readYamlDataFromDir("vehicle");
const meters = readYamlDataFromDir("meter");
const chargers = readYamlDataFromDir("meter");

generateMarkdown(vehicles, "./docs/devices/vehicles.mdx");
