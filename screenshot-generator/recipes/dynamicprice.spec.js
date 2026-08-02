const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start(["basics.evcc.yaml", "dynamicprice.evcc.yaml"], "password.sql");
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
    await page.locator("#smartCostLimit-1").selectOption("0.2");
    await expect(limitActive).toBeChecked();
    await wait(300);

    await screenshot(
      page,
      `${BASE_PATH}/dynamicprice-modal`,
      "#loadpointSettingsModal_1 .modal-body > .container > div:first-child",
      {
        all: 50,
        top: 110,
        right: 70,
      },
    );
  });

  test("charging plan", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-testid=charging-plan] button").first().click();
    await wait(300);
    await page.getByTestId("static-plan-energy").selectOption("30");
    await screenshot(
      page,
      `${BASE_PATH}/dynamicprice-plan`,
      "[data-testid=charging-plan-modal] .modal-content",
      {
        all: 20,
      },
    );
  });
});
