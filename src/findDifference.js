import _ from 'lodash';

const gendiff = (file1, file2) => {
    const uniqKeys = _.union(Object.keys(file1), Object.keys(file2));
    const sortedUniqKeys = _.sortBy(uniqKeys);
    
    const buildDiffObject = sortedUniqKeys.reduce((acc, key) => {
        if (!Object.hasOwn(file1, key)) {
            acc += `\n + ${key}: ${file2[key]}`;
            return acc;
        };
        if (!Object.hasOwn(file2, key)) {
            acc += `\n - ${key}: ${file1[key]}`;
            return acc;
        };
        if (file1[key] !== file2[key]) {
            acc += `\n - ${key}: ${file1[key]}\n + ${key}: ${file2[key]}`;
            return acc;
        }
        acc += `\n   ${key}: ${file1[key]}`;
        return acc;
    }, ''
    );
    return `{ ${buildDiffObject} \n}`
};

export default gendiff;