const { defineConfig, devices } = require("@playwright/test");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./recipes",
  testMatch: "**/*.spec.js",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 5000,
  expect: {
    timeout: 5000,
  },
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:7070",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        deviceScaleFactor: 2,
        viewport: { width: 1280, height: 1200 },
      },
    },
  ],
});
