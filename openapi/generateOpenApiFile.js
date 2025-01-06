// Add a description of the referenced schema to each parameter that does not have a description field.

const fs = require("fs");
const yaml = require("js-yaml");

fs.readFile("./openapi/rest-api.yaml", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading the file: ", err);
    return;
  }

  const openapi = yaml.load(data);

  function generateParameter(param) {
    if (!param.description && param.schema && param.schema["$ref"]) {
      const schemaName = param.schema.$ref.split("/").pop();
      let schema = openapi.components.schemas[schemaName];
      if (schema && schema.description) {
        param.description = schema.description;
      }
    }
    return param;
  }

  for (let url in openapi.paths) {
    let pathItem = openapi.paths[url];

    for (let method in pathItem) {
      if (pathItem[method].parameters) {
        for (let i = 0; i < pathItem[method].parameters.length; i++) {
          pathItem[method].parameters[i] = generateParameter(
            pathItem[method].parameters[i],
          );
        }
      }
    }
  }

  for (let paramName in openapi.components.parameters) {
    let param = openapi.components.parameters[paramName];
    openapi.components.parameters[paramName] = generateParameter(param);
  }

  console.log("Finished processing parameters");
  const updatedYaml = yaml.dump(openapi);
  fs.writeFile("./static/rest-api.yaml", updatedYaml, (err) => {
    if (err) {
      console.log("Error saving the modified file");
    } else {
      console.log("File saved successfully");
    }
  });
});
