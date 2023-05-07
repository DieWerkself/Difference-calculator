import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import gendiff from '../index.js';
import parseFile from '../src/lib/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1JSON = getFixturePath('file1.json');
const file2JSON = getFixturePath('file2.json');
const file1YAML = getFixturePath('file1.yaml');
const file2YAML = getFixturePath('file2.yaml');

const stylish = readFileSync(getFixturePath('stylish'), { encoding: 'utf8' });
const plain = readFileSync(getFixturePath('plain'), { encoding: 'utf8' });
const json = readFileSync(getFixturePath('json.json'), { encoding: 'utf8' });

describe('testDifference', () => {
  test('JSON', () => {
    expect(gendiff(file1JSON, file2JSON)).toEqual(stylish);
  });
  test('YAML', () => {
    expect(gendiff(file1YAML, file2YAML)).toEqual(stylish);
  });
});

describe('testFormatters', () => {
  test('plainFormatter', () => {
    expect(gendiff(file1YAML, file2YAML, 'plain')).toEqual(plain);
  });
  test('JSONFormatter', () => {
    expect(gendiff(file1YAML, file2YAML, 'json')).toEqual(json);
  });
});

describe('testErrors', () => {
  test('errorParsers', () => {
    expect(parseFile(file1JSON, '.xml')).toEqual(new Error('Undefined format .xml'));
  });
  test('errorFormat', () => {
    expect(gendiff(file1YAML, file2JSON, 'deep')).toEqual(new Error('deep'));
  });
});
