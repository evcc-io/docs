const { test } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, placeOverlay } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start("basics.evcc.yaml");
});
test.afterAll(async () => {
  await stop();
});

loop((screenshot) => {
  test("solar mode", async ({ page }) => {
    await page.goto(`/`);
    await placeOverlay(page, ".mode-group > .btn:nth-child(2)", CURSOR, 20, 10);
    await screenshot(
      page,
      `${BASE_PATH}/solar-mode`,
      ".loadpoint > div:first-child",
      30,
      40,
    );
  });
});
