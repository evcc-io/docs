const fs = require("fs");
const path = require("path");

fs.copyFileSync(
  path.join(__dirname, "../node_modules/@asyncapi/react-component/styles/default.min.css"),
  path.join(__dirname, "../static/asyncapi.css"),
);

console.log("Copied asyncapi.css to static directory");
