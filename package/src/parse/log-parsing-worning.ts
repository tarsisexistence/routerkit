import { Node } from 'ts-morph';

export const logParsingWarning = (node: Node): void => {
  const filePath = node.getSourceFile().getFilePath();
  const line = node.getStartLineNumber();
  const sourceCode = node.getText();
  const position = node.getStartLinePos();

  const displayedMessage = `There is problems with parsing node:\n
  file: ${filePath}\n
  node: ${sourceCode}\n
  line: ${line}, position: ${position}\n`;

  console.warn(displayedMessage);
};
