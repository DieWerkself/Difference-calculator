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
    ['file1.json', 'file2.json', undefined, 'stylishExpected'],
    ['file1.json', 'file2.json', 'plain', 'plainExpected'],
    ['file1.json', 'file2.json', 'json', 'jsonExpected'],
    ['file1.yaml', 'file2.yaml', undefined, 'stylishExpected'],
    ['file1.yaml', 'file2.yaml', 'plain', 'plainExpected'],
    ['file1.yaml', 'file2.yaml', 'json', 'jsonExpected'],
  ])('Difference between %o and %o with %o formatter', (fileName1, fileName2, format, expectedResult) => {
    const filePath1 = getFixturePath(fileName1);
    const filePath2 = getFixturePath(fileName2);
    const expected = readFileSync(getFixturePath(expectedResult), { encoding: 'utf8' });
    expect(gendiff(filePath1, filePath2, format)).toEqual(expected);
  });
});
