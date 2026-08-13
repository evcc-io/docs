const { test } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start("basics.evcc.yaml", "password.sql");
});
test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("smart mode", async ({ page }) => {
    await page.goto(`/`);
    await page.locator('[data-testid="mode"] .smart-btn').first().click();
    await wait(100);
    await placeOverlay(page, '[data-testid="mode"] .smart-btn', CURSOR, 20, 10);
    await screenshot(
      page,
      `${BASE_PATH}/smart-mode`,
      ".loadpoint > div:first-child",
      { x: 30, y: 40 },
    );
  });

  test("always charge", async ({ page }) => {
    await page.goto(`/`);
    // avoid text wrapping in the dropdown (fixed 320px width)
    await page.addStyleTag({
      content:
        '[data-testid="always-charge-dropdown"] { width: 350px !important; }',
    });
    await page.locator('[data-testid="mode"] .smart-btn').first().click();
    await wait(100);
    await page.locator('[data-testid="always-charge-toggle"]').first().click();
    await wait(100);
    await page
      .locator('[data-testid="always-charge-dropdown"] .form-check-input')
      .first()
      .click();
    await wait(300);
    await placeOverlay(
      page,
      '[data-testid="always-charge-dropdown"] .form-check-input',
      CURSOR,
      10,
      10,
    );
    const header = await page
      .locator(".loadpoint > div:first-child")
      .first()
      .boundingBox();
    const dropdown = await page
      .locator('[data-testid="always-charge-dropdown"]')
      .first()
      .boundingBox();
    const bottom =
      dropdown.y + dropdown.height - (header.y + header.height) + 20;
    await screenshot(
      page,
      `${BASE_PATH}/always-charge`,
      ".loadpoint > div:first-child",
      { x: 30, top: 40, bottom },
    );
    // reset for the next loop iteration
    await page
      .locator('[data-testid="always-charge-dropdown"] .form-check-input')
      .first()
      .click();
    await wait(100);
  });

  test("energyflow surplus", async ({ page }) => {
    await page.goto(`/`);
    page.setViewportSize({ width: 400, height: 600 });
    await placeOverlay(
      page,
      ".site-progress-bar.pv-export",
      ARROW,
      -22,
      -100,
      -90,
    );
    await screenshot(page, `${BASE_PATH}/energyflow-surplus`, ".energyflow", {
      x: 20,
      top: 60,
      bottom: 0,
    });
  });
});
