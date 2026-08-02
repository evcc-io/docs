import { loop } from "./utils/loop";
const { test, expect } = require("@playwright/test");
import {
  CURSOR,
  ONE,
  TWO,
  THREE,
  FOUR,
  placeOverlay,
  removeOverlays,
} from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeEach(async () => {
  await start(["basics.evcc.yaml", "dynamicprice.evcc.yaml"], "password.sql");
});

test.afterEach(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("priority soc, buffer soc, buffer start soc", async ({ page }) => {
    await page.goto(`/`);
    const batteryTab = '[data-testid="bottom-tab-bar"] a[href="#/battery"]';
    await placeOverlay(page, batteryTab, CURSOR, 45, -15);
    await screenshot(
      page,
      `${BASE_PATH}/battery-navigation`,
      '[data-testid="bottom-tab-bar"]',
      { all: 20 },
    );
    await removeOverlays(page);

    await page
      .locator('[data-testid="bottom-tab-bar"] a[href="#/battery"]')
      .click();
    await expect(page.locator(".batteryLimits")).toBeVisible();

    await page.locator("#batterySettingsPriority").selectOption("50");
    await wait(300);
    await placeOverlay(page, "#batterySettingsPriority", CURSOR, 0, 10);
    await placeOverlay(page, ".battery .bg-darkest-green", ONE, -100, -21);
    await placeOverlay(page, ".battery .bg-darker-green", TWO, -100, -21);

    await screenshot(page, `${BASE_PATH}/battery-priority`, "main > .row", {
      all: 20,
      top: 80,
    });
    await removeOverlays(page);

    // buffer soc
    await page.locator("#batterySettingsBuffer").selectOption("75");
    await wait(300);
    await placeOverlay(page, "#batterySettingsBuffer", CURSOR, 0, 10);
    await placeOverlay(page, ".battery .bg-dark-green", THREE, -100, -21);

    await screenshot(page, `${BASE_PATH}/battery-buffer`, "main > .row", {
      all: 20,
      top: 80,
    });
    await removeOverlays(page);

    // buffer start
    await page.locator("#batterySettingsBufferStart").selectOption("90");
    await wait(300);
    await placeOverlay(page, "#batterySettingsBufferStart", CURSOR, 0, 10);
    await placeOverlay(page, ".bufferStartIndicator", FOUR, -100, -21);

    await screenshot(page, `${BASE_PATH}/battery-bufferstart`, "main > .row", {
      all: 20,
      top: 80,
    });
    await removeOverlays(page);
  });

  test("grid charging", async ({ page }) => {
    await page.goto(`/`);
    await page
      .locator('[data-testid="bottom-tab-bar"] a[href="#/battery"]')
      .click();
    const gridChargingSwitch = page.locator(
      "main #smartCostLimit-batteryActive",
    );
    await expect(gridChargingSwitch).toBeVisible();
    await gridChargingSwitch.click();
    await wait(300);
    await page.locator("main #smartCostLimit-battery").selectOption("0.12");

    await screenshot(
      page,
      `${BASE_PATH}/battery-grid-charging`,
      "main > div:has(#smartCostLimit-battery)",
      {
        all: 20,
      },
    );
  });
});
