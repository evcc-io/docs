import React, { useState } from "react";
import s from "./DeviceConfig.module.css";
import CodeBlock from "@theme/CodeBlock";

const ShowHideCode = ({ code, advanced }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleShowAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className={s.root}>
      <CodeBlock className="language-yaml">
        {showAdvanced ? advanced : code}
      </CodeBlock>
      {advanced ? (
        <div className={s.advanced}>
          <button
            onClick={toggleShowAdvanced}
            className={s.advancedButton}
            type="button"
          >
            <u>
              {showAdvanced ? "hide advanced options" : "show advanced options"}
            </u>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ShowHideCode;
