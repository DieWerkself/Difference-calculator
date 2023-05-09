import _ from 'lodash';

const gendiff = (file1, file2) => {
  const uniqKeys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedUniqKeys = _.sortBy(uniqKeys);

  const buildDifference = sortedUniqKeys.map(
    (key) => {
      if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
        return { name: key, type: 'nested', children: gendiff(file1[key], file2[key]) };
      }
      if (!Object.hasOwn(file1, key)) {
        return { name: key, type: 'add', value: file2[key] };
      }
      if (!Object.hasOwn(file2, key)) {
        return { name: key, type: 'delete', value: file1[key] };
      }
      if (!(_.isEqual(file1[key], file2[key]))) {
        return {
          name: key,
          type: 'updated',
          children: [
            { type: 'delete', value: file1[key] },
            { type: 'add', value: file2[key] },
          ],
        };
      }
      return { name: key, type: 'unchanged', value: file1[key] };
    },
  );

  return buildDifference;
};

export default gendiff;
