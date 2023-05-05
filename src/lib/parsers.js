import path from 'node:path';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

const parsers = (link) => {
  const fileFormat = path.extname(link);
  const getFile = (filePath) => readFileSync(filePath, { encoding: 'utf8' });
  if (fileFormat === '.yaml' || fileFormat === '.yml') return yaml.load(getFile(link));
  if (fileFormat === '.json') return JSON.parse(getFile(link));

  return new Error(`Undefined format ${fileFormat}`);
};

export default parsers;
