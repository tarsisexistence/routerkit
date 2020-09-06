import { bold } from 'chalk';

export const space = (): void => console.log();

const logOffset = ' ';

export const taskStart = (text: string): string => bold.cyan(`${logOffset}${text}...`);

export const taskFail = (text: string): string => bold.red(`${logOffset}${text}.`);

export const taskFinish = (text: string, result: string = ''): string => {
  const hasResult = result !== '';
  const colorfulText = bold.green(text);
  const colorfulSign = bold.green(hasResult ? ': ' : '.');
  const colorfulResult = bold(result);

  return `${logOffset}${colorfulText}${colorfulSign}${colorfulResult}`;
};
