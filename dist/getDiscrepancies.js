"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiscrepancies = void 0;
const getDiscrepancies = (exportedFunctions, configuredFunctions) => {
    const exportedButNotConfigured = new Set();
    const configuredButNotExported = new Set();
    for (const name of exportedFunctions) {
        if (!configuredFunctions.has(name))
            exportedButNotConfigured.add(name);
    }
    for (const name of configuredFunctions) {
        if (!exportedFunctions.has(name))
            configuredButNotExported.add(name);
    }
    return { exportedButNotConfigured, configuredButNotExported };
};
exports.getDiscrepancies = getDiscrepancies;
//# sourceMappingURL=getDiscrepancies.js.map