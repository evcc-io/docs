import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import * as countries from "i18n-iso-countries";
import slugify from "slugify";

// Register locale data
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/de.json"));

interface ProductData {
  product: {
    brand: string;
    description?: string;
    group?: string;
  };
  capabilities?: string[];
  requirements?: string[];
  countries?: string[];
  description?: string;
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
  slug: string;
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
};

const TRANSLATIONS_EN: Record<string, string> = {
  "tab.grid": "Grid",
  "tab.pv": "PV",
  "tab.battery": "Battery",
  "tab.charge": "Wallbox",
  "tab.aux": "AUX",
  global: "Global",
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

const extractTemplateNameFromFilename = (filename: string): string => {
  // Extract template name from filename like "tesla_0.yaml" -> "tesla"
  return filename.replace(/_\d+\.yaml$/, "").replace(/\.yaml$/, "");
};

const normalizeForComparison = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]/g, ""); // Remove all non-alphanumeric characters
};

const createSlug = (
  brand: string,
  description: string,
  templateName: string,
): string => {
  const parts: string[] = [];

  // Add brand if it exists and is not empty
  if (brand && brand.trim()) {
    parts.push(brand);
  }

  // Add description if it exists AND is different from brand (normalized comparison)
  if (description && description.trim()) {
    const normalizedBrand = normalizeForComparison(brand);
    const normalizedDescription = normalizeForComparison(description);

    if (normalizedDescription !== normalizedBrand) {
      parts.push(description);
    }
  }

  // If no parts, we have a problem - skip this template
  if (parts.length === 0) {
    console.warn(
      `No brand or description found for template: ${templateName} - skipping`,
    );
    return "";
  }

  return slugify(parts.join(" "), {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
};

const getEnglishDescription = (
  template: TemplateWithFilename,
  deviceType: string,
): string => {
  // Try to find the corresponding English template
  const englishTemplatePath = `./templates/release/en/${deviceType}`;
  try {
    const englishTemplates = readTemplates(englishTemplatePath);
    const matchingTemplate = englishTemplates.find(
      (t) => t._filename === template._filename,
    );

    if (matchingTemplate && matchingTemplate.product.description) {
      return matchingTemplate.product.description;
    }
  } catch (e) {
    // If we can't find English template, fall back to current description
  }

  return template.product.description || "";
};

const indentCode = (code: string, list = false): string => {
  let result = code.replace(/`/g, "\\`");

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
  // Always use English description for slug consistency
  const englishDescription = getEnglishDescription(data, deviceType);
  const description = data.product.description || "";
  const templateName = extractTemplateNameFromFilename(data._filename);
  const slug = createSlug(brand, englishDescription, templateName);

  // Skip if no valid slug could be created
  if (!slug) {
    return null;
  }

  return {
    id: `${brand}-${description}`.replace(/\s+/g, "-").toLowerCase(),
    brand,
    description,
    thumbnail: `/img/devices/${deviceType}/${slug}.jpg`,
    capabilities: data.capabilities || [],
    requirements: data.requirements || [],
    countries: data.countries || [],
    slug,
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
    href="/docs/devices-next/${deviceType}s/${card.slug}"
    group="${card.group || ""}"
    type="${deviceType}"
    name="${card.slug}"
  />`;
  })
  .join("\n")}
</DeviceGrid>
`;
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
  const titleParts = [brand, description].filter((part) => part.trim());
  const title = titleParts.join(" ") || "Device";

  // Generate custom edit URL pointing to the original template
  const cleanFilename = data._filename.replace(/_\d+\.yaml$/, ".yaml");
  const editUrl = `https://github.com/evcc-io/evcc/blob/master/templates/definition/${deviceType}/${cleanFilename}`;

  return `---
title: ${title}
custom_edit_url: ${editUrl}
---

import DeviceConfig from '@site/src/components/DeviceConfig';
import DeviceFeatures from '@site/src/components/DeviceFeatures';
import SponsorshipRequired from '/docs/_sponsorship_required.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ${title}

${deviceFeatures}${longDescription ? longDescription + "\n\n" : ""}${codeSection}

${sponsor}`;
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
            path.join(deviceDir, `${card.slug}.mdx`),
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
