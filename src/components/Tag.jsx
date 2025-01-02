import React from "react";

export default function Tag({ label, category }) {
  return <span className={`tag tag--${category}`}>{label}</span>;
}
