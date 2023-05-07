import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import gendiff from '../src/formatters/index.js';
import parseFile from '../src/lib/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let file1JSON;
let file2JSON;
let file1YAML;
let file2YAML;
let stylish;
let plain;
let json;

beforeAll(() => {
  file1JSON = parseFile(getFixturePath('file1.json'));
  file2JSON = parseFile(getFixturePath('file2.json'));
  file1YAML = parseFile(getFixturePath('file1.yaml'));
  file2YAML = parseFile(getFixturePath('file2.yaml'));

  stylish = readFileSync(getFixturePath('stylish'), { encoding: 'utf8' });
  plain = readFileSync(getFixturePath('plain'), { encoding: 'utf8' });
  json = readFileSync(getFixturePath('json.json'), { encoding: 'utf8' });
});

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
    expect(parseFile('file1.xml')).toEqual(new Error('Undefined format .xml'));
  });
  test('errorFormat', () => {
    expect(gendiff(file1YAML, file2JSON, 'deep')).toEqual(new Error('deep'));
  });
});
