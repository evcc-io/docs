import React from "react";

export default function NavCardGrid({ children, className = "" }) {
  return (
    <div
      className={`margin-bottom--lg ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}
