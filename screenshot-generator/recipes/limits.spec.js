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
  test("min soc / limit soc / limit energy", async ({ page }) => {
    await page.goto(`/`);

    await expect(page.getByTestId("vehicle-name").first()).toHaveText(
      "blue IONIQ 6",
    );
    await expect(page.getByTestId("vehicle-name").last()).toHaveText(
      "white Model 3",
    );

    await page.locator("[data-testid=charging-plan] button").first().click();
    await page
      .locator("#chargingPlanModal_1 .nav-tabs .nav-item")
      .last()
      .click();
    await page.locator("#chargingplan_1_minsoc").selectOption("25");
    await placeOverlay(page, "#chargingplan_1_minsoc", CURSOR, 70, 5);
    await screenshot(
      page,
      `${BASE_PATH}/minsoc-setting`,
      "#chargingPlanModal_1 .modal-content",
      {
        all: 20,
      },
    );
    await removeOverlays(page);
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.locator("#chargingPlanModal_1")).not.toBeVisible();
    await screenshot(
      page,
      `${BASE_PATH}/minsoc-loadpoint`,
      ".container--loadpoint > .carousel > div:nth-child(1)",
      {
        all: 20,
      },
    );

    await page.locator("[data-testid=charging-plan] button").last().click();
    await page
      .locator("#chargingPlanModal_2 .nav-tabs .nav-item")
      .last()
      .click();
    await page.locator("#chargingplan_2_limitsoc").selectOption("80");
    await placeOverlay(page, "#chargingplan_2_limitsoc", CURSOR, 70, 5);
    await screenshot(
      page,
      `${BASE_PATH}/limitsoc-setting`,
      "#chargingPlanModal_2 .modal-content",
      {
        all: 20,
      },
    );
    await removeOverlays(page);
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.locator("#chargingPlanModal_2")).not.toBeVisible();
    await page
      .getByTestId("limit-soc")
      .locator("select")
      .last()
      .selectOption("90");
    await placeOverlay(
      page,
      ".container--loadpoint > .carousel > div:nth-child(2) [data-testid=limit-soc] select",
      CURSOR,
      15,
      0,
    );
    await screenshot(
      page,
      `${BASE_PATH}/limitsoc-loadpoint`,
      ".container--loadpoint > .carousel > div:nth-child(2)",
      {
        all: 20,
      },
    );

    // limit energy
    await page
      .locator("#vehicleOptionsDropdown2")
      .selectOption("red Fiat 500e");
    await expect(page.getByTestId("vehicle-name").last()).toHaveText(
      "red Fiat 500e",
    );
    await page
      .getByTestId("limit-energy")
      .locator("select")
      .last()
      .selectOption("30");
    await screenshot(
      page,
      `${BASE_PATH}/limitenergy-loadpoint`,
      ".container--loadpoint > .carousel > div:nth-child(2)",
      {
        all: 20,
      },
    );
  });
});
