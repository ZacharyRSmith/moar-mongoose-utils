/**
 * @module toQueryCriteria converts JSON to a mongodb query @criteria.
 *
 * @flow
 * @param {Object} object
 */

const toQueryCriteria = (object/*: Object */) => {
  const ret = {};
  const iter = (obj, path) => {
    Object.keys(obj).forEach((k) => {
      const v = obj[k];
      if (
        typeof v !== 'object'
        || v instanceof Date
        || v instanceof RegExp
        || typeof v.toDate === 'function'
      ) {
        ret[path ? `${path}.${k}` : k] = typeof v.toDate === 'function'
          ? v.toDate()
          : v;
        return;
      }
      iter(v, path ? `${path}.${k}` : k);
    });
  };

  iter(object);

  return ret;
};

module.exports = toQueryCriteria;
