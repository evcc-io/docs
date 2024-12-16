import React from 'react';

// Predefined color mappings
const colorMap = {
  "read": { bgColor: "#2196f3", textColor: "#ffffff" },
  "write": { bgColor: "#ff9800", textColor: "#ffffff" },
  "default": { bgColor: "#4ea72a", textColor: "#ffffff" }
};

export default function Tag({ label, category }) {
  const { bgColor, textColor } = colorMap[category] || colorMap["default"];

  const style = {
      backgroundColor: bgColor,
      color: textColor,
      padding: '0px 10px',
      borderRadius: '10px',
      display: 'inline-block',
      marginLeft: '2px',
      verticalAlign: 'middle',
      fontSize: '0.75rem',
      fontWeight: 'bold',
  };

  return <span style={style}>{label}</span>;
}
