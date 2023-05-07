#!/usr/bin/env node
import { program } from 'commander';
import process from 'process';
import getDifference from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDifference(filepath1, filepath2, program.opts().format));
  })
  .parse(process.argv);
