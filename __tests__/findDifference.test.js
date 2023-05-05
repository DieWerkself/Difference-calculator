import { test, expect } from '@jest/globals';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import gendiff from '../src/findDifference.js';
import parseFile from '../src/lib/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('JSONdifference', () => {
  const file1 = parseFile(getFixturePath('file1.json'));
  const file2 = parseFile(getFixturePath('file2.json'));
  const expected = readFileSync(getFixturePath('JSONexpected'), { encoding: 'utf8' });
  expect(gendiff(file1, file2)).toEqual(expected);
});

test('YAMLdifference', () => {
  const file1 = parseFile(getFixturePath('file1.yaml'));
  const file2 = parseFile(getFixturePath('file2.yaml'));
  const expected = readFileSync(getFixturePath('YAMLexpected'), { encoding: 'utf8' });
  expect(gendiff(file1, file2)).toEqual(expected);
});
