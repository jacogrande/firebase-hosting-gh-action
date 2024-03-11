type Discrepancies = {
  exportedButNotConfigured: Set<string>;
  configuredButNotExported: Set<string>;
};

export const getDiscrepancies = (
  exportedFunctions: Set<string>,
  configuredFunctions: Set<string>,
): Discrepancies => {
  const exportedButNotConfigured = new Set<string>();
  const configuredButNotExported = new Set<string>();

  for (const name of exportedFunctions) {
    if (!configuredFunctions.has(name)) exportedButNotConfigured.add(name);
  }

  for (const name of configuredFunctions) {
    if (!exportedFunctions.has(name)) configuredButNotExported.add(name);
  }

  return { exportedButNotConfigured, configuredButNotExported };
};
