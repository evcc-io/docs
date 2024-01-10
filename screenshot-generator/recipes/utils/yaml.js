import fs from "fs";
import path from "path";
import os from "os";
import yaml from "yaml";

export function mergeYaml(file1Path, file2Path) {
  try {
    const file1Content = yaml.parse(fs.readFileSync(file1Path, "utf8"));
    const file2Content = yaml.parse(fs.readFileSync(file2Path, "utf8"));
    const file1Name = path.basename(file1Path, ".yaml");
    const file2Name = path.basename(file2Path, ".yaml");

    const mergedContent = { ...file1Content, ...file2Content };
    const result = yaml.stringify(mergedContent);

    const resultName = `merged_${file1Name}_${file2Name}.yaml`;
    const resultPath = path.join(os.tmpdir(), resultName);
    fs.writeFileSync(resultPath, result);

    return resultPath;
  } catch (error) {
    console.error("Error merging YAML files:", error);
    throw error;
  }
}
