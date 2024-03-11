"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExportedFunctionNames = void 0;
const typescript_1 = __importDefault(require("typescript"));
// Helper function to extract function names based on different export patterns
const extractExportedNamesFromTSNode = (n) => {
    var _a, _b;
    let names = new Set();
    // Check for ES module export syntax
    if (typescript_1.default.isFunctionDeclaration(n) &&
        n.name &&
        ((_a = n.modifiers) === null || _a === void 0 ? void 0 : _a.some((m) => m.kind === typescript_1.default.SyntaxKind.ExportKeyword))) {
        names.add(n.name.text);
    }
    else if (typescript_1.default.isExportAssignment(n) && typescript_1.default.isIdentifier(n.expression)) {
        names.add(n.expression.text);
    }
    else if (typescript_1.default.isVariableStatement(n) &&
        ((_b = n.modifiers) === null || _b === void 0 ? void 0 : _b.some((m) => m.kind === typescript_1.default.SyntaxKind.ExportKeyword))) {
        n.declarationList.declarations
            .filter((declaration) => typescript_1.default.isIdentifier(declaration.name))
            .forEach((declaration) => names.add(declaration.name.text));
    }
    // Check for CommonJS module export syntax
    if (typescript_1.default.isBinaryExpression(n)) {
        const leftSide = n.left;
        if (typescript_1.default.isPropertyAccessExpression(leftSide) &&
            typescript_1.default.isIdentifier(leftSide.expression) &&
            (leftSide.expression.text === "exports" ||
                leftSide.expression.text === "module") &&
            leftSide.name.text) {
            names.add(leftSide.name.text);
        }
    }
    return names;
};
const getExportedFunctionNames = (sourceFile) => {
    let names = new Set();
    // Visitor pattern to traverse the AST (Abstract Syntax Tree) and extract function names
    const visitor = (childNode) => {
        const childNames = extractExportedNamesFromTSNode(childNode);
        childNames.forEach((name) => names.add(name));
        childNode.forEachChild(visitor);
    };
    visitor(sourceFile);
    return names;
};
exports.getExportedFunctionNames = getExportedFunctionNames;
//# sourceMappingURL=getExportedFunctionNames.js.map