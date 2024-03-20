import React from "react";
import { ThemedComponent } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default ({ name, caption, area = "docs" }) => {
  const { i18n } = useDocusaurusContext();
  const currentLanguage = i18n.currentLocale;

  let prefix = "";
  if (area === "docs") {
    prefix =
      currentLanguage === "de"
        ? "docs/"
        : `i18n/${currentLanguage}/docusaurus-plugin-content-docs/current/`;
  }

  const path = `${prefix}${name}`;
  const sources1x = {
    light: require(`@site/${path}-light-1x.webp`).default,
    dark: require(`@site/${path}-dark-1x.webp`).default,
  };
  const sources2x = {
    light: require(`@site/${path}-light-2x.webp`).default,
    dark: require(`@site/${path}-dark-2x.webp`).default,
  };

  return (
    <figure
      style={{
        maxWidth: "100%",
        height: "auto",
        margin: "0",
        marginBottom: "var(--ifm-leading)",
      }}
    >
      <ThemedComponent>
        {({ theme, className }) => (
          <img
            src={sources1x[theme]}
            srcSet={`${sources1x[theme]} 1x, ${sources2x[theme]} 2x`}
            alt={caption}
            className={className}
            loading="lazy"
            style={{
              border: "1px solid var(--ifm-color-emphasis-300)",
              borderRadius: "var(--ifm-pagination-nav-border-radius)",
            }}
          />
        )}
      </ThemedComponent>
    </figure>
  );
};
