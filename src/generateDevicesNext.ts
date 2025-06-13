import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import * as countries from "i18n-iso-countries";

// Register locale data
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/de.json"));

interface ProductData {
  product: {
    brand: string;
    description?: string;
    group?: string;
    identifier: string;
  };
  template: string;
  capabilities?: string[];
  requirements?: string[];
  countries?: string[];
  description?: string;
  params?: Array<{
    name: string;
    description: string;
    help?: string;
    type?: string;
    unit?: string;
    example?: any;
    default?: any;
    choice?: any[];
    optional?: boolean;
    advanced?: boolean;
  }>;
  render: Array<{
    usage?: string;
    default: string;
    advanced?: string;
  }>;
}

interface DeviceCard {
  id: string;
  brand: string;
  description: string;
  thumbnail: string;
  capabilities: string[];
  requirements: string[];
  countries: string[];
  identifier: string;
  group?: string;
}

const DEVICE_TYPES = ["vehicle", "charger", "meter", "tariff"] as const;
const LANGUAGES = ["en", "de"] as const;

const TARIFF_GROUPS: Record<string, string> = {
  "Dynamic electricity price": "price",
  "Dynamischer Strompreis": "price",
  "CO₂ Vorhersage": "co2",
  "CO₂ forecast": "co2",
  "PV Vorhersage": "solar",
  "PV forecast": "solar",
};

