const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay, removeOverlays } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start(["basics.evcc.yaml", "co2.evcc.yaml"], "password.sql");
});
test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("smart grid charging", async ({ page }) => {
    await page.goto(`/`);
    await placeOverlay(
      page,
      "[data-testid=loadpoint-settings-button].d-sm-block",
      CURSOR,
    );
    await screenshot(
      page,
      `${BASE_PATH}/co2-loadpoint-settings`,
      "[data-testid=loadpoint]:first-child",
      {
        all: 20,
      },
    );
    await removeOverlays(page);
    await page.getByTestId("loadpoint-settings-button").nth(1).click();
    await wait(300);

    await page.locator("#smartCostLimit-1").selectOption("115");

    await screenshot(
      page,
      `${BASE_PATH}/co2-modal`,
      "#loadpointSettingsModal_1 .modal-body > .container > div:first-child",
      {
        all: 50,
        top: 110,
        right: 70,
      },
    );
  });

  test("charging plan", async ({ page }) => {
    await page.goto(`/`);
    await page.locator("[data-testid=charging-plan] button").first().click();
    await wait(300);
    await page.getByTestId("plan-energy").selectOption("50");
    await screenshot(
      page,
      `${BASE_PATH}/co2-plan`,
      "#chargingPlanModal_1 .modal-content",
      {
        all: 20,
      },
    );
  });
});
