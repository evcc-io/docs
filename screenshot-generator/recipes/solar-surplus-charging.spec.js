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
  test("solar mode", async ({ page }) => {
    await page.goto(`/`);
    await page.locator(".mode-group > .btn:nth-child(2)").first().click();
    await wait(100);
    await placeOverlay(page, ".mode-group > .btn.active", CURSOR, 20, 10);
    await screenshot(
      page,
      `${BASE_PATH}/solar-mode`,
      ".loadpoint > div:first-child",
      { x: 30, y: 40 },
    );
  });

  test("min+solar mode", async ({ page }) => {
    await page.goto(`/`);
    await page.locator(".mode-group > .btn:nth-child(3)").first().click();
    await wait(100);
    await placeOverlay(page, ".mode-group > .btn.active", CURSOR, 40, 10);
    await screenshot(
      page,
      `${BASE_PATH}/min-solar-mode`,
      ".loadpoint > div:first-child",
      { x: 30, y: 40 },
    );
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
