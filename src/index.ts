import * as core from "@actions/core";
import ts from "typescript";
import { extractFunctionsFromFirebaseConfig } from "./extractFunctionsFromFirebaseConfig";
import { getDiscrepancies } from "./getDiscrepancies";
import { getExportedFunctionNames } from "./getExportedFunctionNames";

// Placeholder paths for demonstration; in the actual action, these will come from action inputs
const indexPath = core.getInput("index-path");
const firebaseConfigPath = core.getInput("firebase-config-path");

export const validateConfig = () => {
  const program = ts.createProgram([indexPath], {});
  const sourceFile = program.getSourceFile(indexPath);
  if (!sourceFile) throw new Error(`Failed to read or parse ${indexPath}`);
  const exportedFunctions = getExportedFunctionNames(sourceFile);
  const configuredFunctions =
    extractFunctionsFromFirebaseConfig(firebaseConfigPath);
  const discrepancies = getDiscrepancies(
    exportedFunctions,
    configuredFunctions,
  );
  console.log(discrepancies);
};

if (require.main === module) {
  validateConfig();
}
