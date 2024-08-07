const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay, removeOverlays } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeEach(async () => {
  await start("vehicles.evcc.yaml", "password.sql");
});
test.afterEach(async () => {
  await stop();
});

loop((screenshot) => {
  test("vehicle select", async ({ page }) => {
    await page.goto(`/`);

    await page.getByRole("button", { name: "blue IONIQ 6" }).click();
    await placeOverlay(page, "[data-testid='vehicle-name']", CURSOR, 50, -5);
    await screenshot(
      page,
      `${BASE_PATH}/vehicle-select`,
      ".container--loadpoint > .carousel > div",
      {
        all: 20,
      },
    );
  });
});
