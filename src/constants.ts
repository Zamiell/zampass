import { findPackageRoot, getPackageJSONFieldsMandatory } from "complete-node";

const packageRoot = findPackageRoot();
const { name, version } = await getPackageJSONFieldsMandatory(
  packageRoot,
  "name",
  "version",
);

export const PROJECT_NAME = name;
export const PROJECT_VERSION = version;
