import _ from 'lodash';

const generateDifference = (data1, data2) => {
  const uniqKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedUniqKeys = _.sortBy(uniqKeys);

  const createDifference = sortedUniqKeys.map(
    (key) => {
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return { name: key, type: 'nested', children: generateDifference(data1[key], data2[key]) };
      }
      if (!Object.hasOwn(data1, key)) {
        return { name: key, type: 'added', value: data2[key] };
      }
      if (!Object.hasOwn(data2, key)) {
        return { name: key, type: 'deleted', value: data1[key] };
      }
      if (!(_.isEqual(data1[key], data2[key]))) {
        return {
          name: key,
          type: 'updated',
          value1: data1[key],
          value2: data2[key],
        };
      }
      return { name: key, type: 'unchanged', value: data1[key] };
    },
  );

  return createDifference;
};

export default generateDifference;
