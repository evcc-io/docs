const { test, expect } = require("@playwright/test");
import { loop } from "./utils/loop";
import { CURSOR, ARROW, placeOverlay, removeOverlays } from "./utils/overlay";
const { start, stop } = require("./utils/evcc");

const BASE_PATH = "features/screenshots";
const VEHICLES_MENU_LABEL = { en: "Vehicles", de: "Fahrzeuge" };
const MODAL = "[data-testid=vehicle-settings-modal]";

test.beforeEach(async () => {
  await start("vehicles.evcc.yaml", "password.sql");
});
test.afterEach(async () => {
  await stop();
});

loop((screenshot, { lang }) => {
  async function openVehicleSettings(page) {
    const moreTab = page.getByTestId("tab-more");
    await moreTab.click();
    await moreTab
      .getByRole("button", { name: VEHICLES_MENU_LABEL[lang] })
      .click();
    await expect(page.locator(MODAL)).toBeVisible();
  }

  async function closeVehicleSettings(page) {
    await page.locator(`${MODAL} .btn-close`).click();
    await expect(page.locator(MODAL)).not.toBeVisible();
  }

  test("min soc / limit soc / limit energy", async ({ page }) => {
    await page.goto(`/`);

    await expect(page.getByTestId("vehicle-name").first()).toHaveText(
      "blue IONIQ 6",
    );
    await expect(page.getByTestId("vehicle-name").last()).toHaveText(
      "white Model 3",
    );

    // min charge (vehicle settings)
    await openVehicleSettings(page);
    await page.locator("#vehicleSettings-vehicle_1-minSoc").selectOption("25");
    await placeOverlay(
      page,
      "select#vehicleSettings-vehicle_1-minSoc",
      CURSOR,
      70,
      50,
    );
    await screenshot(
      page,
      `${BASE_PATH}/minsoc-setting`,
      `${MODAL} .modal-content`,
      {
        all: 20,
      },
    );
    await removeOverlays(page);
    await closeVehicleSettings(page);
    await screenshot(
      page,
      `${BASE_PATH}/minsoc-loadpoint`,
      ".container--loadpoint > .carousel > div:nth-child(1)",
      {
        all: 20,
      },
    );

    // limit soc (vehicle settings)
    await openVehicleSettings(page);
    await page
      .locator("#vehicleSettings-vehicle_2-limitSoc")
      .selectOption("80");
    await placeOverlay(
      page,
      "select#vehicleSettings-vehicle_2-limitSoc",
      CURSOR,
      70,
      50,
    );
    await screenshot(
      page,
      `${BASE_PATH}/limitsoc-setting`,
      `${MODAL} .modal-content`,
      {
        all: 20,
      },
    );
    await removeOverlays(page);
    await closeVehicleSettings(page);

    // limit soc (loadpoint)
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
      .getByTestId("change-vehicle")
      .last()
      .locator("select")
      .selectOption("vehicle_3");
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
