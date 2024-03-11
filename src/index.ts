import * as core from "@actions/core";
import ts from "typescript";
import { extractFunctionsFromFirebaseConfig } from "./extractFunctionsFromFirebaseConfig";
import { getDiscrepancies } from "./getDiscrepancies";
import { getExportedFunctionNames } from "./getExportedFunctionNames";

const indexPath = core.getInput("index-path");
const firebaseConfigPath = core.getInput("firebase-config-path");

export const validateConfig = () => {
  try {
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

    // Report discrepancies
    if (
      discrepancies.exportedButNotConfigured.size > 0 ||
      discrepancies.configuredButNotExported.size > 0
    ) {
      core.setFailed(
        `Discrepancies found between TypeScript exports and Firebase functions configuration.`,
      );
      console.error(
        "Exported but not configured:",
        discrepancies.exportedButNotConfigured,
      );
      console.error(
        "Configured but not exported:",
        discrepancies.configuredButNotExported,
      );
      core.setOutput(
        "exportedButNotConfigured",
        Array.from(discrepancies.exportedButNotConfigured).join(", "),
      );
      core.setOutput(
        "configuredButNotExported",
        Array.from(discrepancies.configuredButNotExported).join(", "),
      );
    } else {
      console.log(
        "No discrepancies found between TypeScript exports and Firebase functions configuration.",
      );
    }
  } catch (error) {
    core.setFailed((error as Error).message);
  }
};

if (require.main === module) {
  validateConfig();
}
