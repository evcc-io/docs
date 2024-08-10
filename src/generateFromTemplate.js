const fs = require("fs");
const yaml = require("js-yaml");
const _ = require("lodash");

const AUTOGEN_MARKER = "<!-- AUTO-GENERATED CONTENT BELOW THIS LINE -->";

const TARIFF_GROUPS = {
  "Dynamic electricity price": "price",
  "Dynamischer Strompreis": "price",
  "CO₂ Vorhersage": "co2",
  "CO₂ forecast": "co2",
};

const CODE_PREAMBLES = {
  vehicle: "vehicles:\n  - name: my_car",
  charger: "chargers:\n  - name: my_charger",
  meter: "meters:\n  - name: my_meter",
  grid: "meters:\n  - name: my_grid",
  pv: "meters:\n  - name: my_pv",
  battery: "meters:\n  - name: my_battery",
  charge: "meters:\n  - name: my_charger",
  aux: "meters:\n  - name: my_aux",
  price: "tariffs:\n  grid:",
  co2: "tariffs:\n  co2:",
};

const TRANSLATIONS = {
  "tab.grid": "Netz",
  "tab.pv": "PV",
  "tab.battery": "Batterie",
  "tab.charge": "Wallbox",
  "tab.aux": "AUX",
};

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function readTemplates(path) {
  const files = fs.readdirSync(path);
  return files
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => yaml.load(fs.readFileSync(`${path}/${file}`, "utf8")));
}

function indent(code) {
  return code.replace(/^/gm, "    ");
}

function templateContent(entry, type) {
  const description = entry.description ? entry.description + "\n" : "";

  const codeBlocks = entry.render.map((render) => {
    let preamble = render.usage || type;
    if (type === "tariff") {
      preamble = TARIFF_GROUPS[entry.product.group];
    }
    const code = `${CODE_PREAMBLES[preamble]}\n${indent(render.default).trimEnd()}`;
    const advanced =
      render.advanced && render.advanced !== render.default
        ? `${CODE_PREAMBLES[preamble]}\n${indent(render.advanced).trimEnd()}`
        : null;
    return {
      usage: render.usage,
      code: `<DeviceConfig code={\`${code}\`} ${advanced ? `advanced={\`${advanced}\`}` : ""} />\n\n`,
    };
  });

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

</TabItem>`,
  )
  .join("\n")}
</Tabs>\n\n`;
  }

  const sponsor = entry.requirements?.includes("sponsorship")
    ? `<SponsorshipRequired />\n\n`
    : "";

  const features = [
    ...(entry.capabilities || []),
    ...(entry.requirements || []),
  ];

  // use sponsorfree instead of sponsorship
  if (type === "charger") {
    const index = features.indexOf("sponsorship");
    if (index > -1) {
      features.splice(index, 1);
    } else {
      features.push("sponsorfree");
    }
  }

  // remove eebus
  const eebus = features.indexOf("eebus");
  if (eebus > -1) {
    features.splice(eebus, 1);
  }

  const deviceFeatures =
    type === "charger" || type === "meter"
      ? `<DeviceFeatures features="${features.join(",")}" />\n\n`
      : "";

  return deviceFeatures + description + code + sponsor;
}

function additionalContent(name, source) {
  const filename = name.toLowerCase().replaceAll(" ", "_");
  try {
    const path = source.replace(/\.mdx$/, `/_${filename}.mdx`);
    const content = fs.readFileSync(path, "utf-8");
    console.log("integrated additional content from ", path);
    return content + "\n";
  } catch (e) {}
  return "";
}

function generateMarkdown(data, type, source, target) {
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
    (x) => {
      const { brand, description } = x.product;
      if (brand) {
        return `${brand} ${description}`.toLocaleLowerCase();
      }
      return description.toLowerCase();
    },
  ]);

  let generated = "";
  let lastGroup = "";
  let lastBrand = "";
  for (let i = 0; i < dataSorted.length; i++) {
    const entry = dataSorted[i];
    const { group, description, brand } = entry.product;
    const nextBrand = dataSorted[i + 1]?.product?.brand;

    generated += `<!-- AUTO-GENERATED FROM TEMPLATE - PLEASE EDIT HERE https://github.com/evcc-io/evcc/tree/master/templates/definition/${type}  -->\n\n`;

    if (group !== lastGroup) {
      generated += `## ${group}\n\n`;
      generated += additionalContent(group, source);
    }

    if (brand && brand !== lastBrand) {
      const level = group ? "###" : "##";
      generated += `${level} ${brand}\n\n`;
      brandCounter++;
    }

    if (brand && brand !== nextBrand && brand !== lastBrand) {
      generated = generated.slice(0, -2); // remove last newline characters
      generated += ` ${description}\n\n`;
    } else {
      let level = "##";
      if (group) level += "#";
      if (brand) level += "#";
      generated += `${level} ${description}\n\n`;
    }
    productCounter++;

    generated += `${templateContent(entry, type)}`;

    lastGroup = group;
    lastBrand = brand;
  }

  const content = fs
    .readFileSync(source, "utf-8")
    .replace(
      new RegExp(`${escapeRegExp(AUTOGEN_MARKER)}(.|\n)*`, "gm"),
      `${AUTOGEN_MARKER}\n\n${generated}`,
    );
  console.log(`${type}: ${brandCounter} brands, ${productCounter} products`);
  fs.writeFileSync(target, content, "utf-8");
}

["release", "nightly"].forEach((version) => {
  ["vehicle", "meter", "charger", "tariff"].forEach((type) => {
    ["de", "en"].forEach((lang) => {
      const templates = readTemplates(`./templates/${version}/${lang}/${type}`);
      const base =
        lang === "de"
          ? "./docs"
          : `./i18n/en/docusaurus-plugin-content-docs/current`;
      const postfix = version === "release" ? "" : "-nightly";
      generateMarkdown(
        templates,
        type,
        `${base}/devices/${type}s.mdx`,
        `${base}/devices/${type}s${postfix}.mdx`,
      );
    });
  });
});
