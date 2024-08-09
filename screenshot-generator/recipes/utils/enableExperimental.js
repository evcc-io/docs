export default async function enableExperimental(page) {
  await page.getByTestId("topnavigation-button").click();
  await page.getByTestId("topnavigation-settings").click();
  await page.locator("#hiddenFeaturesEnabled").click();
  await page.getByRole("button", { name: "Close" }).click();
}
