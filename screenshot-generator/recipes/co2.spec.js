const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start(["basics.evcc.yaml", "co2.evcc.yaml"]);
});
test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("smart grid charging", async ({ page }) => {
    await page.goto(`/`);
    await page.getByTestId("topnavigation-button").click();
    await page
      .locator(
        "[data-testid=topnavigation-dropdown] li:nth-child(4) > .dropdown-item",
      )
      .hover();
    await placeOverlay(
      page,
      "[data-testid=topnavigation-dropdown] li:nth-child(4) > .dropdown-item",
      CURSOR,
      50,
      5,
    );
    await screenshot(
      page,
      `${BASE_PATH}/co2-modal-navigation`,
      "[data-testid=topnavigation-dropdown]",
      {
        all: 20,
      },
    );

    await page
      .getByTestId("topnavigation-dropdown")
      .locator("li:nth-child(4) > .dropdown-item")
      .click();
    await wait(300);

    await page.locator("#smartCostLimit").selectOption("115");

    await screenshot(
      page,
      `${BASE_PATH}/co2-modal`,
      "#gridSettingsModal .modal-content",
      {
        all: 20,
        top: 10,
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
