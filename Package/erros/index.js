import chalk from 'chalk';

export function errorAt(src, index, message) {
  const allLines = src.split('\n');
  const before = src.slice(0, index).split('\n');
  const lineNum = before.length;
  const colNum = before[before.length - 1].length + 1;

  const startLine = Math.max(0, lineNum - 3);
  const endLine = Math.min(allLines.length - 1, lineNum + 1);

  let output = '\n' + chalk.redBright.bold(`❌ Error [Line ${lineNum}, Col ${colNum}]: `) + chalk.yellow(message) + '\n\n';

  for (let i = startLine; i <= endLine; i++) {
    const displayLine = i + 1;
    const prefix = displayLine === lineNum ? chalk.redBright.bold('> ') : '  ';
    const numLabel = chalk.gray(String(displayLine).padStart(4) + ' | ');
    const content = allLines[i];
    if (displayLine === lineNum) {
      output += prefix + numLabel + chalk.redBright.bold(content) + '\n';
      output += '    ' + ' '.repeat(colNum - 1) + chalk.redBright.bold('^') + '\n';
    } else {
      output += prefix + numLabel + content + '\n';
    }
  }

  throw new Error(output);
}