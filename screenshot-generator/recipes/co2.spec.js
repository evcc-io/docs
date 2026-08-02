const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, placeOverlay, removeOverlays } from "./utils/overlay";
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
    await page.goto("/");
    await page.getByTestId("loadpoint-settings-button").nth(1).click();
    await wait(300);

    const limitActive = page.locator("#smartCostLimit-1Active");
    if (!(await limitActive.isChecked())) {
      await limitActive.click();
    }
    await page
      .locator("#smartCostLimit-1")
      .selectOption({ label: "≤ 100 g/kWh" });
    await expect(limitActive).toBeChecked();
    await wait(300);

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

    await page
      .locator("#loadpointSettingsModal_1")
      .getByRole("button", { name: /Close|Schließen/ })
      .click();
    await expect(page.locator("#loadpointSettingsModal_1")).not.toBeVisible();
    await expect(
      page.getByTestId("vehicle-status-smartcost").first(),
    ).toBeVisible();

    await placeOverlay(
      page,
      "[data-testid=loadpoint-settings-button].d-sm-block",
      CURSOR,
      20,
      10,
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
  });

  test("charging plan", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-testid=charging-plan] button").first().click();
    await wait(300);
    await page.getByTestId("static-plan-energy").selectOption("50");
    await screenshot(
      page,
      `${BASE_PATH}/co2-plan`,
      "[data-testid=charging-plan-modal] .modal-content",
      {
        all: 20,
      },
    );
  });
});
