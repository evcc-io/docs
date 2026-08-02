const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, placeOverlay, removeOverlays } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";
const MODAL = "[data-testid=charging-plan-modal]";

test.beforeEach(async () => {
  await start(["vehicles.evcc.yaml", "dynamicprice.evcc.yaml"], "password.sql");
});
test.afterEach(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("charging plan soc", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-testid=charging-plan] button").first().click();
    await wait(300);
    await page.getByTestId("static-plan-soc").selectOption("90");
    await page.getByTestId("static-plan-time").fill("10:00");
    await page.getByTestId("static-plan-active").click();
    await placeOverlay(page, "#chargingplan-lp1-1-goal", CURSOR, 60, 5);
    await screenshot(page, `${BASE_PATH}/plan-soc`, `${MODAL} .modal-content`, {
      all: 20,
    });
    await removeOverlays(page);

    // late charging (strategy settings)
    await page.locator(`${MODAL} h5 button`).click();
    await wait(300);
    await page.locator("#chargingplan-1-precondition").selectOption("3600");
    await wait(300);
    await placeOverlay(page, "#chargingplan-1-precondition", CURSOR, 0, 5);
    await screenshot(
      page,
      `${BASE_PATH}/plan-precondition`,
      `${MODAL} .modal-content`,
      { all: 20 },
    );
    await page.locator("#chargingplan-1-precondition").selectOption("0");
    await page.locator(`${MODAL} h5 button`).click();
    await removeOverlays(page);

    // repeating
    await page.getByTestId("static-plan-active").click();
    await page.getByTestId("repeating-plan-add").click();
    await page.getByTestId("repeating-plan-soc").selectOption("40");
    await page.getByTestId("repeating-plan-active").click();
    await placeOverlay(page, "#chargingplan-lp1-2-weekdays", CURSOR, 0, 5);
    await screenshot(
      page,
      `${BASE_PATH}/plan-soc-repeating`,
      `${MODAL} .modal-content`,
      { all: 20 },
    );
    await removeOverlays(page);
  });

  test("charging plan energy", async ({ page }) => {
    await page.goto("/");

    await page
      .getByTestId("change-vehicle")
      .first()
      .locator("select")
      .selectOption("vehicle_3");

    await page.locator("[data-testid=charging-plan] button").first().click();
    await wait(300);
    await page.getByTestId("static-plan-energy").selectOption("20");
    await page.getByTestId("static-plan-active").click();
    await placeOverlay(page, "#chargingplan-lp1-1-goal", CURSOR, 60, 5);
    await screenshot(
      page,
      `${BASE_PATH}/plan-energy`,
      `${MODAL} .modal-content`,
      {
        all: 20,
      },
    );
  });
});
