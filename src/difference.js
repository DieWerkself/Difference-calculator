import _ from 'lodash';

const gendiff = (file1, file2) => {
  const uniqKeys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedUniqKeys = _.sortBy(uniqKeys);
  const isObject = (value) => _.isPlainObject(value);

  const buildDifference = sortedUniqKeys.reduce(
    (acc, key) => {
      if (isObject(file1[key]) && isObject(file2[key])) {
        acc.push({ name: key, type: 'object', children: gendiff(file1[key], file2[key]) });
        return acc;
      }
      if (!Object.hasOwn(file1, key)) {
        acc.push({
          name: key, type: 'changed', status: '+', value: file2[key],
        });
        return acc;
      }
      if (!Object.hasOwn(file2, key)) {
        acc.push({
          name: key, type: 'changed', status: '-', value: file1[key],
        });
        return acc;
      }
      if (file1[key] !== file2[key]) {
        acc.push({
          name: key,
          type: 'updated',
          children: [
            { type: 'changed', status: '-', value: file1[key] },
            { type: 'changed', status: '+', value: file2[key] },
          ],
        });
        return acc;
      }
      acc.push({
        name: key, type: 'unchanged', value: file1[key],
      });
      return acc;
    },
    [],
  );

  return buildDifference;
};

export default gendiff;
