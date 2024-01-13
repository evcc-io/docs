const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay, removeOverlays } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start("vehicles.evcc.yaml");
});
test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("min soc", async ({ page }) => {
    await page.goto(`/`);
    await page.locator("[data-testid=charging-plan] button").first().click();
    await wait(300);
    await page
      .locator("#chargingPlanModal_1 .nav-tabs .nav-item")
      .last()
      .click();
    await page.locator("#chargingplan_1_minsoc").selectOption("25");
    await placeOverlay(page, "#chargingplan_1_minsoc", CURSOR, 70, 5);
    await screenshot(
      page,
      `${BASE_PATH}/minsoc-setting`,
      "#chargingPlanModal_1 .modal-content",
      {
        all: 20,
      },
    );
    await removeOverlays(page);
    await page.locator("#chargingPlanModal_1 [aria-label=Close]").click();
    await wait(500);
    await screenshot(
      page,
      `${BASE_PATH}/minsoc-loadpoint`,
      ".container--loadpoint > .carousel > div:nth-child(1)",
      {
        all: 20,
      },
    );
  });
});
