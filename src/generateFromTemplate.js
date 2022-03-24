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

function templateContent(entry, type) {
  const types = {
    vehicle: `vehicles:
  - name: my_car`,
    meter: `meters:
  - name: my_meter`,
    charger: `chargers:
  - name: my_charger`,
  };

  const code = `${entry.description || ""}
\`\`\`yaml
${types[type]}
${indent(entry.render[0].default).trimEnd()} 
\`\`\`\n`;

  const sponsor = entry.requirements?.includes("sponsorship")
    ? `\n<SponsorshipRequired />\n`
    : "";

  return code + sponsor;
}

function generateMarkdown(data, type, target) {
  // fill missing data
  data.forEach((x) => {
    x.product.group = x.product.group || "";
    x.product.brand = x.product.brand || "";
    x.product.description = x.product.description || "";
  });
  // sort
  const dataSorted = _.sortBy(data, [
    "product.group",
    "product.brand",
    "product.description",
  ]);

  let generated = "";
  let lastGroup = "";
  let lastBrand = "";
  for (let i = 0; i < dataSorted.length; i++) {
    const entry = dataSorted[i];
    const { group, description, brand } = entry.product;
    const nextBrand = dataSorted[i + 1]?.product?.brand;

    if (group !== lastGroup) {
      generated += `\n## ${group}`;
    }

    if (brand !== lastBrand) {
      const level = group ? "###" : "##";
      generated += `\n${level} ${brand}`;
    }

    if (brand !== nextBrand && brand !== lastBrand) {
      generated += ` ${description}`;
    } else {
      let level = "##";
      if (group) level += "#";
      if (brand) level += "#";
      generated += `\n${level} ${description}`;
    }

    generated += `\n${templateContent(entry, type)}`;

    lastGroup = group;
    lastBrand = brand;
  }
  /*
  dataSorted
    .forEach(([brand, entries]) => {
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
    */

  const content = fs
    .readFileSync(target, "utf-8")
    .replace(
      new RegExp(`${escapeRegExp(AUTOGEN_MARKER)}(.|\n)*`, "gm"),
      AUTOGEN_MARKER + "\n\n" + generated
    );
  fs.writeFileSync(target, content, "utf-8");
}

["vehicle", "meter", "charger"].forEach((type) => {
  const data = readYamlDataFromDir(type);
  generateMarkdown(data, type, `./docs/devices/${type}s.mdx`);
});
