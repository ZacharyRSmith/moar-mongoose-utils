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
      if (typeof v !== 'object') {
        ret[path ? `${path}.${k}` : k] = v;
        return;
      }
      iter(v, path ? `${path}.${k}` : k);
    });
  };

  iter(object);

  return ret;
};

module.exports = toQueryCriteria;
