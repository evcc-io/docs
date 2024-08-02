import React, { useState } from "react";
import s from "./DeviceConfig.module.css";

const ShowHideCode = ({ code, advanced }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleShowAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div>
      <pre>
        <code>{showAdvanced ? advanced : code}</code>
        {advanced ? (
          <button
            onClick={toggleShowAdvanced}
            className={s.advancedButton}
            type="button"
          >
            <u>
              {showAdvanced ? "hide advanced options" : "show advanced options"}
            </u>
          </button>
        ) : null}
      </pre>
    </div>
  );
};

export default ShowHideCode;
