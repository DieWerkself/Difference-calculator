import { test, expect } from '@jest/globals';
import gendiff from '../src/findDifference.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1 = JSON.parse(readFile('file1.json'));
const file2 = JSON.parse(readFile('file2.json'));
const expected = readFile('expected.txt');

test('half', () => {
  expect(gendiff(file1, file2)).toEqual(expected);
});