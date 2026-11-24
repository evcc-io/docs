import axios from "axios";
import playwrightConfig from "../../playwright.config";

const cache = {};

// UI strings from the running evcc instance, e.g. t("nl", "main.vehicleSettings.menu")
export async function t(lang, key) {
  cache[lang] ??= axios
    .get(`${playwrightConfig.use.baseURL}/i18n/${lang}.json`)
    .then((res) => res.data);
  const dict = await cache[lang];
  return key.split(".").reduce((o, k) => o?.[k], dict);
}
