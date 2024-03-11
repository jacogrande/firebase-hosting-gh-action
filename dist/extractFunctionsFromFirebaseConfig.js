"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFunctionsFromFirebaseConfig = void 0;
const fs_1 = require("fs");
const extractFunctionsFromFirebaseConfig = (configPath) => {
    var _a, _b;
    try {
        const fileContent = (0, fs_1.readFileSync)(configPath, "utf8");
        const firebaseConfig = JSON.parse(fileContent);
        const configuredFunctions = new Set(((_b = (_a = firebaseConfig.hosting) === null || _a === void 0 ? void 0 : _a.rewrites) !== null && _b !== void 0 ? _b : [])
            .filter((rewrite) => rewrite.function !== undefined)
            .map((rewrite) => rewrite.function));
        return configuredFunctions;
    }
    catch (error) {
        console.error(`Error reading or parsing firebase config at ${configPath}:`, error);
        return new Set(); // Return an empty set to gracefully handle the error scenario
    }
};
exports.extractFunctionsFromFirebaseConfig = extractFunctionsFromFirebaseConfig;
//# sourceMappingURL=extractFunctionsFromFirebaseConfig.js.map