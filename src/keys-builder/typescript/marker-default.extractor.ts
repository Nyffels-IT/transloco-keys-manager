import { SourceFile, Node } from 'typescript';
import { tsquery } from '@phenomnomnominal/tsquery';

import { buildDefaultKeysFromASTNodes } from './build-keys-from-ast-nodes';
import { TSExtractorResult } from './types';

export function markerDefaultExtractor(ast: SourceFile): TSExtractorResult {
  // workaround from https://github.com/estools/esquery/issues/68
  const [importNode] = tsquery(
    ast,
    `ImportDeclaration:has([text=/^@(jsverse|ngneat|nyffels)\\x2Ftransloco-keys-manager\\x2Fmarker-default/])`,
  );
  if (!importNode) {
    return [];
  }
  const markerName = getMarkerDefaultName(importNode);
  const fns = tsquery(ast, `CallExpression Identifier[text=${markerName}]`);

  return buildDefaultKeysFromASTNodes(fns, [markerName]);
}

function getMarkerDefaultName(importNode: Node) {
  const [defaultName, alias] = tsquery(
    importNode,
    'ImportSpecifier Identifier',
  );
  return (alias || defaultName).getText();
}
