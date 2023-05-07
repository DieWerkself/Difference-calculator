import _ from 'lodash';

const stylish = (file) => {
  const startIndentCount = 4;
  const intendPerNested = 4;
  const shiftLeft = 2;
  const lb = '\n';

  const calcIntend = (int) => ' '.repeat(int);
  const isObject = (obj) => _.isPlainObject(obj);

  const createStylishValue = (value, int) => `{${lb}${value}${lb}${calcIntend(int)}}`;
  const createStylishObject = (object, name, int) => `${calcIntend(int)}${name}: ${createStylishValue(object, int)}`;
  const createStylishProperty = (key, value, int, status = ' ') => `${calcIntend(int - shiftLeft)}${status} ${key}: ${value}`;

  const createImmutableObject = (object, intend) => {
    const iter = (node, step) => {
      const eachValue = Object.entries(node).map((child) => {
        const [key, value] = child;
        if (isObject(value)) {
          return createStylishObject(iter(value, step + intendPerNested), key, step);
        }
        return `${calcIntend(step)}${key}: ${value}`;
      });
      return eachValue.join(lb);
    };
    return createStylishValue(iter(object, intend + intendPerNested), intend);
  };

  const iter = (node, intend) => {
    const {
      name, type, children, value, status,
    } = node;

    switch (type) {
      case 'object':
        return createStylishObject(children.flatMap(
          (child) => iter(child, intend + intendPerNested),
        ).join(lb), name, intend);
      case 'changed': {
        const content = isObject(value) ? createImmutableObject(value, intend) : value;
        return createStylishProperty(name, content, intend, status);
      }
      case 'unchanged':
        return createStylishProperty(name, value, intend);
      case 'updated':
        return children.flatMap((child) => iter({ ...child, name }, intend)).join(lb);
      default:
        throw new Error(type);
    }
  };

  return `{${lb}${file.flatMap((child) => iter(child, startIndentCount)).join(lb)}${lb}}`;
};

export default stylish;
