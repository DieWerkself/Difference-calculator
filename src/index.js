import process from 'process';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import parseFile from './lib/parsers.js';
import findDifference from './difference.js';
import createFormatterDiff from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

const getFileContent = (filePath) => {
  const fileFormat = path.extname(filePath).substring(1);
  const file = readFileSync(getAbsolutePath(filePath), { encoding: 'utf8' });
  return parseFile(file, fileFormat);
};

const gendiff = (path1, path2, format = 'stylish') => {
  const file1 = getFileContent(path1);
  const file2 = getFileContent(path2);
  const diffFile = findDifference(file1, file2);

  return createFormatterDiff(diffFile, format);
};

export default gendiff;
