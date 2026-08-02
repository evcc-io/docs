const { test } = require("@playwright/test");
const sharp = require("sharp");

const screenshotBase = "../src/assets";

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
        const path2x = `${screenshotBase}/${name}-${lang}-${theme}-2x.webp`;
        await page.screenshot({
          path: path2x,
          quality: 80,
          omitBackground: true,
          clip,
          animations: "disabled",
        });
        const path1x = path2x.replace(/-2x\.webp$/, "-1x.webp");
        const meta = await sharp(path2x).metadata();
        await sharp(path2x)
          .resize(Math.round(meta.width * 0.5))
          .toFile(path1x);
        console.log("screenshot created", { name, theme, lang });
      }

      test.describe(`${lang}/${theme}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.addInitScript(
            ([lang, theme]) => {
              localStorage.setItem("settings_locale", lang);
              localStorage.setItem("settings_theme", theme);
            },
            [lang, theme],
          );
          await page.goto(`/`);
        });

        body(screenshot, { lang, theme });
      });
    });
  });
}