const CODE_PREAMBLES: Record<string, string> = {
  vehicle: "vehicles:\n    - name: my_car",
  charger: "chargers:\n    - name: my_charger",
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

const TRANSLATIONS_DE: Record<string, string> = {
  "tab.grid": "Netz",
  "tab.pv": "PV",
  "tab.battery": "Batterie",
  "tab.charge": "Wallbox",
  "tab.aux": "AUX",
  global: "Global",
  "params.title": "## Templateparameter",
  "params.header": "| Name | Erklärung | Wert | Optional |",
  "params.separator": "|-----------|-----------|------|----------|",
  "params.required.yes": "nein",
  "params.required.no": "ja",
  "params.advanced": "erweitert",
  "params.basic": "standard",
};

const TRANSLATIONS_EN: Record<string, string> = {
  "tab.grid": "Grid",
  "tab.pv": "PV",
  "tab.battery": "Battery",
  "tab.charge": "Wallbox",
  "tab.aux": "AUX",
  global: "Global",
  "params.title": "## Template Parameter",
  "params.header": "| Name | Explanation | Value | Optional |",
  "params.separator": "|-----------|-------------|-------|----------|",
  "params.required.yes": "no",
  "params.required.no": "yes",
  "params.advanced": "advanced",
  "params.basic": "basic",
};

interface TemplateWithFilename extends ProductData {
  _filename: string;
}

const makeTranslate =
  (language: string) =>
  (key: string): string => {
    const translations = language === "de" ? TRANSLATIONS_DE : TRANSLATIONS_EN;

    if (translations[key]) {
      return translations[key];
    }

    const countryName = countries.getName(key, language);
    if (countryName) {
      return countryName;
    }

    return key;
  };

const readTemplates = (templatePath: string): TemplateWithFilename[] => {
  if (!fs.existsSync(templatePath)) {
    return [];
  }

  const files = fs.readdirSync(templatePath);
  return files
    .filter((file) => file.endsWith(".yaml"))
    .map((file) => {
      const template = yaml.load(
        fs.readFileSync(path.join(templatePath, file), "utf8"),
      ) as ProductData;
      return {
        ...template,
        _filename: file,
      };
    });
};

const indentCode = (code: string, list = false): string => {
  let result = code
    .replace(/`/g, "\\`")
    .replace(/\\(\d)/g, "\\\\$1") // escape backreferences like \1, \2
    .replace(/\\\?/g, "\\\\?") // escape literal ? in regex
    .replace(/\\\(/g, "\\\\(") // escape literal ( in regex
    .replace(/\\\)/g, "\\\\)"); // escape literal ) in regex

  if (list) {
    result = result.replace(/^/, "      - ");
    return result.replace(/\n/gm, "\n        ");
  } else {
    result = result.replace(/^/gm, "      ");
  }

  return result;
};

const generateDeviceCard = (
  data: TemplateWithFilename,
  deviceType: string,
  language: string,
): DeviceCard | null => {
  const brand = data.product.brand || "";
  const description = data.product.description || "";
  const identifier = data.product.identifier;

  // Skip if no identifier is provided
  if (!identifier) {
    console.warn(
      `No identifier found for template: ${data._filename} - skipping`,
    );
    return null;
  }

  return {
    id: `${brand}-${description}`.replace(/\s+/g, "-").toLowerCase(),
    brand,
    description,
    thumbnail: `/img/devices/${deviceType}/${identifier}.jpg`,
    capabilities: data.capabilities || [],
    requirements: data.requirements || [],
    countries: data.countries || [],
    identifier,
    group: data.product.group,
  };
};

const generateOverviewPage = (
  cards: DeviceCard[],
  deviceType: string,
  language: string,
): string => {
  const title = deviceType.charAt(0).toUpperCase() + deviceType.slice(1) + "s";

  return `---
title: ${title}
hide_table_of_contents: true
---

import DeviceCard from '@site/src/components/DeviceCard';
import DeviceGrid from '@site/src/components/DeviceGrid';

# ${title}

<DeviceGrid>
${cards
  .sort((a, b) =>
    `${a.brand} ${a.description}`.localeCompare(`${b.brand} ${b.description}`),
  )
  .map((card) => {
    const allCapabilities = [...card.capabilities];
    const allRequirements = [...card.requirements];

    // Combine all features like in the existing implementation
    const features = [...allCapabilities, ...allRequirements].filter(
      (f) => f !== "skiptest",
    );

    // Apply same logic as existing implementation for chargers
    if (deviceType === "charger") {
      const sponsorshipIndex = features.indexOf("sponsorship");
      if (sponsorshipIndex > -1) {
        features.splice(sponsorshipIndex, 1);
      } else {
        features.push("sponsorfree");
      }
    }

    // Remove eebus like in existing implementation
    const eebusIndex = features.indexOf("eebus");
    if (eebusIndex > -1) {
      features.splice(eebusIndex, 1);
    }

    return `  <DeviceCard
    brand="${card.brand}"
    description="${card.description}"
    thumbnail="${card.thumbnail}"
    capabilities={[${features.map((f) => `"${f}"`).join(", ")}]}
    requirements={[]}
    href="/docs/devices-next/${deviceType}s/${card.identifier}"
    group="${card.group || ""}"
    type="${deviceType}"
    name="${card.identifier}"
  />`;
  })
  .join("\n")}
</DeviceGrid>
`;
};

const escapeMarkdown = (text: string): string => {
  return text.replace(/\|/g, "\\|").replace(/\[/g, "\\[").replace(/\]/g, "\\]");
};

const getParameterTable = (
  data: TemplateWithFilename,
  language: string,
): string => {
  const translate = makeTranslate(language);

  if (!data.params || data.params.length === 0) {
    return "";
  }

  const headerRow = translate("params.header");
  const separatorRow = translate("params.separator");

  const paramRows = data.params
    .map((param) => {
      const name = param.name || "";
      const description = param.description || "";

      // Parameter: Description<br/>`technical_name`
      const paramColumn = description
        ? `${escapeMarkdown(description)}<br/>\`${escapeMarkdown(name)}\``
        : `\`${escapeMarkdown(name)}\``;

      // Erklärung: help text
      const explanation = param.help ? escapeMarkdown(param.help) : "";

      // Wert: Standard, Beispiel, Typ, Einheit
      let value = "";
      const valueParts: string[] = [];

      if (param.default) {
        valueParts.push(
          `Standard: \`${escapeMarkdown(String(param.default))}\``,
        );
      }
      if (param.example) {
        valueParts.push(
          `Beispiel: \`${escapeMarkdown(String(param.example))}\``,
        );
      }
      if (param.type) {
        valueParts.push(`Typ: ${param.type}`);
      }
      if (param.unit) {
        valueParts.push(`Einheit: ${param.unit}`);
      }
      if (param.choice && param.choice.length > 0) {
        // Alle Werte anzeigen, aber bei langen Listen mit Zeilenumbrüchen für bessere Lesbarkeit
        if (param.choice.length > 10) {
          // Sehr lange Listen: alle 5 Werte einen Umbruch
          const choices = param.choice
            .map((c, index) => {
              const escaped = `\`${escapeMarkdown(String(c))}\``;
              return (index + 1) % 5 === 0 ? escaped + "<br/>" : escaped;
            })
            .join(", ")
            .replace(/, <br\/>/g, "<br/>"); // Letztes Komma vor Umbruch entfernen
          valueParts.push(`Auswahl: ${choices}`);
        } else {
          // Normale Listen: alle Werte in einer Zeile
          const choices = param.choice
            .map((c) => `\`${escapeMarkdown(String(c))}\``)
            .join(", ");
          valueParts.push(`Auswahl: ${choices}`);
        }
      }

      value = valueParts.join("<br/>");

      // Optional status
      const optional =
        param.optional !== false
          ? translate("params.required.yes")
          : translate("params.required.no");

      return `| ${paramColumn} | ${explanation} | ${value} | ${optional} |`;
    })
    .join("\n");

  const title = translate("params.title");

  return `${title} \`${data.template}\`

${headerRow}
${separatorRow}
${paramRows}`;
};

const generateDetailPage = (
  data: TemplateWithFilename,
  deviceType: string,
  language: string,
): string => {
  const translate = makeTranslate(language);
  const brand = data.product.brand || "";
  const description = data.product.description || "";
  const longDescription = data.description || "";

  const codeBlocks = data.render.map((render) => {
    let preamble = render.usage || deviceType;
    let list = false;

    if (deviceType === "tariff") {
      preamble = TARIFF_GROUPS[data.product.group || ""] || deviceType;
      if (preamble === "solar") {
        list = true;
      }
    }

    const code = `${CODE_PREAMBLES[preamble] || CODE_PREAMBLES[deviceType]}\n${indentCode(render.default, list).trimEnd()}`;
    const advanced =
      render.advanced && render.advanced !== render.default
        ? `${CODE_PREAMBLES[preamble] || CODE_PREAMBLES[deviceType]}\n${indentCode(render.advanced, list).trimEnd()}`
        : null;

    return {
      usage: render.usage,
      code: `<DeviceConfig code={\`${code}\`} ${advanced ? `advanced={\`${advanced}\`}` : ""} />`,
    };
  });

  let codeSection = "";
  if (codeBlocks.length === 1) {
    codeSection = codeBlocks[0].code;
  } else {
    codeSection = `<Tabs>
${codeBlocks
  .map(
    (
      block,
      i,
    ) => `<TabItem value="${block.usage}" label="${translate(`tab.${block.usage}`)}"${i === 0 ? " default" : ""}>

${block.code}

</TabItem>`,
  )
  .join("\n")}
</Tabs>`;
  }

  const features = [
    ...(data.capabilities || []),
    ...(data.requirements || []),
    // Only add countries/regions for tariffs
    ...(deviceType === "tariff"
      ? (data.countries || ["global"]).map(translate)
      : []),
  ].filter((f) => f !== "skiptest");

  const deviceFeatures = ["charger", "meter", "tariff"].includes(deviceType)
    ? `<DeviceFeatures features="${features.join(",")}" />\n\n`
    : "";

  const sponsor = data.requirements?.includes("sponsorship")
    ? `<SponsorshipRequired />\n\n`
    : "";

  // Create title from available parts
  const titleParts = [brand, description].filter((part) => part);
  const title = titleParts.join(" ").trim() || "Device";

  // Generate custom edit URL pointing to the original template
  const editUrl = `https://github.com/evcc-io/evcc/blob/master/templates/definition/${deviceType}/${data.template}.yaml`;

  // Get parameter table for this device type
  const parameterTable = getParameterTable(data, language);

  return `---
title: ${title}
custom_edit_url: ${editUrl}
hide_table_of_contents: true
---

import DeviceConfig from '@site/src/components/DeviceConfig';
import DeviceFeatures from '@site/src/components/DeviceFeatures';
import SponsorshipRequired from '/docs/_sponsorship_required.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import '@evcc/icons';

# ${title}

<div className="device-detail-container">
  <div className="device-detail-content">
    ${deviceFeatures}${longDescription ? longDescription + "\n\n" : ""}${codeSection}
  </div>
  <div className="device-detail-icon">
    <evcc-icon
      type="${deviceType}"
      name="${data.product.identifier}"
      size="400px"
      alt="${title}"
      className="device-detail-icon-img"
    ></evcc-icon>
  </div>
</div>

${parameterTable ? parameterTable + "\n\n" : ""}${sponsor}`;
};

const cleanDeviceFolders = () => {
  const foldersToClean = [
    "./docs/devices-next",
    "./i18n/de/docusaurus-plugin-content-docs/current/devices-next",
  ];

  foldersToClean.forEach((folder) => {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true, force: true });
      console.log(`Cleaned ${folder}`);
    }
  });
};

const generateDevicePages = () => {
  // Clean existing device folders first
  cleanDeviceFolders();

  DEVICE_TYPES.forEach((deviceType) => {
    LANGUAGES.forEach((language) => {
      console.log(`Generating ${deviceType} pages for ${language}...`);

      // Read templates
      const templatePath = `./templates/release/${language}/${deviceType}`;
      const templates = readTemplates(templatePath);

      if (templates.length === 0) {
        console.log(`No templates found for ${deviceType} in ${language}`);
        return;
      }

      // Generate device cards, filtering out null values
      const cards = templates
        .map((template) => generateDeviceCard(template, deviceType, language))
        .filter((card): card is DeviceCard => card !== null);

      // Create output directories
      const baseDir =
        language === "en"
          ? "./docs/devices-next"
          : `./i18n/${language}/docusaurus-plugin-content-docs/current/devices-next`;

      const deviceDir = path.join(baseDir, `${deviceType}s`);

      fs.mkdirSync(deviceDir, { recursive: true });

      // Generate overview page as index.mdx inside the device folder
      const overviewContent = generateOverviewPage(cards, deviceType, language);
      fs.writeFileSync(path.join(deviceDir, "index.mdx"), overviewContent);

      // Generate detail pages in the same folder as the overview
      templates.forEach((template) => {
        const card = generateDeviceCard(template, deviceType, language);
        if (card) {
          // Only generate if card is valid
          const detailContent = generateDetailPage(
            template,
            deviceType,
            language,
          );
          fs.writeFileSync(
            path.join(deviceDir, `${card.identifier}.mdx`),
            detailContent,
          );
        }
      });

      console.log(
        `Generated ${cards.length} ${deviceType} pages for ${language}`,
      );
    });
  });
};

// Run the generator
generateDevicePages();
