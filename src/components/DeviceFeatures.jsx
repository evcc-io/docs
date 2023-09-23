import React from "react";

const titles = {
  "1p3p": "1P/3P",
  mA: "mA Regelung",
  sponsorfree: "ohne Sponsoring",
  rfid: "RFID",
  iso151182: "ISO 15118",
};

function link(feature) {
  if (feature === "sponsorfree") {
    return "../sponsorship";
  }
  return "#features";
}

export default ({ capabilities, requirements }) => {
  const features = [
    ...(capabilities ? capabilities.split(",") : []),
    ...(requirements ? requirements.split(",") : []),
  ];

  // use sponsorfree instead of sponsorship
  const index = features.indexOf("sponsorship");
  if (index > -1) {
    features.splice(index, 1);
  } else {
    features.push("sponsorfree");
  }

  // remove eebus
  const eebus = features.indexOf("eebus");
  if (eebus > -1) {
    features.splice(eebus, 1);
  }

  return (
    <div className="features">
      {features.map((f) => (
        <a href={link(f)} className="feature" key={f}>
          {titles[f] || f}
        </a>
      ))}
    </div>
  );
};
