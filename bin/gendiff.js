#!/usr/bin/env node
import { program } from 'commander';
import process from 'process';
import relative from 'node:path';
import getDifference from '../src/index.js';
import parseFile from '../src/lib/parsers.js';

const isAbsPath = (path) => path.startsWith('/');
const getCorrectPath = (path) => (isAbsPath(path) ? process.cwd() + path : relative.resolve(path));

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const path1 = getCorrectPath(filepath1);
    const path2 = getCorrectPath(filepath2);
    const file1 = parseFile(path1);
    const file2 = parseFile(path2);
    console.log(getDifference(file1, file2, program.opts().format));
  })
  .parse(process.argv);
