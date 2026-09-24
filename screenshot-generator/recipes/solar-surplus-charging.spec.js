const { test } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay, removeOverlays } from "./utils/overlay";
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
    await page.locator('[data-testid="mode"] .chevron-btn').first().click();
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

  test("solar share", async ({ page }) => {
    await page.goto(`/`);
    await page
      .getByTestId("loadpoint-settings-button")
      .locator("visible=true")
      .first()
      .click();
    await wait(700);
    const slider = page.locator("#loadpoint_1_solarshare");
    await slider.evaluate((el) => {
      el.value = 50;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await wait(300);
    await placeOverlay(page, "#loadpoint_1_solarshare", CURSOR, 0, 5);
    await screenshot(
      page,
      `${BASE_PATH}/solar-share`,
      "#loadpointSettingsModal_1 .modal-content",
      { all: 20 },
    );
    await removeOverlays(page);
    await page.locator("#loadpointSettingsModal_1 .btn-close").click();
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
