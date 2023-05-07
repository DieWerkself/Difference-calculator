import { test, expect } from '@jest/globals';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import gendiff from '../src/index.js';
import parseFile from '../src/lib/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1JSON = parseFile(getFixturePath('file1.json'));
const file2JSON = parseFile(getFixturePath('file2.json'));

const file1YAML = parseFile(getFixturePath('file1.yaml'));
const file2YAML = parseFile(getFixturePath('file2.yaml'));

const expected = readFileSync(getFixturePath('stylish'), { encoding: 'utf8' });

test('JSONdifference', () => {
  expect(gendiff(file1JSON, file2JSON)).toEqual(expected);
});

test('YAMLdifference', () => {
  expect(gendiff(file1YAML, file2YAML)).toEqual(expected);
});

test('errors', () => {
  expect(parseFile('file1.xml')).toEqual(new Error('Undefined format .xml'));
  expect(gendiff(file1YAML, file2JSON, 'deep')).toEqual(new Error('deep'));
});
