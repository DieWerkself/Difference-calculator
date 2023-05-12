import yaml from 'js-yaml';

const parse = (data, fileFormat) => {
  switch (fileFormat) {
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown file format: ${fileFormat}`);
  }
};

export default parse;
