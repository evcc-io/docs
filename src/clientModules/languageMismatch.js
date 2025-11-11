import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const DISMISSED_KEY = "langMismatchDismissed";

function createLanguageMismatchDialog() {
  if (!ExecutionEnvironment.canUseDOM) return;

  // Check if already dismissed
  if (localStorage.getItem(DISMISSED_KEY)) {
    return;
  }

  // Detect page language from initial URL
  const path = window.location.pathname;
  const isEnglishPage = path.startsWith("/en/") || path.startsWith("/en");
  const pageLanguage = isEnglishPage ? "en" : "de";

  // Detect browser language preference
  const browserLang = (
    navigator.language ||
    navigator.userLanguage ||
    ""
  ).toLowerCase();
  const prefersEnglish = browserLang.startsWith("en");
  const prefersGerman = browserLang.startsWith("de");

  // Determine if dialog should be shown
  let shouldShow = false;
  let message = "";
  let switchText = "";
  let stayText = "";
  let targetLanguage = "";

  if (pageLanguage === "de" && prefersEnglish) {
    shouldShow = true;
    message = "This page is available in English.";
    switchText = "Switch to English";
    stayText = "No thanks";
    targetLanguage = "en";
  } else if (pageLanguage === "en" && prefersGerman && !prefersEnglish) {
    shouldShow = true;
    message = "Diese Seite ist auf Deutsch verfügbar.";
    switchText = "Zu Deutsch wechseln";
    stayText = "Nein danke";
    targetLanguage = "de";
  }

  if (!shouldShow) return;

  // Create dialog container
  const dialog = document.createElement("div");
  dialog.className = "lang-dialog-container";
  dialog.style.animation = "langDialogSlideIn 0.3s ease-out";

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    .lang-dialog-container {
      --lang-dialog-bg: var(--ifm-card-background-color);
      --lang-dialog-text: var(--ifm-font-color-base);
      --lang-dialog-accent: var(--ifm-color-primary);
      --lang-dialog-accent-hover: var(--ifm-color-primary-dark);
      --lang-dialog-accent-light: var(--ifm-color-primary-lightest);
      --lang-dialog-border: var(--ifm-color-emphasis-300);
      --lang-dialog-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      --lang-dialog-border-width: 2px;
    }

    html[data-theme='dark'] .lang-dialog-container {
      --lang-dialog-accent-light: rgba(15, 221, 66, 0.1);
      --lang-dialog-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }

    .lang-dialog-container {
      position: fixed;
      bottom: 16px;
      right: 16px;
      border-radius: var(--ifm-card-border-radius);
      box-shadow: var(--lang-dialog-shadow);
      padding: 14px 16px;
      max-width: calc(100vw - 32px);
      width: max-content;
      z-index: 10000;
      font-family: var(--ifm-font-family-base);
      background: var(--lang-dialog-bg);
      border: 1px solid var(--lang-dialog-border);
    }

    @keyframes langDialogSlideIn {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .lang-dialog-message {
      margin: 0 0 12px 0;
      color: var(--lang-dialog-text);
      font-size: 14px;
      line-height: 1.4;
    }

    .lang-dialog-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: nowrap;
    }

    .lang-dialog-btn {
      padding: 8px 16px;
      border-radius: var(--ifm-button-border-radius);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      text-align: center;
      white-space: nowrap;
      font-family: var(--ifm-font-family-base);
    }

    .lang-dialog-btn-primary {
      background: var(--lang-dialog-accent);
      color: white;
      border: var(--lang-dialog-border-width) solid var(--lang-dialog-accent);
    }

    .lang-dialog-btn-primary:hover {
      background: var(--lang-dialog-accent-hover);
      color: white;
      text-decoration: none;
    }

    .lang-dialog-btn-secondary {
      background: transparent;
      color: var(--lang-dialog-accent);
      border: var(--lang-dialog-border-width) solid var(--lang-dialog-accent);
    }

    .lang-dialog-btn-secondary:hover {
      background: var(--lang-dialog-accent-light);
      text-decoration: none;
    }

    @keyframes langDialogSlideOut {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100px);
        opacity: 0;
      }
    }
  `;

  document.head.appendChild(style);

  // Create dialog content
  dialog.innerHTML = `
    <p class="lang-dialog-message">${message}</p>
    <div class="lang-dialog-buttons">
      <button class="lang-dialog-btn lang-dialog-btn-secondary" id="langDialogStay">${stayText}</button>
      <button class="lang-dialog-btn lang-dialog-btn-primary" id="langDialogSwitch">${switchText}</button>
    </div>
  `;

  document.body.appendChild(dialog);

  // Handle dismiss button
  const stayButton = dialog.querySelector("#langDialogStay");
  stayButton.addEventListener("click", () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    dialog.style.animation = "langDialogSlideOut 0.3s ease-out";
    setTimeout(() => dialog.remove(), 300);
  });

  // Handle switch button - get current URL at click time
  const switchButton = dialog.querySelector("#langDialogSwitch");
  switchButton.addEventListener("click", () => {
    const currentPath = window.location.pathname;
    let targetUrl;

    if (targetLanguage === "en") {
      targetUrl = "/en" + currentPath;
    } else {
      targetUrl = currentPath.replace(/^\/en/, "") || "/";
    }

    window.location.href = targetUrl;
  });
}

// Export for Docusaurus client module lifecycle
export function onRouteDidUpdate({ location, previousLocation }) {
  // Only show dialog on initial page load
  if (!previousLocation) {
    createLanguageMismatchDialog();
  }
}
