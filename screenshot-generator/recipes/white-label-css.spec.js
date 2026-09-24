import { test } from "@playwright/test";
import { loop } from "./utils/loop";
import { start, stop } from "./utils/evcc";

const BASE_PATH = "reference/screenshots";

test.beforeAll(async () => {
  // config is ignored in demo mode but required by the start helper
  await start("basics.evcc.yaml", null, [
    "--demo",
    "--custom-css",
    "recipes/white-label.css",
  ]);
});

test.afterAll(async () => {
  await stop();
});

loop((screenshot) => {
  test("custom css changes color and font", async ({ page }) => {
    await page.goto(`/`);
    page.setViewportSize({ width: 1280, height: 680 });
    await page.locator(".loadpoint").first().waitFor();
    // ensure the Google font is loaded before taking the screenshot
    await page.evaluate(() => document.fonts.ready);

    await screenshot(page, `${BASE_PATH}/white-label-css`, null, { all: 0 });
  });
});
