import { STRING_KEYWORD } from './constants';
import { isIndexRoute } from './utils';

export const normalizePath = (path: string): string => (isIndexRoute(path) ? STRING_KEYWORD : path);

export const isLeaf = (node: string[] | Record<any, any>): boolean => Array.isArray(node);
