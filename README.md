# Moar Mongoose Utils



# Installation
```sh
$ npm install moar-mongoose-utils
```

# Usage
```javascript
// details like connecting to DB hidden
const { toQueryCriteria } = require('moar-mongoose-utils');
const { Todo } = require('some-models');

describe('mongoose test', () => {
  const payload = { outter: { foo: 'bar' }, subTasks: [{ name: 'eat chocolate' }] };

  beforeAll(done => {
    Todo.create(payload, done);
  });

  afterAll(done => {
    // `toQueryCriteria()` converts `payload` to
    // `{
    //   'outter.foo': 'bar',
    //   'subTasks.0.name': 'eat chocolate'
    //  }`.
    Todo.remove(toQueryCriteria(payload), done);
  });
  .
  .
  .
});
