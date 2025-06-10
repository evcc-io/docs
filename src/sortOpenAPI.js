const fs = require("fs");
const yaml = require("js-yaml");

const filePath = "./static/rest-api.yaml";

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = obj[key];
      return sorted;
    }, {}); 
}

function sortOpenAPI(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    let openAPI = yaml.load(data);

    if (openAPI.paths) {
      for (const path in openAPI.paths) {
        for (const method in openAPI.paths[path]) {
          if (openAPI.paths[path][method].parameters) {
            openAPI.paths[path][method].parameters.sort(
              (a, b) => a.name?.localeCompare(b.name || "") || 0,
            );
          }
          if (openAPI.paths[path][method].responses) {
            openAPI.paths[path][method].responses = sortObject(
              openAPI.paths[path][method].responses,
            );
          }
        }
      }
      openAPI.paths = sortObject(openAPI.paths);
    }

    if (openAPI.components) {
      if (openAPI.components.schemas) {
        for (const schema in openAPI.components.schemas) {
          if (openAPI.components.schemas[schema].properties) {
            openAPI.components.schemas[schema].properties = sortObject(
              openAPI.components.schemas[schema].properties,
            );
          }
        }
        openAPI.components.schemas = sortObject(openAPI.components.schemas);
      }
      if (openAPI.components.securitySchemes) {
        openAPI.components.securitySchemes = sortObject(
          openAPI.components.securitySchemes,
        );
      }
    }

    fs.writeFileSync(filePath, yaml.dump(openAPI, { quotingType: '"' }));
    console.log("OpenAPI YAML file successfully sorted and updated.");
  } catch (error) {
    console.error("Error processing OpenAPI YAML file:", error);
  }
}

sortOpenAPI(filePath);
