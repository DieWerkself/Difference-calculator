import path from 'node:path';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

const parsers = (link) => {
  const fileFormat = path.extname(link);
  const file = (link) => readFileSync(link, { encoding: 'utf8' });
  if (fileFormat === '.yaml' || fileFormat === '.yml') return yaml.load(file(link));
  if (fileFormat === '.json') return JSON.parse(file(link));

  return new Error(`Undefined format ${fileFormat}`);
};

export default parsers;
