const fs = require("fs");
const yaml = require("js-yaml");
const { forEach } = require("lodash");

const filePath = "./static/mqtt-api.yaml";

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = obj[key];
      return sorted;
    }, {});
}

function sortAsyncAPI(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    let asyncAPI = yaml.load(data);

    if (asyncAPI.operations) {
      for (const operation in asyncAPI.operations) {
        asyncAPI.operations[operation].channel.parameters = sortObject(
          asyncAPI.operations[operation].channel.parameters,
        );
      }

      asyncAPI.operations = sortObject(asyncAPI.operations);
    }

    ["messages", "parameters", "tags"].forEach((key) => {
      if (asyncAPI.components[key]) {
        asyncAPI.components[key] = sortObject(asyncAPI.components[key]);
      }
    });

    fs.writeFileSync(filePath, yaml.dump(asyncAPI, { quotingType: '"' }));
    console.log("AsyncAPI YAML file successfully sorted and updated.");
  } catch (error) {
    console.error("Error processing AsyncAPI YAML file:", error);
  }
}

sortAsyncAPI(filePath);
