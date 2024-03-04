const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { ONE, TWO, THREE, placeOverlay, removeOverlays } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start("charging-sessions.yaml");
});
test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("loadpoint", async ({ page }) => {
    await page.goto(`/`);
    await wait(3000);
    await page.getByTestId("sessionInfoSelect").first().selectOption("solar");
    await placeOverlay(page, "shopicon-regular-lightning", ONE, 20, -18);
    await placeOverlay(page, ".vehicle .details div:first-child", TWO, 10, -30);
    await placeOverlay(page, "[data-testid=sessionInfoSelect]", THREE);
    await screenshot(
      page,
      `${BASE_PATH}/charging-sessions-main-ui`,
      "[data-testid=loadpoint]:first-child",
      {
        all: 20,
      },
    );
    await removeOverlays(page);
  });
});
