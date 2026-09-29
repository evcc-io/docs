import { test, expect } from "@playwright/test";
import { loop } from "./utils/loop";
import { start, stop } from "./utils/evcc";

const BASE_PATH = "report-a-problem";

test.beforeAll(async () => {
  await start("basics.evcc.yaml", "password.sql", ["--disable-auth"]);
});

test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const REPORT = {
  en: {
    title: "Carport: charging stops after switching to 1 phase",
    description:
      "Expected: charging continues with 1 phase when solar surplus drops.\nActual: charging stops and only resumes after replugging the vehicle.",
    steps:
      "1. Solar mode, vehicle charges with 3 phases\n2. Surplus drops below 4.1 kW\n3. Phases switch to 1, charging stops",
  },
  de: {
    title: "Carport: Ladung stoppt nach Umschaltung auf 1 Phase",
    description:
      "Erwartet: Die Ladung läuft 1-phasig weiter, wenn der PV-Überschuss sinkt.\nTatsächlich: Die Ladung stoppt und startet erst nach erneutem Anstecken.",
    steps:
      "1. PV-Modus, Fahrzeug lädt 3-phasig\n2. Überschuss sinkt unter 4,1 kW\n3. Umschaltung auf 1 Phase, Ladung stoppt",
  },
};

// shorten dev version strings like "0.315.0-dev.1788086532" to "0.315.0"
async function shortenVersion(page) {
  await page.evaluate(() => {
    document.querySelectorAll("input").forEach((input) => {
      input.value = input.value.replace(/-dev[.+][0-9a-f]+/gi, "");
    });
  });
}

loop((screenshot, { lang }) => {
  test("logs", async ({ page }) => {
    await page.getByTestId("tab-more").waitFor();
    await page.goto(`/#/log?level=trace&areas=lp-1`);
    await expect(page.getByTestId("log-content")).toBeVisible();
    page.setViewportSize({ width: 1280, height: 700 });
    await wait(500);

    await screenshot(page, `${BASE_PATH}/logs`);
  });

  test("report a problem", async ({ page }) => {
    await page.getByTestId("tab-more").waitFor();
    await page.goto(`/#/issue`);
    await page.locator("#helpTypeBug").check();
    await page.locator("#issueTitle").fill(REPORT[lang].title);
    await page.locator("#issueDescription").fill(REPORT[lang].description);
    await page.locator("#stepsToReproduce").fill(REPORT[lang].steps);
    await shortenVersion(page);
    // show a typical installation instead of the local test setup
    await page.evaluate(() => {
      document.querySelector("#system").value = "linux/arm64";
      const [yaml, db] = document.querySelectorAll("main form code");
      yaml.textContent = "/etc/evcc.yaml";
      db.textContent = "/var/lib/evcc/evcc.db";
    });
    // tall enough to keep the submit button above the navigation bar
    await page.setViewportSize({ width: 1280, height: 1400 });
    await wait(300);

    await screenshot(page, `${BASE_PATH}/report-a-problem`, ".container", {
      x: 0,
      top: 0,
      bottom: 30,
    });
  });
});
