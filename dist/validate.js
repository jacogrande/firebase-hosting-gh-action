"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
// Placeholder paths for demonstration; in the actual action, these will come from action inputs
const indexPath = "../src/index.ts";
const firebaseConfigPath = "./firebase.json";
// Helper function to extract function names based on different export patterns
const extractNames = (n) => {
    var _a, _b;
    if (typescript_1.default.isFunctionDeclaration(n) &&
        n.name &&
        ((_a = n.modifiers) === null || _a === void 0 ? void 0 : _a.some((m) => m.kind === typescript_1.default.SyntaxKind.ExportKeyword))) {
        return [n.name.text];
    }
    else if (typescript_1.default.isExportAssignment(n) && typescript_1.default.isIdentifier(n.expression)) {
        return [n.expression.text];
    }
    else if (typescript_1.default.isVariableStatement(n) &&
        ((_b = n.modifiers) === null || _b === void 0 ? void 0 : _b.some((m) => m.kind === typescript_1.default.SyntaxKind.ExportKeyword))) {
        return n.declarationList.declarations
            .filter((declaration) => typescript_1.default.isIdentifier(declaration.name))
            .map((declaration) => declaration.name.text);
    }
    return [];
};
const getExportedFunctionNames = (node) => {
    const names = extractNames(node);
    // Recursively process child nodes
    node.forEachChild((child) => names.push(...getExportedFunctionNames(child)));
    return names;
};
const run = () => {
    const program = typescript_1.default.createProgram([indexPath], {});
    const sourceFile = program.getSourceFile(indexPath);
    if (!sourceFile)
        throw new Error(`Failed to read or parse ${indexPath}`);
    const exportedFunctions = getExportedFunctionNames(sourceFile);
    console.log(exportedFunctions);
};
run();
