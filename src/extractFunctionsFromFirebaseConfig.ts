import { readFileSync } from "fs";

interface FirebaseConfig {
  hosting?: {
    rewrites?: Array<{ function?: string }>;
  };
}

export const extractFunctionsFromFirebaseConfig = (
  configPath: string,
): Set<string> => {
  try {
    const fileContent = readFileSync(configPath, "utf8");
    const firebaseConfig: FirebaseConfig = JSON.parse(fileContent);

    const configuredFunctions = new Set(
      (firebaseConfig.hosting?.rewrites ?? [])
        .filter((rewrite) => rewrite.function !== undefined)
        .map((rewrite) => rewrite.function!),
    );

    return configuredFunctions;
  } catch (error) {
    console.error(
      `Error reading or parsing firebase config at ${configPath}:`,
      error,
    );
    return new Set(); // Return an empty set to gracefully handle the error scenario
  }
};
