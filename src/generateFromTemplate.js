const fs = require("fs");
const yaml = require("js-yaml");
const _ = require("lodash");
const countries = require("i18n-iso-countries");

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/de.json"));

const AUTOGEN_MARKER = "<!-- AUTO-GENERATED CONTENT BELOW THIS LINE -->";

const TARIFF_GROUPS = {
  "Dynamic electricity price": "price",
  "Dynamischer Strompreis": "price",
  "CO₂ Vorhersage": "co2",
  "CO₂ forecast": "co2",
  "PV Vorhersage": "solar",
  "PV forecast": "solar",
};

const GROUP_SORT_ORDER = {
  "Dynamic electricity price": 1,
  "Dynamischer Strompreis": 1,
  "CO₂ Vorhersage": 2,
  "CO₂ forecast": 2,
  "PV Vorhersage": 3,
  "PV forecast": 3,
};

const CHARGER_GROUPS = {
  "Switchable sockets": "smartswitch",
  "Schaltbare Steckdosen": "smartswitch",
};

const HEATING_GROUPS = {
  Wärmeerzeuger: "heating",
  "Heating devices": "heating",
};

const CODE_PREAMBLES = {
  vehicle: "vehicles:\n    - name: my_car",
  charger: "chargers:\n    - name: my_charger",
  smartswitch: "chargers:\n    - name: my_smartswitch",
  heating: "chargers:\n    - name: my_heating",
  meter: "meters:\n    - name: my_meter",
  grid: "meters:\n    - name: my_grid",
  pv: "meters:\n    - name: my_pv",
  battery: "meters:\n    - name: my_battery",
  charge: "meters:\n    - name: my_charger",
  aux: "meters:\n    - name: my_aux",
  price: "tariffs:\n    grid:",
  co2: "tariffs:\n    co2:",
  solar: "tariffs:\n    solar:",
};

const TRANSLATIONS_DE = {
  "tab.grid": "Netz",
  "tab.pv": "PV",
  "tab.battery": "Batterie",
  "tab.charge": "Wallbox",
  "tab.aux": "AUX",
  global: "Global",
};

const TRANSLATIONS_EN = {
  "tab.grid": "Grid",
  "tab.pv": "PV",
  "tab.battery": "Battery",
  "tab.charge": "Wallbox",
  "tab.aux": "AUX",
  global: "Global",
};

function makeTranslate(language) {
  return function translate(key) {
    const translations = language === "de" ? TRANSLATIONS_DE : TRANSLATIONS_EN;
    // local lookup
    if (translations[key]) {
      return translations[key];
    }
    // check for country lookup
    const countryName = countries.getName(key, language);
    if (countryName) {
      return countryName;
    }
    return key;
  };
}

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function readTemplates(path) {
  const files = fs.readdirSync(path);
  return files
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => yaml.load(fs.readFileSync(`${path}/${file}`, "utf8")));
}

