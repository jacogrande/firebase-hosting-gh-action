type Discrepancies = {
  exportedButNotConfigured: Set<string>;
  configuredButNotExported: Set<string>;
};

export const getDiscrepancies = (
  exportedFunctions: Set<string>,
  configuredFunctions: Set<string>,
  ignoredFunctions: string[],
): Discrepancies => {
  const exportedButNotConfigured = new Set<string>();
  const configuredButNotExported = new Set<string>();

  for (const name of exportedFunctions) {
    if (!configuredFunctions.has(name) && !ignoredFunctions.includes(name))
      exportedButNotConfigured.add(name);
  }

  for (const name of configuredFunctions) {
    if (!exportedFunctions.has(name) && !ignoredFunctions.includes(name))
      configuredButNotExported.add(name);
  }

  return { exportedButNotConfigured, configuredButNotExported };
};
