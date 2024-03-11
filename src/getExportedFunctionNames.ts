import ts from "typescript";

// Helper function to extract function names based on different export patterns
const extractExportedNamesFromTSNode = (n: ts.Node): Set<string> => {
  let names = new Set<string>();

  // Check for ES module export syntax
  if (
    ts.isFunctionDeclaration(n) &&
    n.name &&
    n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  ) {
    names.add(n.name.text);
  } else if (ts.isExportAssignment(n) && ts.isIdentifier(n.expression)) {
    names.add(n.expression.text);
  } else if (
    ts.isVariableStatement(n) &&
    n.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  ) {
    n.declarationList.declarations
      .filter((declaration) => ts.isIdentifier(declaration.name))
      .forEach((declaration) =>
        names.add((declaration.name as ts.Identifier).text),
      );
  }

  // Check for CommonJS module export syntax
  if (ts.isBinaryExpression(n)) {
    const leftSide = n.left;
    if (
      ts.isPropertyAccessExpression(leftSide) &&
      ts.isIdentifier(leftSide.expression) &&
      (leftSide.expression.text === "exports" ||
        leftSide.expression.text === "module") &&
      leftSide.name.text
    ) {
      names.add(leftSide.name.text);
    }
  }

  return names;
};

export const getExportedFunctionNames = (sourceFile: ts.Node): Set<string> => {
  let names = new Set<string>();

  // Visitor pattern to traverse the AST (Abstract Syntax Tree) and extract function names
  const visitor = (childNode: ts.Node) => {
    const childNames = extractExportedNamesFromTSNode(childNode);
    childNames.forEach((name) => names.add(name));
    childNode.forEachChild(visitor);
  };

  visitor(sourceFile);

  return names;
};
