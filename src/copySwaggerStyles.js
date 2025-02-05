const fs = require("fs");
const path = require("path");

fs.copyFileSync(
  path.join(__dirname, "../node_modules/swagger-ui-react/swagger-ui.css"),
  path.join(__dirname, "../static/swagger-ui.css"),
);

console.log("Copied swagger-ui.css to static directory");
