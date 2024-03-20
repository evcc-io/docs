const { expect } = require("@playwright/test");

const SVG_FILL = "#fff";
const SVG_BORDER = "#000";

// source https://icones.js.org/collection/ph?s=duotone
export const CURSOR = `<g fill="${SVG_BORDER}"><path d="M213.66 201L201 213.66a8 8 0 0 1-11.31 0L140 164a8 8 0 0 0-13 2.46l-19.46 44.77a8 8 0 0 1-14.85-.71L40.41 50.44a8 8 0 0 1 10-10l160.1 52.24a8 8 0 0 1 .71 14.85L166.45 127a8 8 0 0 0-2.45 13l49.67 49.67a8 8 0 0 1-.01 11.33" fill="${SVG_FILL}"/><path d="m169.64 134.33l44.77-19.46a16 16 0 0 0-1.41-29.8L52.92 32.8A16 16 0 0 0 32.8 52.92L85.07 213a15.83 15.83 0 0 0 14.41 11h.79a15.83 15.83 0 0 0 14.6-9.59l19.46-44.77L184 219.31a16 16 0 0 0 22.63 0l12.68-12.68a16 16 0 0 0 0-22.63Zm-69.48 73.76l.06-.05Zm95.15-.09l-49.66-49.67a16 16 0 0 0-26 4.94l-19.42 44.65L48 48l159.87 52.21l-44.64 19.41a16 16 0 0 0-4.94 26L208 195.31ZM88 24v-8a8 8 0 0 1 16 0v8a8 8 0 0 1-16 0M8 96a8 8 0 0 1 8-8h8a8 8 0 0 1 0 16h-8a8 8 0 0 1-8-8m112.85-67.58l8-16a8 8 0 0 1 14.31 7.16l-8 16a8 8 0 1 1-14.31-7.16m-81.69 96a8 8 0 0 1-3.58 10.74l-16 8a8 8 0 0 1-7.16-14.31l16-8a8 8 0 0 1 10.74 3.57"/></g>`;
export const ONE = `<g fill="${SVG_BORDER}"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" fill="${SVG_FILL}"/><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m12-136v96a8 8 0 0 1-16 0V95l-11.56 7.71a8 8 0 1 1-8.88-13.32l24-16A8 8 0 0 1 140 80"/></g>`;
export const TWO = `<g fill="${SVG_BORDER}"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" fill="${SVG_FILL}"/><path d="M153.56 123.26L120 168h32a8 8 0 0 1 0 16h-48a8 8 0 0 1-6.4-12.8l43.17-57.56a16 16 0 1 0-27.86-15a8 8 0 0 1-15.09-5.34a32 32 0 1 1 55.74 29.93ZM232 128A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></g>`;
export const THREE = `<g fill="${SVG_BORDER}"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" fill="${SVG_FILL}"/><path d="M160 152a36 36 0 0 1-61.71 25.19A8 8 0 1 1 109.71 166A20 20 0 1 0 124 132a8 8 0 0 1-6.55-12.59L136.63 92H104a8 8 0 0 1 0-16h48a8 8 0 0 1 6.55 12.59l-21 30A36.07 36.07 0 0 1 160 152m72-24A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></g>`;
export const FOUR = `<g fill="${SVG_BORDER}"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" fill="${SVG_FILL}"/><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m40-72a8 8 0 0 1-8 8h-8v24a8 8 0 0 1-16 0v-24H96a8 8 0 0 1-7.59-10.53l24-72a8 8 0 0 1 15.18 5.06L107.1 136H136v-24a8 8 0 0 1 16 0v24h8a8 8 0 0 1 8 8"/></g>`;
export const FIVE = `<g fill="${SVG_BORDER}"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" fill="${SVG_FILL}"/><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m-9.22-128l-4.19 25.14A38.8 38.8 0 0 1 124 112a36 36 0 0 1 0 72a35.54 35.54 0 0 1-25.71-10.4a8 8 0 1 1 11.42-11.2A19.73 19.73 0 0 0 124 168a20 20 0 0 0 0-40a19.73 19.73 0 0 0-14.29 5.6a8 8 0 0 1-13.6-6.92l8-48A8 8 0 0 1 112 72h40a8 8 0 0 1 0 16Z"/></g>`;
export const SIX = `<g fill="${SVG_BORDER}"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" fill="${SVG_FILL}"/><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m0-104h-1.82l16.69-27.9a8 8 0 0 0-13.74-8.2l-32.23 54A36 36 0 1 0 128 112m0 56a20 20 0 1 1 20-20a20 20 0 0 1-20 20"/></g>`;
export const ARROW = `<g fill="${SVG_BORDER}"><path d="M216 88v80a8 8 0 0 1-8 8h-88v48l-96-96l96-96v48h88a8 8 0 0 1 8 8" fill="${SVG_FILL}"/><path d="M208 72h-80V32a8 8 0 0 0-13.66-5.66l-96 96a8 8 0 0 0 0 11.32l96 96A8 8 0 0 0 128 224v-40h80a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16m0 96h-88a8 8 0 0 0-8 8v28.69L35.31 128L112 51.31V80a8 8 0 0 0 8 8h88Z"/></g>`;
export const HORIZONTAL = `<g fill="${SVG_BORDER}"><path d="m24 128l32-32v64Zm176-32v64l32-32Z" fill="${SVG_FILL}"/><path d="m237.66 122.34l-32-32A8 8 0 0 0 192 96v24H64V96a8 8 0 0 0-13.66-5.66l-32 32a8 8 0 0 0 0 11.32l32 32A8 8 0 0 0 64 160v-24h128v24a8 8 0 0 0 13.66 5.66l32-32a8 8 0 0 0 0-11.32M48 140.69L35.31 128L48 115.31Zm160 0v-25.38L220.69 128Z"/></g>`;

export async function placeOverlay(
  page,
  selector,
  symbol = CURSOR,
  xOffset = 0,
  yOffset = 0,
  rotate = 0,
) {
  await expect(page.locator(selector).first()).toBeVisible();
  await page.evaluate(
    ({ selector, symbol, xOffset, yOffset, rotate }) => {
      const element = document.querySelector(selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg",
        );
        svg.setAttribute("width", "42");
        svg.setAttribute("height", "42");
        svg.setAttribute("viewBox", "0 0 256 256");
        svg.innerHTML = symbol;
        svg.style.position = "absolute";
        svg.style.left = `${rect.left + rect.width / 2 + xOffset}px`;
        svg.style.top = `${rect.top + rect.height / 2 + yOffset}px`;
        svg.style.zIndex = "1100";
        svg.style.transform = `rotate(${rotate}deg)`;
        svg.classList.add("screenshot-overlay");
        document.body.appendChild(svg);
      }
    },
    { selector, symbol, xOffset, yOffset, rotate },
  );
}

export async function removeOverlays(page) {
  await page.evaluate(() => {
    const elements = document.querySelectorAll(".screenshot-overlay");
    elements.forEach((element) => element.remove());
  });
}
