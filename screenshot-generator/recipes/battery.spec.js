const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import {
  CURSOR,
  ONE,
  TWO,
  THREE,
  FOUR,
  placeOverlay,
  removeOverlays,
} from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeEach(async () => {
  await start("basics.evcc.yaml", "password.sql");
});
test.afterEach(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("priority soc, buffer soc, buffer start soc", async ({ page }) => {
    await page.goto(`/`);
    await page.getByTestId("topnavigation-button").click();
    await page.locator("[data-testid=topnavigation-battery]").hover();
    await placeOverlay(
      page,
      "[data-testid=topnavigation-battery]",
      CURSOR,
      50,
      5,
    );
    await screenshot(
      page,
      `${BASE_PATH}/battery-navigation`,
      "[data-testid=topnavigation-dropdown]",
      { all: 20 },
    );
    await removeOverlays(page);

    await page.getByTestId("topnavigation-battery").click();
    await expect(page.locator("#batterySettingsModal")).toBeVisible();

    await page.locator(".prioritySoc select").selectOption("50");
    await wait(300);
    await placeOverlay(page, ".prioritySoc select", CURSOR, 0, 10);
    await placeOverlay(page, ".battery .bg-darkest-green", ONE, -100, -21);
    await placeOverlay(page, ".battery .bg-darker-green", TWO, -100, -21);

    await screenshot(
      page,
      `${BASE_PATH}/battery-priority`,
      "#batterySettingsModal .modal-content",
      {
        all: 20,
        top: 10,
      },
    );
    await removeOverlays(page);

    // buffer soc
    await page.locator(".bufferSoc select").selectOption("75");
    await wait(300);
    await placeOverlay(page, ".bufferSoc select", CURSOR, 0, 10);
    await placeOverlay(page, ".battery .bg-dark-green", THREE, -100, -21);

    await screenshot(
      page,
      `${BASE_PATH}/battery-buffer`,
      "#batterySettingsModal .modal-content",
      {
        all: 20,
        top: 10,
      },
    );
    await removeOverlays(page);

    // buffer start
    await page.locator("#batterySettingsBufferStart").selectOption("90");
    await wait(300);
    await placeOverlay(page, "#batterySettingsBufferStart", CURSOR, 0, 10);
    await placeOverlay(page, ".bufferStartIndicator", FOUR, -100, -21);

    await screenshot(
      page,
      `${BASE_PATH}/battery-bufferstart`,
      "#batterySettingsModal .modal-content",
      {
        all: 20,
        top: 10,
      },
    );
    await removeOverlays(page);
  });
});
