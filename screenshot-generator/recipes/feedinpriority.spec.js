const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";

test.beforeAll(async () => {
  await start(["basics.evcc.yaml", "feedinpriority.evcc.yaml"], "password.sql");
});
test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

loop((screenshot) => {
  test("feedin priority", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("loadpoint-settings-button").nth(1).click();
    await wait(300);

    const limitActive = page.locator("#smartFeedInPriority-1Active");
    if (!(await limitActive.isChecked())) {
      await limitActive.click();
    }
    await page.locator("#smartFeedInPriority-1").selectOption("0.3");
    await expect(limitActive).toBeChecked();
    await wait(300);

    await screenshot(
      page,
      `${BASE_PATH}/feedin-priority-modal`,
      "#loadpointSettingsModal_1 .modal-body > .container > div:first-child",
      {
        all: 50,
        top: 110,
        right: 70,
      },
    );
  });
});
