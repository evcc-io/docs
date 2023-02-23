const fs = require("fs");
const yaml = require("js-yaml");
const _ = require("lodash");

const AUTOGEN_MARKER = "<!-- AUTO-GENERATED CONTENT BELOW THIS LINE -->";

const CODE_PREAMBLES = {
  vehicle: "vehicles:\n  - name: my_car",
  charger: "chargers:\n  - name: my_charger",
  meter: "meters:\n  - name: my_meter",
  grid: "meters:\n  - name: my_grid",
  pv: "meters:\n  - name: my_pv",
  battery: "meters:\n  - name: my_battery",
  charge: "meters:\n  - name: my_charger",
};

const TRANSLATIONS = {
  "tab.grid": "Netz",
  "tab.pv": "PV",
  "tab.battery": "Batterie",
  "tab.charge": "Wallbox",
};

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
  const description = entry.description ? entry.description + "\n" : "";

  const codeBlocks = entry.render.map((render) => ({
    usage: render.usage,
    code: `\`\`\`yaml
${CODE_PREAMBLES[render.usage || type]}
${indent(render.default).trimEnd()} 
\`\`\``,
  }));

  let code = "";
  if (codeBlocks.length === 1) {
    code = codeBlocks[0].code + "\n\n";
  } else {
    code = `<Tabs>
${codeBlocks
  .map(
    (block, i) => `<TabItem value="${block.usage}" label="${
      TRANSLATIONS[`tab.${block.usage}`]
    }"${i === 0 ? " default" : ""}>

${block.code}

</TabItem>`
  )
  .join("\n")}
</Tabs>\n\n`;
  }

  const phaseSwitch = entry.capabilities?.includes("1p3p")
    ? `<PhaseSwitchSupported />\n\n`
    : "";

  const sponsor = entry.requirements?.includes("sponsorship")
    ? `<SponsorshipRequired />\n\n`
    : "";

  return description + code + phaseSwitch + sponsor;
}

function additionalContent(type, name) {
  const filename = name.toLowerCase().replaceAll(" ", "_");
  try {
    const path = `./docs/devices/${type}s/_${filename}.mdx`;
    const content = fs.readFileSync(path, "utf-8");
    console.log("integrated additional content from ", path);
    return content + "\n";
  } catch (e) {}
  return "";
}

function generateMarkdown(data, type, target) {
  let brandCounter = 0;
  let productCounter = 0;

  // fill missing data
  data.forEach((x) => {
    x.product.group = x.product.group || "";
    x.product.brand = x.product.brand || "";
    x.product.description = x.product.description || "";
  });
  // sort
  const dataSorted = _.orderBy(data, [
    (x) => x.product.group.toLowerCase(),
    (x) => (x.product.brand + x.product.description).toLowerCase(),
  ]);

  let generated = "";
  let lastGroup = "";
  let lastBrand = "";
  for (let i = 0; i < dataSorted.length; i++) {
    const entry = dataSorted[i];
    const { group, description, brand } = entry.product;
    const nextBrand = dataSorted[i + 1]?.product?.brand;
    let flags = "";
    if (entry.requirements?.includes("sponsorship")) {
      flags += "💚";
    }

    generated += `<!-- AUTO-GENERATED FROM TEMPLATE - PLEASE EDIT HERE https://github.com/evcc-io/evcc/tree/master/templates/definition/${type}  -->\n\n`;

    if (group !== lastGroup) {
      generated += `## ${group}\n\n`;
      generated += additionalContent(type, group);
    }

    if (brand && brand !== lastBrand) {
      const level = group ? "###" : "##";
      generated += `${level} ${brand}\n\n`;
      brandCounter++;
    }

    if (brand && brand !== nextBrand && brand !== lastBrand) {
      generated = generated.slice(0, -2); // remove last newline characters
      generated += ` ${description}${flags}\n\n`;
    } else {
      let level = "##";
      if (group) level += "#";
      if (brand) level += "#";
      generated += `${level} ${description} ${flags}\n\n`;
    }
    productCounter++;

    generated += `${templateContent(entry, type)}`;

    lastGroup = group;
    lastBrand = brand;
  }

  const content = fs
    .readFileSync(target, "utf-8")
    .replace(
      new RegExp(`${escapeRegExp(AUTOGEN_MARKER)}(.|\n)*`, "gm"),
      `${AUTOGEN_MARKER}\n\n${generated}`
    );
  console.log(`${type}: ${brandCounter} brands, ${productCounter} products`);
  fs.writeFileSync(target, content, "utf-8");
}

["vehicle", "meter", "charger"].forEach((type) => {
  const data = readYamlDataFromDir(type);
  generateMarkdown(data, type, `./docs/devices/${type}s.mdx`);
});
