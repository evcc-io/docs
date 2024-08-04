const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeEach(async () => {
  await start(["vehicles.evcc.yaml", "dynamicprice.evcc.yaml"], "password.sql");
});
test.afterEach(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("charging plan soc", async ({ page }) => {
    await page.goto(`/`);
    await page.locator("[data-testid=charging-plan] button").first().click();
    await wait(300);
    await page.getByTestId("plan-soc").selectOption("90");
    await page.getByTestId("plan-active").click();
    await placeOverlay(page, "#chargingplan-1_0-goal", CURSOR, 60, 5);
    await screenshot(
      page,
      `${BASE_PATH}/plan-soc`,
      "#chargingPlanModal_1 .modal-content",
      {
        all: 20,
      },
    );
  });

  test("charging plan energy", async ({ page }) => {
    await page.goto(`/`);

    await page
      .locator("#vehicleOptionsDropdown1")
      .selectOption("red Fiat 500e");

    await page.locator("[data-testid=charging-plan] button").first().click();
    await wait(300);
    await page.getByTestId("plan-energy").selectOption("20");
    await page.getByTestId("plan-active").click();
    await placeOverlay(page, "#chargingplan-1_0-goal", CURSOR, 60, 5);
    await screenshot(
      page,
      `${BASE_PATH}/plan-energy`,
      "#chargingPlanModal_1 .modal-content",
      {
        all: 20,
      },
    );
  });
});
