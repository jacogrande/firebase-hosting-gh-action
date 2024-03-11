"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = void 0;
const core = __importStar(require("@actions/core"));
const typescript_1 = __importDefault(require("typescript"));
const extractFunctionsFromFirebaseConfig_1 = require("./extractFunctionsFromFirebaseConfig");
const getDiscrepancies_1 = require("./getDiscrepancies");
const getExportedFunctionNames_1 = require("./getExportedFunctionNames");
// Placeholder paths for demonstration; in the actual action, these will come from action inputs
const indexPath = core.getInput("index-path");
const firebaseConfigPath = core.getInput("firebase-config-path");
const validateConfig = () => {
    const program = typescript_1.default.createProgram([indexPath], {});
    const sourceFile = program.getSourceFile(indexPath);
    if (!sourceFile)
        throw new Error(`Failed to read or parse ${indexPath}`);
    const exportedFunctions = (0, getExportedFunctionNames_1.getExportedFunctionNames)(sourceFile);
    const configuredFunctions = (0, extractFunctionsFromFirebaseConfig_1.extractFunctionsFromFirebaseConfig)(firebaseConfigPath);
    const discrepancies = (0, getDiscrepancies_1.getDiscrepancies)(exportedFunctions, configuredFunctions);
    console.log(discrepancies);
};
exports.validateConfig = validateConfig;
if (require.main === module) {
    (0, exports.validateConfig)();
}
//# sourceMappingURL=validate.js.map