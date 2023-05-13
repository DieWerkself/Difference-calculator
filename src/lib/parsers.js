import yaml from 'js-yaml';

const parse = (data, format) => {
  switch (format) {
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown file format: ${format}`);
  }
};

export default parse;
