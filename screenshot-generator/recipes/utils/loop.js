const { test } = require("@playwright/test");
const sharp = require("sharp");
const fs = require("fs");

const screenshotBase = {
  de: "../docs/",
  en: "../i18n/en/docusaurus-plugin-content-docs/current",
};

const sleep = async function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function convertToWebp(pngPath) {
  try {
    const webpPath1x = pngPath.replace(/\.png$/, "-1x.webp");
    const meta = await sharp(pngPath).metadata();
    const halfWidth = Math.round(meta.width * 0.5);
    await sharp(pngPath).resize(halfWidth).toFile(webpPath1x);

    const webpPath2x = pngPath.replace(/\.png$/, "-2x.webp");
    await sharp(pngPath).toFormat("webp").toFile(webpPath2x);
  } catch (e) {
    console.error("Error converting to webp", e);
  }
}

export function loop(body) {
  ["light", "dark"].forEach((theme) => {
    ["en", "de"].forEach((lang) => {
      async function screenshot(page, name, element, padding = {}) {
        const paddingLeft = padding.left ?? padding.x ?? padding.all ?? 20;
        const paddingRight = padding.right ?? padding.x ?? padding.all ?? 20;
        const paddingTop = padding.top ?? padding.y ?? padding.all ?? 20;
        const paddingBottom = padding.bottom ?? padding.y ?? padding.all ?? 20;

        let clip;
        if (element) {
          const el = await page.$(element);
          const boundingBox = await el.boundingBox();
          clip = {
            x: boundingBox.x - paddingLeft,
            y: boundingBox.y - paddingTop,
            width: boundingBox.width + paddingLeft + paddingRight,
            height: boundingBox.height + paddingTop + paddingBottom,
          };
        }
        const path = `${screenshotBase[lang]}/${name}-${theme}.png`;
        await page.screenshot({
          path,
          omitBackground: true,
          clip,
          animations: "disabled",
        });
        await convertToWebp(path);
        fs.unlinkSync(path);
        console.log("screenshot created", { name, theme, lang });
      }

      test.describe(`${lang}/${theme}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(`/`);
          await page.getByTestId("topnavigation-button").click();
          await page.getByTestId("topnavigation-settings").click();
          await page.getByRole("button", { name: theme }).click();
          await page.getByLabel("Language").selectOption({ value: lang });
          await page.getByRole("button", { name: "Close" }).click();
        });

        body(screenshot);
      });
    });
  });
}
