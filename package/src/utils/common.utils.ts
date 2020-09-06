import { blue, bold, green, red } from 'chalk';

export const space = (): void => console.log();

export const taskStart = (text: string): string => blue(`${text}...`);

export const taskFail = (text: string): string => red(`${text}.`);

export const taskFinish = (text: string, result: string = ''): string => {
  const hasResult = result !== '';
  const color = green;
  const colorfulText = color(text);
  const colorfulSign = color(hasResult ? ': ' : '.');
  const colorfulResult = bold(result);

  return `${colorfulText}${colorfulSign}${colorfulResult}`;
};
