const { test } = require("@playwright/test");
const sharp = require("sharp");
const fs = require("fs");

const screenshotBase = {
  de: "../docs/",
  en: "../i18n/en/docusaurus-plugin-content-docs/current",
};

async function convertToWebp(pngPath) {
  const webpPath1x = pngPath.replace(/\.png$/, "-1x.webp");
  await sharp(pngPath)
    .metadata()
    .then(({ width }) =>
      sharp(pngPath)
        .resize(Math.round(width * 0.5))
        .toFile(webpPath1x),
    );

  const webpPath2x = pngPath.replace(/\.png$/, "-2x.webp");
  await sharp(pngPath).toFormat("webp").toFile(webpPath2x);
}

export function loop(body) {
  ["light", "dark"].forEach((theme) => {
    ["en", "de"].forEach((lang) => {
      async function screenshot(
        page,
        name,
        element,
        xPadding = 20,
        yPadding = 20,
      ) {
        let clip;
        if (element) {
          const el = await page.$(element);
          const boundingBox = await el.boundingBox();
          clip = {
            x: boundingBox.x - xPadding,
            y: boundingBox.y - yPadding,
            width: boundingBox.width + xPadding * 2,
            height: boundingBox.height + yPadding * 2,
          };
        }
        const path = `${screenshotBase[lang]}/${name}-${theme}.png`;
        await page.screenshot({ path, omitBackground: true, clip });
        await convertToWebp(path);
        fs.unlinkSync(path);
        console.log("screenshot created", { name, theme, lang });
      }

      test.describe(`${lang}/${theme}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(`/`);
          await page.getByTestId("topnavigation-button").click();
          await page.getByRole("button", { name: "Settings" }).click();
          await page.getByRole("button", { name: theme }).click();
          await page.getByLabel("Language").selectOption({ value: lang });
          await page.getByRole("button", { name: "Close" }).click();
        });

        body(screenshot);
      });
    });
  });
}
