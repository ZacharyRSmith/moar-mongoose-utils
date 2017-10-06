const toQueryCriteria = require('./toQueryCriteria');

test('simple object', () => {
  const object = {foo: 'bar', hello: 'world'};

  const actual = toQueryCriteria(object);

  expect(actual).toEqual(object);
});

test('nested object', () => {
  const object = {
    baseProp: 'hi',
    outter: {
      foo: 'bar',
      hello: 'world'
    }
  };

  const actual = toQueryCriteria(object);

  expect(actual).toEqual({
    'baseProp': 'hi',
    'outter.foo': 'bar',
    'outter.hello': 'world'
  });
});

test('subdocs embedded in array', () => {
  const object = {
    ary: [
      {
        'subdoc': {
          foo: 'bar',
          innerAry: [
            {
              anotherSubDoc: {
                woah: 'ok...'
              }
            }
          ]
        },
        '0': 'zero'
      },
      {
        '1': 'one'
      }
    ],
    baseProp: 'hi',
    outter: {
      foo: 'bar',
      hello: 'world'
    }
  };

  const actual = toQueryCriteria(object);

  expect(actual).toEqual({
    'ary.0.0': 'zero',
    'ary.0.subdoc.foo': 'bar',
    'ary.0.subdoc.innerAry.0.anotherSubDoc.woah': 'ok...',
    'ary.1.1': 'one',
    'baseProp': 'hi',
    'outter.foo': 'bar',
    'outter.hello': 'world'
  });
});
