import { test, expect } from "@playwright/test";
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay, removeOverlays } from "./utils/overlay";
import enableExperimental from "./utils/enableExperimental";
import { start, stop } from "./utils/evcc";

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start("basics.evcc.yaml", "password.sql");
});

test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("batterie boost", async ({ page }) => {
    await page.goto(`/`);
    await enableExperimental(page);

    await page.getByTestId("loadpoint-settings-button").nth(1).click();
    await wait(700);
    await page.getByTestId("battery-boost-checkbox").first().click();

    await placeOverlay(page, "[data-testid=battery-boost-checkbox]", CURSOR);

    await screenshot(
      page,
      `${BASE_PATH}/batterie-boost`,
      "#loadpointSettingsModal_1 .modal-content",
      {
        all: 20,
      },
    );
  });
});
