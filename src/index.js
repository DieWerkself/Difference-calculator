import process from 'process';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import parseData from './lib/parsers.js';
import findDifference from './difference.js';
import createFormatterDiff from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

const getData = (filePath) => {
  const fileFormat = path.extname(filePath).substring(1);
  const data = readFileSync(getAbsolutePath(filePath), { encoding: 'utf8' });
  return parseData(data, fileFormat);
};

const gendiff = (path1, path2, format = 'stylish') => {
  const data1 = getData(path1);
  const data2 = getData(path2);
  const diffData = findDifference(data1, data2);

  return createFormatterDiff(diffData, format);
};

export default gendiff;
