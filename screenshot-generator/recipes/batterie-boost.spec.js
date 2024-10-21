const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay, removeOverlays } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start(["basics.evcc.yaml"], "password.sql");
});
test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("batterie boost", async ({ page }) => {
    await page.goto(`/`);
    
    
    await page.getByTestId("loadpoint-settings-button").nth(1).click();
    await wait(300);

    await placeOverlay(
      page,
      "[data-testid=battery-boost-checkbox].d-sm-block",
      CURSOR,
    );

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
