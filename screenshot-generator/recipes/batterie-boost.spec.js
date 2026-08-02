import { test, expect } from "@playwright/test";
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay, removeOverlays } from "./utils/overlay";
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

    await page.getByTestId("loadpoint-settings-button").nth(1).click();
    await wait(700);
    await page.getByTestId("battery-boost-limit").first().selectOption("20");
    await wait(300);

    await placeOverlay(page, "[data-testid=battery-boost-limit]", CURSOR);

    await screenshot(
      page,
      `${BASE_PATH}/battery-boost`,
      "#loadpointSettingsModal_1 .modal-content",
      {
        all: 20,
      },
    );
  });
});
