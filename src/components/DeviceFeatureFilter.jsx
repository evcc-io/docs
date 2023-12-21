import React from "react";
import { chargerFeatures } from "./features";

function showEverything() {
  // remove all hidden-by-feature-filter classes
  const hiddenElements = document.querySelectorAll(".hidden-by-feature-filter");
  hiddenElements.forEach((hiddenElement) => {
    hiddenElement.classList.remove("hidden-by-feature-filter");
  });
}

function updateTableOfContents() {
  // hide toc items based on hidden h2, h3 elements
  const hiddenHeadlines = document.querySelectorAll(
    "main h2.hidden-by-feature-filter, main h3.hidden-by-feature-filter",
  );
  hiddenHeadlines.forEach((headline) => {
    const headlineId = headline.id;
    const tocElement = document.querySelector(
      `.table-of-contents__link[href="#${headlineId}"]`,
    );
    tocElement.classList.add("hidden-by-feature-filter");
  });
}

function filterByFeatures(features) {
  showEverything();
  const mainElement = document.querySelector("main");

  // Helper function to check if a <div> node has all the requested features
  const divHasAllFeatures = (node) => {
    return features.every((feature) => node.classList.contains(feature));
  };

  // Helper function to hide or show nodes based on feature presence
  const applyVisibility = (nodes, hasAll) => {
    nodes.forEach((n) => {
      if (hasAll) {
        n.classList.remove("hidden-by-feature-filter");
      } else {
        n.classList.add("hidden-by-feature-filter");
      }
    });
  };

  // Iterate through all child nodes of main
  const firstElement = document.querySelector("main h2");
  let node = firstElement;
  let nodesToHideOrShow = [];
  let h2Nodes = [];
  let hasAll = false;
  let hasH3Feature = false; // Tracks whether an H3 subsection has the required features

  while (node) {
    if (node.tagName === "H2") {
      // Apply visibility to previous H2 and its associated nodes based on whether it or any of its H3s had the features
      applyVisibility(h2Nodes, hasH3Feature || hasAll);
      applyVisibility(nodesToHideOrShow, hasAll);

      // Start tracking for the new H2 section
      h2Nodes = [node];
      nodesToHideOrShow = [];
      hasAll = false; // reset the flag
      hasH3Feature = false; // Reset the H3 feature flag for the new H2 section
    } else if (node.tagName === "H3") {
      // For H3 sections, hide or show them based on the feature presence
      applyVisibility(nodesToHideOrShow, hasAll);

      // If the H3 section had the features, set the H3 feature flag
      if (hasAll) {
        hasH3Feature = true;
      }

      // Start tracking for the new H3 subsection
      nodesToHideOrShow = [node];
      hasAll = false; // reset the flag
    } else {
      // For all other nodes, add them to the queue
      nodesToHideOrShow.push(node);

      // If it's a <div> node and we haven't found the features yet, check for features
      if (!hasAll && node.tagName === "DIV") {
        hasAll = divHasAllFeatures(node);
      }
    }

    // Move to the next node
    node = node.nextElementSibling;

    // If we've reached the end, handle any remaining nodes
    if (!node) {
      applyVisibility(nodesToHideOrShow, hasAll);
      applyVisibility(h2Nodes, hasH3Feature || hasAll);
    }
  }
  updateTableOfContents();
}

const currentFilters = [];

function toggleFilter(feature) {
  const htmlClasslist = document.querySelector(":root").classList;

  const filterClass = `feature-${feature}`;
  htmlClasslist.toggle(filterClass);
  const index = currentFilters.indexOf(filterClass);
  if (index === -1) {
    currentFilters.push(filterClass);
  } else {
    currentFilters.splice(index, 1);
  }
  filterByFeatures(currentFilters);
}

export default () => {
  const features = Object.keys(chargerFeatures);

  return (
    <div className="features">
      {features.map((f) => (
        <button
          className={`feature filter-${f}`}
          key={f}
          type="button"
          onClick={() => toggleFilter(f)}
        >
          {chargerFeatures[f]}
        </button>
      ))}
    </div>
  );
};
