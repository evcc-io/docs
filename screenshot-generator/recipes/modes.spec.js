const { test } = require("@playwright/test");
import { loop } from "./utils/loop";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start("modes.evcc.yaml", "password.sql");
});
test.afterAll(async () => {
  await stop();
});

loop((screenshot) => {
  test("heat pump modes", async ({ page }) => {
    await page.goto(`/`);
    await page.locator('[data-testid="mode"]').nth(1).waitFor();
    await screenshot(
      page,
      `${BASE_PATH}/modes-heatpump`,
      ":nth-match(.loadpoint > div:first-child, 1)",
      { x: 30, y: 40 },
    );
  });

  test("smart plug modes", async ({ page }) => {
    await page.goto(`/`);
    await page.locator('[data-testid="mode"]').nth(1).waitFor();
    await screenshot(
      page,
      `${BASE_PATH}/modes-smartplug`,
      ":nth-match(.loadpoint > div:first-child, 2)",
      { x: 30, y: 40 },
    );
  });
});