function indent(code, list = false) {
  // escape backticks and specific regex patterns that break MDX
  let result = code
    .replace(/`/g, "\\`")
    .replace(/\\(\d)/g, "\\\\$1") // escape backreferences like \1, \2
    .replace(/\\\?/g, "\\\\?") // escape literal ? in regex
    .replace(/\\\(/g, "\\\\(") // escape literal ( in regex
    .replace(/\\\)/g, "\\\\)"); // escape literal ) in regex

  if (list) {
    // indent first line with 6 spaces and dash
    result = result.replace(/^/, "      - ");
    // indent remaining lines 8 spaces
    return result.replace(/\n/gm, "\n        ");
  } else {
    // indent all lines 6 spaces
    result = result.replace(/^/gm, "      ");
  }

  return result;
}

function templateContent(entry, type, translate) {
  const description = entry.description ? entry.description + "\n" : "";

  const codeBlocks = entry.render.map((render) => {
    let preamble = render.usage || type;
    let list = false;
    if (type === "tariff") {
      preamble = TARIFF_GROUPS[entry.product.group];
      if (preamble === "solar") {
        list = true;
      }
    }
    const code = `${CODE_PREAMBLES[preamble]}\n${indent(render.default, list).trimEnd()}`;
    const advanced =
      render.advanced && render.advanced !== render.default
        ? `${CODE_PREAMBLES[preamble]}\n${indent(render.advanced, list).trimEnd()}`
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
    (block, i) => `<TabItem value="${block.usage}" label="${translate(
      `tab.${block.usage}`,
    )}"${i === 0 ? " default" : ""}>

${block.code}

</TabItem>`,
  )
  .join("\n")}
</Tabs>\n\n`;
  }

  const sponsor = entry.requirements?.includes("sponsorship")
    ? `<SponsorshipRequired />\n\n`
    : "";

  let countryList = [];
  if (type === "tariff") {
    countryList = (entry.countries || ["global"]).map(translate);
  }

  const features = [
    ...(entry.capabilities || []),
    ...(entry.requirements || []),
    ...countryList,
  ].filter((f) => f !== "skiptest");

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
    type === "charger" || type === "meter" || type === "tariff"
      ? `<DeviceFeatures features="${features.join(",")}" />\n\n`
      : "";

  return deviceFeatures + description + code + sponsor;
}

function additionalContent(name, target) {
  const filename = name.toLowerCase().replaceAll(" ", "_");
  try {
    const path = target.replace(/\.mdx$/, `/_${filename}.mdx`);
    const content = fs.readFileSync(path, "utf-8");
    console.log("integrated additional content from ", path);
    return content + "\n";
  } catch (e) {}
  return "";
}

function generateMarkdown(data, type, translate, target) {
  let brandCounter = 0;
  let productCounter = 0;

  // fill missing data
  data.forEach((x) => {
    x.product.group = x.product.group || "";
    x.product.brand = x.product.brand || "";
    x.product.description = x.product.description || "";
  });

  // smart switches only
  if (type === "smartswitch") {
    data = data.filter(
      (x) => CHARGER_GROUPS[x.product.group] === "smartswitch",
    );
  }

  // heating devices only
  if (type === "heating") {
    data = data.filter((x) => HEATING_GROUPS[x.product.group] === "heating");
  }

  // remove smart switches and heating devices from chargers
  if (type === "charger") {
    data = data.filter(
      (x) =>
        !["smartswitch", "heating"].includes(CHARGER_GROUPS[x.product.group]),
    );
  }

  // sort
  const dataSorted = _.orderBy(data, [
    // sort by group order-id if exists
    (x) => GROUP_SORT_ORDER[x.product.group] || 0,
    // sort by group name
    (x) => x.product.group.toLowerCase(),
    // sort by brand and description
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
      generated += additionalContent(group, target);
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

    generated += `${templateContent(entry, type, translate)}`;

    lastGroup = group;
    lastBrand = brand;
  }

  const content = fs
    .readFileSync(target, "utf-8")
    .replace(
      new RegExp(`${escapeRegExp(AUTOGEN_MARKER)}([\\s\\S])*`, "gm"),
      `${AUTOGEN_MARKER}\n\n${generated}`,
    );
  console.log(`${type}: ${brandCounter} brands, ${productCounter} products`);
  fs.writeFileSync(target, content, "utf-8");
}

["vehicle", "meter", "charger", "tariff", "smartswitch", "heating"].forEach(
  (type) => {
    let templates = type;
    let markdown = `devices/${type}s.mdx`;

    if (type === "smartswitch") {
      templates = "charger";
      markdown = "devices/smartswitches.mdx";
    }

    if (type === "heating") {
      templates = "charger";
      markdown = "devices/heating.mdx";
    }

    if (type === "tariff") {
      markdown = "tariffs.mdx";
    }

    const templatesDe = readTemplates(`./templates/release/de/${templates}`);
    const templatesEn = readTemplates(`./templates/release/en/${templates}`);

    generateMarkdown(
      templatesDe,
      type,
      makeTranslate("de"),
      `./docs/${markdown}`,
    );
    generateMarkdown(
      templatesEn,
      type,
      makeTranslate("en"),
      `./i18n/en/docusaurus-plugin-content-docs/current/${markdown}`,
    );
  },
);
