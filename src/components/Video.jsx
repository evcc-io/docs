import React from "react";

export default ({ src, poster }) => {
  return (
    <video
      loop
      muted
      controls
      style={{
        maxWidth: "100%",
        height: "auto",
        marginBottom: "var(--ifm-leading)",
      }}
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
