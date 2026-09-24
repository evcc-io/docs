import { loop } from "./utils/loop";
const { test, expect } = require("@playwright/test");
import { CURSOR, placeOverlay, removeOverlays } from "./utils/overlay";
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
    const usageCard = "main section:has(#batteryPriority)";
    await expect(page.locator(usageCard)).toBeVisible();

    await page.locator("#batteryPriority").selectOption("50");
    await wait(300);
    await placeOverlay(page, "#batteryPriority", CURSOR, 0, 10);

    await screenshot(page, `${BASE_PATH}/battery-priority`, usageCard, {
      all: 20,
    });
    await removeOverlays(page);

    // buffer soc
    await page.locator("#batteryBuffer").selectOption("75");
    await wait(300);
    await placeOverlay(page, "#batteryBuffer", CURSOR, 0, 10);

    await screenshot(page, `${BASE_PATH}/battery-buffer`, usageCard, {
      all: 20,
    });
    await removeOverlays(page);

    // buffer start
    await page.locator("#batteryBufferStart").selectOption("90");
    await wait(300);
    await placeOverlay(page, "#batteryBufferStart", CURSOR, 0, 10);

    await screenshot(page, `${BASE_PATH}/battery-bufferstart`, usageCard, {
      all: 20,
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

    // card sits at the bottom of a long page: make it fit and hide the fixed tab bar
    await page.setViewportSize({ width: 1280, height: 1800 });
    await page.addStyleTag({
      content: '[data-testid="bottom-tab-bar"] { display: none !important }',
    });
    await wait(300);

    await screenshot(
      page,
      `${BASE_PATH}/battery-grid-charging`,
      "main section:has(#smartCostLimit-battery)",
      {
        all: 20,
      },
    );
  });
});
