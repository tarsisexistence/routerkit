import { Node } from 'ts-morph';

export function findNodes<T extends Node>(
  node: Node,
  valueTypeChecker: (node: Node) => node is T,
  recursive = false
): T[] {
  const arr: T[] = [];

  if (valueTypeChecker(node)) {
    if (!recursive) {
      return [node as T];
    }

    arr.push(node);
  }

  const children = node.getChildren();
  for (const child of children) {
    arr.push(...findNodes(child, valueTypeChecker, recursive));
  }

  return arr;
}
