import yaml from 'js-yaml';

const parse = (file, fileFormat) => {
  switch (fileFormat) {
    case 'yaml':
      return yaml.load(file);
    case 'yml':
      return yaml.load(file);
    case 'json':
      return JSON.parse(file);
    default:
      throw new Error(`Unknown file format: ${fileFormat}`);
  }
};

export default parse;
