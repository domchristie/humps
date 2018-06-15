humps [![Build status](https://secure.travis-ci.org/domchristie/humps.png)](http://travis-ci.org/#!/domchristie/humps)
=====

Underscore-to-camelCase converter (and vice versa) for strings and object keys in JavaScript.

When converting object keys, it will walk the structure, converting any nested objects (or arrays of nested objects) along the way. Handy for converting JSON between JavaScript and Ruby/Rails APIs.

Takes inspiration from [Ember Data](https://github.com/emberjs/data) and copies some utility functions from [Underscore.js](http://underscorejs.org/).

Usage
-----

### Converting strings

```js
humps.camelize('hello_world') // 'helloWorld'
humps.decamelize('fooBar') // 'foo_bar'
humps.decamelize('fooBarBaz', { separator: '-' }) // 'foo-bar-baz'
```

### Converting object keys

```js
var object = { attr_one: 'foo', attr_two: 'bar' }
humps.camelizeKeys(object); // { attrOne: 'foo', attrTwo: 'bar' }
```

Arrays of objects are also converted

```js
var array = [{ attr_one: 'foo' }, { attr_one: 'bar' }]
humps.camelizeKeys(array); // [{ attrOne: 'foo' }, { attrOne: 'bar' }]
```

It also accepts a callback which can modify the conversion behavior. For example to prevent conversion of keys containing only uppercase letters or numbers:

```js
humps.camelizeKeys(obj, function(key, convert) {
  return /^[A-Z0-9_]+$/.test(key) ? key : convert(key);
});
humps.decamelizeKeys(obj, function(key, convert, options) {
  return /^[A-Z0-9_]+$/.test(key) ? key : convert(key, options);
});
```

In order to use the callback with options use the `process` option:

```js
humps.decamelizeKeys(obj, {
    separator: '-',
    process: function(key, convert, options) {
      return /^[A-Z0-9_]+$/.test(key) ? key : convert(key, options);
    }
});
```

API
---

### `humps.camelize(string)`

Removes any hypens, underscores, and whitespace characters, and uppercases the first character that follows.

```js
humps.camelize('hello_world-foo bar') // 'helloWorldFooBar'
```

### `humps.pascalize(string)`

Similar to `humps.camelize`, but also ensures that the first character is uppercase.

```js
humps.pascalize('hello_world-foo bar') // 'HelloWorldFooBar'
```

### `humps.decamelize(string[, options])`

Converts camelCased string to an underscore-separated string.

Properties of the optional `options` object:

| Property    | Description                       | Type   | Default         |
|-------------|-----------------------------------|--------|-----------------|
| `separator` | Customizes the separator          | String | `'-'`           |
| `split`     | Customizes the splitting strategy | RegExp | ``/(?=[A-Z])/`` |


```js
humps.decamelize('helloWorldFooBar') // 'hello_world_foo_bar'
```

The separator can be customized with the `separator` option.

```js
humps.decamelize('helloWorldFooBar', { separator: '-' }) // 'hello-world-foo-bar'
```

By default, `humps.decamelize` will only split words on capital letters (not numbers as in humps pre v1.0). To customize this behaviour, use the `split` option. This should be a regular expression which, when passed into `String.prototype.split`, produces an array of words. For example, to treat numbers as uppercase:

```js
humps.decamelize('helloWorld1', { split: /(?=[A-Z0-9])/ }) // 'hello_world_1'
```

### `humps.depascalize(string[, options])`

Same as `humps.decamelize` above.

### `humps.camelizeKeys(object[, options])`

Converts object keys to camelCase. It also converts arrays of objects.

Properties of the optional `options` object:

| Property | Description | Type | Default |
|-|-|-|-|
| `process` | Modifies the conversion behavior. See example in Usage section. | Function | Convert the key no matter what |
| `depth` | How many levels deep in a nested object that keys will be converted. Any number `<= 0` will result in a completely unchanged object. | Number | `undefined` (all keys will be converted) |

### `humps.pascalizeKeys(object[, options])`

Similar to `humps.camelizeKeys`, but also ensures that the first character of the key is uppercase.

### `humps.decamelizeKeys(object[, options])`

Separates camelCased object keys with an underscore. It also converts arrays of objects.

Properties of the optional `options` object:

| Property | Description | Type | Default |
|-|-|-|-|
| `separator` | Customizes the separator | String | `'-'` |
| `split`     | Customizes the splitting strategy | RegExp | ``/(?=[A-Z])/`` |
| `process` | Modifies the conversion behavior. See example in Usage section. | Function | Convert the key no matter what |
| `depth` | How many levels deep in a nested object that keys will be converted. Any number `<= 0` will result in a completely unchanged object. | Number | `undefined` (all keys will be converted) |


See `humps.decamelize` for examples.

### `humps.depascalizeKeys(object[, options])`

Same as `humps.decamelizeKeys`.

Licence
-------
humps is copyright &copy; 2012+ [Dom Christie](http://domchristie.co.uk) and released under the MIT license.
