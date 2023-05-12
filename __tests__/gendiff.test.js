import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe('tests', () => {
  test.each([
    ['JSONDifference', 'file1.json', 'file2.json', 'stylish', undefined],
    ['YAMLDifference', 'file1.yaml', 'file2.yaml', 'stylish', undefined],
    ['plainFormatter', 'file1.yaml', 'file2.yaml', 'plain', 'plain'],
    ['JSONFormatter', 'file1.json', 'file2.yaml', 'json.json', 'json'],
  ])('%s', (_, fileName1, fileName2, expectedResult, format) => {
    const filePath1 = getFixturePath(fileName1);
    const filePath2 = getFixturePath(fileName2);
    const expected = readFileSync(getFixturePath(expectedResult), { encoding: 'utf8' });
    expect(gendiff(filePath1, filePath2, format)).toEqual(expected);
  });
});
