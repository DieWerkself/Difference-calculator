import process from 'process';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import parseFile from './src/lib/parsers.js';
import findDifference from './src/difference.js';
import createFormatterDiff from './src/formatters/index.js';

const getCorrectPath = (filePath) => path.resolve(process.cwd(), filePath);

const getFile = (filePath) => {
  const fileFormat = path.extname(filePath);
  const file = readFileSync(getCorrectPath(filePath), { encoding: 'utf8' });
  return parseFile(file, fileFormat);
};

const gendiff = (path1, path2, format = 'stylish') => {
  const file1 = getFile(path1);
  const file2 = getFile(path2);
  const diffFile = findDifference(file1, file2);

  return createFormatterDiff(diffFile, format);
};

export default gendiff;
