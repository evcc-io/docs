import React from "react";
import { chargerFeatures } from "./features";

function link(feature) {
  if (feature === "sponsorfree") {
    return "../sponsorship";
  }
  return "#features";
}

export default ({ features }) => {
  const featureList = features ? features.split(",") : [];

  let classes = "features";
  featureList.forEach((f) => {
    classes += ` feature-${f}`;
  });
  return (
    <div className={classes}>
      {featureList.map((f) => (
        <a href={link(f)} className="feature" key={f}>
          {chargerFeatures[f] || f}
        </a>
      ))}
    </div>
  );
};
