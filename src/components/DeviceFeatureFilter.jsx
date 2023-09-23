import React from "react";

const titles = {
  "1p3p": "1P/3P",
  mA: "mA Regelung",
  sponsorfree: "ohne Sponsoring",
  rfid: "RFID",
  iso151182: "ISO 15118",
};

export default ({ capabilities, requirements }) => {
  const features = Object.keys(titles);

  return (
    <div className="features">
      {features.map((f) => (
        <button className="feature" key={f} type="button">
          {titles[f] || f}
        </button>
      ))}
    </div>
  );
};
