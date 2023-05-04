#!/usr/bin/env node
import { program } from 'commander';
import { readFileSync } from 'node:fs';
import process from 'process';
import relativePath from 'node:path';
import getDifference from '../src/findDifference.js';

const mainPath = process.cwd();
const isAbsolutePath = (path) => path.startsWith('/');
const getCorrectPath = (path) => isAbsolutePath(path) ? mainPath + path : relativePath.resolve(path);

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action(function (filepath1, filepath2) {
    const path1 = getCorrectPath(filepath1);
    const path2 = getCorrectPath(filepath2);
    const file1 = readFileSync(path1, { encoding: 'utf8', flag: 'r' });
    const file2 = readFileSync(path2, { encoding: 'utf8', flag: 'r' });
    console.log(getDifference(JSON.parse(file1), JSON.parse(file2)));
  })
  .parse(process.argv);