import { test, expect } from "@playwright/test";
import { loop } from "./utils/loop";
import { start, stop } from "./utils/evcc";

const BASE_PATH = "reference/screenshots";
const BRAND = "G1GA HEMS";

test.beforeAll(async () => {
  await start("basics.evcc.yaml", "password.sql", [
    "--disable-auth",
    "--custom-brand",
    BRAND,
    "--custom-logo-light",
    "recipes/custom-logo-light.svg",
    "--custom-logo-dark",
    "recipes/custom-logo-dark.svg",
    "--custom-website",
    "https://example.com/hems",
    "--custom-email",
    "support@example.com",
    "--custom-phone",
    "+49 123 456789",
    "--custom-css",
    "recipes/white-label.css",
  ]);
});

test.afterAll(async () => {
  await stop();
});

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// shorten dev version strings like "0.315.0-dev.1788086532" to "0.315.0"
async function shortenVersion(page) {
  await page.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.includes("-dev")) {
        node.nodeValue = node.nodeValue.replace(/-dev[.+][0-9a-f]+/gi, "");
      }
    }
    document.querySelectorAll("input").forEach((input) => {
      input.value = input.value.replace(/-dev[.+][0-9a-f]+/gi, "");
    });
  });
}

loop((screenshot, { lang }) => {
  test("more menu shows custom brand", async ({ page }) => {
    await page.goto(`/`);
    page.setViewportSize({ width: 430, height: 800 });

    const moreTab = page.getByTestId("tab-more");
    await moreTab.click();
    const menu = moreTab.locator(".more-menu");
    await expect(menu.getByRole("button", { name: BRAND })).toBeVisible();
    await shortenVersion(page);
    // headless rendering misses the backdrop blur, approximate it
    await page.evaluate(() => {
      const menu = document.querySelector(".more-menu");
      if (menu) menu.style.background = "var(--evcc-box)";
      const backdrop = document.querySelector(".more-backdrop");
      if (backdrop)
        backdrop.style.backgroundColor =
          "color-mix(in srgb, var(--evcc-background) 92%, transparent)";
    });
    await wait(700);

    await screenshot(
      page,
      `${BASE_PATH}/white-label-menu`,
      "[data-testid=tab-more] .more-menu",
      { left: 120, right: 20, top: 40, bottom: 80 },
    );
  });

  test("about modal shows custom logo and contact info", async ({ page }) => {
    await page.goto(`/`);

    const moreTab = page.getByTestId("tab-more");
    await moreTab.click();
    await moreTab.getByRole("button", { name: BRAND }).click();
    await expect(page.locator("#aboutModal")).toBeVisible();
    await expect(page.getByRole("img", { name: BRAND })).toBeVisible();
    await wait(700);

    // use the next larger modal breakpoint for a wider screenshot
    await page.evaluate(() => {
      document
        .querySelector("#aboutModal .modal-dialog")
        ?.classList.remove("modal-sm");
    });
    await shortenVersion(page);
    await wait(300);

    await screenshot(
      page,
      `${BASE_PATH}/white-label-about`,
      "#aboutModal .modal-content",
      { x: 140, y: 60 },
    );
  });

  test("problem report uses email flow", async ({ page }) => {
    // wait for the app to finish booting, otherwise the router bounces back to "/"
    await page.getByTestId("tab-more").waitFor();
    await page.goto(`/#/issue`);
    await page.locator("#issueDescription").waitFor();

    const demo = {
      en: {
        title: "Charging stops at 80%",
        description:
          "Since yesterday the car stops charging at 80% even though the limit is set to 100%.",
      },
      de: {
        title: "Ladung stoppt bei 80%",
        description:
          "Seit gestern stoppt die Ladung bei 80%, obwohl das Limit auf 100% eingestellt ist.",
      },
    }[lang] ?? { title: "", description: "" };
    await page.locator("#issueTitle").fill(demo.title);
    await page.locator("#issueDescription").fill(demo.description);
    await shortenVersion(page);
    await wait(300);

    await screenshot(
      page,
      `${BASE_PATH}/white-label-issue`,
      ".container main",
      {
        x: 30,
        y: 30,
      },
    );
  });
});
