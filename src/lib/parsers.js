import yaml from 'js-yaml';

const parsers = (file, fileFormat) => {
  if (fileFormat === 'yaml' || fileFormat === 'yml') return yaml.load(file);
  if (fileFormat === 'json') return JSON.parse(file);

  return new Error(`Unknown file format: ${fileFormat}`);
};

export default parsers;
