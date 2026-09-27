/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */

// Generates playground/docs/props.generated.json from the TypeScript types of every exported component.
// Usage: bun scripts/gen-props.ts        (writes the file)
//        generateProps()                 (returns the data; used by tests/docsProps.test.ts)
import { writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import ts from 'typescript';

export type PropDoc = {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
};

export type ComponentDoc = {
  /** Source file, relative to the project root. */
  source: string;
  props: PropDoc[];
  /** Named types (Arco, React, DOM) whose props the component also accepts. */
  inherits: string[];
};

const root = resolve(__dirname, '..');
const entries = [resolve(root, 'src/index.ts'), resolve(root, 'src/markdown.ts')];
export const outputPath = resolve(root, 'playground/docs/props.generated.json');

// React plumbing every component accepts; never interesting in a props table.
const IGNORED_OWNERS = new Set(['Attributes', 'RefAttributes', 'ClassAttributes']);
const DOM_OWNER = /^(AriaAttributes|DOMAttributes|HTMLAttributes|\w+HTMLAttributes)$/;
const MAX_TYPE_LENGTH = 140;

const isOwnDeclaration = (decl: ts.Declaration) => {
  const file = decl.getSourceFile().fileName.replace(/\\/g, '/');
  return file.startsWith(root.replace(/\\/g, '/') + '/src/');
};

const ownerName = (decl: ts.Declaration): string | undefined => {
  for (let node: ts.Node | undefined = decl.parent; node; node = node.parent) {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isClassDeclaration(node)) {
      return node.name?.text;
    }
  }
  return undefined;
};

const shorten = (text: string) => {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > MAX_TYPE_LENGTH ? `${flat.slice(0, MAX_TYPE_LENGTH - 1)}…` : flat;
};

/** The function implementing a component: `const X = (...) =>`, `forwardRef((...) =>)`, `memo(X)`, `function X()`. */
const findImplementation = (node: ts.Node | undefined): ts.SignatureDeclaration | undefined => {
  if (!node) return undefined;
  if (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) return node;
  if (ts.isVariableDeclaration(node)) return findImplementation(node.initializer);
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) return findImplementation(node.expression);
  if (ts.isCallExpression(node)) {
    for (const arg of node.arguments) {
      const found = findImplementation(arg);
      if (found) return found;
    }
  }
  return undefined;
};

/** Destructuring defaults of the first parameter: `({ size = 20 }) =>` gives `{ size: '20' }`. */
const destructuringDefaults = (impl: ts.SignatureDeclaration | undefined): Map<string, string> => {
  const defaults = new Map<string, string>();
  const param = impl?.parameters[0];
  if (param && ts.isObjectBindingPattern(param.name)) {
    for (const element of param.name.elements) {
      if (!element.initializer) continue;
      const name = (element.propertyName ?? element.name).getText();
      defaults.set(name, element.initializer.getText());
    }
  }
  return defaults;
};

export function generateProps(): Record<string, ComponentDoc> {
  const program = ts.createProgram(entries, {
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
    types: ['vite/client'],
  });
  const checker = program.getTypeChecker();
  const result: Record<string, ComponentDoc> = {};

  for (const entry of entries) {
    const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(entry)!)!;
    for (const exported of checker.getExportsOfModule(moduleSymbol)) {
      if (!/^[A-Z][a-z]/.test(exported.name)) continue; // components are PascalCase; skips CONSTANTS
      const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
      const decl = symbol.valueDeclaration ?? symbol.declarations?.[0];
      if (!decl || !(symbol.flags & (ts.SymbolFlags.Value | ts.SymbolFlags.Function))) continue;

      const signature = checker.getTypeOfSymbolAtLocation(symbol, decl).getCallSignatures()[0];
      const propsParam = signature?.getParameters()[0];
      if (!propsParam) continue;
      const propsType = checker.getTypeOfSymbolAtLocation(propsParam, decl);
      // Components take an object of props; plain functions (hooks, utils) are not documented here.
      if (!(propsType.flags & ts.TypeFlags.Object) && !propsType.isIntersection() && !propsType.isUnion()) continue;

      const defaults = destructuringDefaults(findImplementation(decl));
      const props: PropDoc[] = [];
      const inherits = new Set<string>();

      for (const prop of checker.getPropertiesOfType(propsType)) {
        const propDecl = prop.valueDeclaration ?? prop.declarations?.[0];
        if (!propDecl) continue;
        if (!isOwnDeclaration(propDecl)) {
          const owner = ownerName(propDecl);
          // React's DOM typings split native attributes over many interfaces; one entry reads better.
          if (owner && !IGNORED_OWNERS.has(owner)) inherits.add(DOM_OWNER.test(owner) ? 'HTML attributes' : owner);
          continue;
        }
        const typeNode = (propDecl as ts.PropertySignature).type;
        const type = typeNode
          ? typeNode.getText()
          : checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, propDecl));
        const jsdocDefault = prop.getJsDocTags(checker).find((tag) => tag.name === 'default');
        const description = ts.displayPartsToString(prop.getDocumentationComment(checker)).trim();
        props.push({
          name: prop.name,
          type: shorten(type),
          required: !(prop.flags & ts.SymbolFlags.Optional),
          ...(jsdocDefault?.text
            ? { default: ts.displayPartsToString(jsdocDefault.text).trim() }
            : defaults.has(prop.name)
              ? { default: defaults.get(prop.name) }
              : {}),
          ...(description ? { description } : {}),
        });
      }

      result[exported.name] = {
        source: relative(root, decl.getSourceFile().fileName).replace(/\\/g, '/'),
        props,
        inherits: [...inherits].sort(),
      };
    }
  }

  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

export const serialize = (data: Record<string, ComponentDoc>) => `${JSON.stringify(data, null, 2)}\n`;

if (import.meta.main) {
  const data = generateProps();
  writeFileSync(outputPath, serialize(data));
  console.log(`props.generated.json: ${Object.keys(data).length} components`);
}
