var assert = require('assert');
var humps = require('../humps');

describe('humps', function() {
  'use strict';
  var actual;

  // =========
  // = Setup =
  // =========

  beforeEach(function() {
    this.simple_obj = {
      attr_one: 'foo',
      attr_two: 'bar'
    };

    this.simpleCamelObj = {
      attrOne: 'foo',
      attrTwo: 'bar'
    };

    this.simplePascalObj = {
      AttrOne: 'foo',
      AttrTwo: 'bar'
    };

    this.complex_obj = {
      attr_one: 'foo',
      attr_two: {
        nested_attr1: 'bar'
      },
      attr_three: {
        nested_attr2: {
          nested_attr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        }
      }
    };

     this.complex_obj_exclude = {
      attr_one: 'foo',
      attr_two: {
        nested_attr1: 'bar'
      },
      attr_three: {
        nested_attr2: {
          nested_attr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        },
        nested_attr4: 'foo'
      }
    };

    this.complexCamelObj = {
      attrOne: 'foo',
      attrTwo: {
        nestedAttr1: 'bar'
      },
      attrThree: {
        nestedAttr2: {
          nestedAttr3: [{
            nestedInArray1: 'baz'
          }, {
            nestedInArray2: 'hello'
          }, {
            nestedInArray3: ['world', 'boo']
          }]
        }
      }
    };

    this.complexPascalObj = {
      AttrOne: 'foo',
      AttrTwo: {
        NestedAttr1: 'bar'
      },
      AttrThree: {
        NestedAttr2: {
          NestedAttr3: [{
            NestedInArray1: 'baz'
          }, {
            NestedInArray2: 'hello'
          }, {
            NestedInArray3: ['world', 'boo']
          }]
        }
      }
    };

    this.complexPascalObjExclude = {
      AttrOne: 'foo',
      AttrTwo: {
        NestedAttr1: 'bar'
      },
      AttrThree: {
        nested_attr2: {
          NestedAttr3: [{
            NestedInArray1: 'baz'
          }, {
            NestedInArray2: 'hello'
          }, {
            NestedInArray3: ['world', 'boo']
          }]
        },
        nested_attr4: 'foo'
      }
    };

    this.complexIgnoringNumbersObj = {
      attr_one: 'foo',
      attr_two: {
        nested_attr1: 'bar'
      },
      attr_three: {
        nested_attr2: {
          nested_attr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        }
      }
    };

    this.complexCustomObj = {
      'attr-one': 'foo',
      'attr-two': {
        'nested-attr1': 'bar'
      },
      'attr-three': {
        'nested-attr2': {
          'nested-attr3': [{
            'nested-in-array1': 'baz'
          }, {
            'nested-in-array2': 'hello'
          }, {
            'nested-in-array3': ['world', 'boo']
          }]
        }
      }
    };

    this.complexCamelObjExclude = {
      attrOne: 'foo',
      attrTwo: {
        nestedAttr1: 'bar'
      },
      attrThree: {
        nested_attr2: {
          nestedAttr3: [{
            nestedInArray1: 'baz'
          }, {
            nestedInArray2: 'hello'
          }, {
            nestedInArray3: ['world', 'boo']
          }]
        },
        nested_attr4: 'foo'
      }
    };
  });

  // =========
  // = Specs =
  // =========

  describe('.camelizeKeys', function() {
    it('converts simple object keys to camelcase', function() {
      assert.deepEqual(humps.camelizeKeys(this.simple_obj), this.simpleCamelObj);
    });

    it('converts complex object keys to camelcase', function() {
      assert.deepEqual(humps.camelizeKeys(this.complex_obj), this.complexCamelObj);
    });

    it('converts complex object to camelcase, excluding given keys ', function() {
      assert.deepEqual(humps.camelizeKeys(this.complex_obj_exclude, {
        keyExclusions: ['nested_attr2', 'nested_attr4']
      }), this.complexCamelObjExclude);
    });

    it('converts complex object to camelcase, excluding child keys of given keys', function() {
      assert.deepEqual(humps.camelizeKeys(this.complex_obj_exclude, {
        parentKeyExclusions: ['attr_three']
      }), this.complexCamelObjExclude);
    });

    it('does not attempt to process dates', function() {
      'work in progress';
      var date = new Date();
      var _object = {
        a_date: date
      };
      var convertedObject = {
        aDate: date
      };
      assert.deepEqual(humps.camelizeKeys(_object), convertedObject);
    });

    it('converts keys within arrays of objects', function() {
      var array = [{first_name: 'Sam'}, {first_name: 'Jenna'}],
        convertedArray = [{firstName: 'Sam'}, {firstName: 'Jenna'}],
        result = humps.camelizeKeys(array);
      assert.deepEqual(result, convertedArray);
      // Ensure it’s an array, and not an object with numeric keys
      assert.deepEqual(toString.call(result), '[object Array]');
    });
  });

  describe('.decamelizeKeys', function() {
    it('converts simple objects with camelcased keys to underscored', function() {
      assert.deepEqual(humps.decamelizeKeys(this.simpleCamelObj), this.simple_obj);
    });

    it('converts complex objects with camelcased keys to underscored', function() {
      assert.deepEqual(humps.decamelizeKeys(this.complexCamelObj), this.complex_obj);
    });

    it('decamelizes keys with a custom separator', function() {
      actual = humps.decamelizeKeys(this.complexCamelObj, { separator: '-' });
      assert.deepEqual(actual, this.complexCustomObj);
    });

    it('uses a custom split regexp', function() {
      actual = humps.decamelizeKeys({ attr1: 'foo' }, { split: /(?=[A-Z0-9])/ });
      assert.deepEqual(actual, { attr_1: 'foo' });
    });
  });

  describe('.pascalizeKeys', function() {
    it('converts simple object keys to PascalCase', function() {
      assert.deepEqual(humps.pascalizeKeys(this.simple_obj), this.simplePascalObj);
    });

    it('converts complex object keys to PascalCase', function() {
      assert.deepEqual(humps.pascalizeKeys(this.complex_obj), this.complexPascalObj);
    });

    it('converts complex object to PascalCase, excluding given keys ', function() {
      assert.deepEqual(humps.pascalizeKeys(this.complex_obj_exclude, {
        keyExclusions: ['nested_attr2', 'nested_attr4']
      }), this.complexPascalObjExclude);
    });

    it('converts complex object to PascalCase, excluding child keys of given keys', function() {
      assert.deepEqual(humps.pascalizeKeys(this.complex_obj_exclude, {
        parentKeyExclusions: ['attr_three']
      }), this.complexPascalObjExclude);
    });


    it('does not attempt to process dates', function() {
      'work in progress';
      var date = new Date();
      var _object = {
        a_date: date
      };
      var convertedObject = {
        ADate: date
      };
      assert.deepEqual(humps.pascalizeKeys(_object), convertedObject);
    });
  });

  describe('.depascalizeKeys', function() {
    it('converts simple object with PascalCase keys to underscored', function() {
      assert.deepEqual(humps.depascalizeKeys(this.simplePascalObj), this.simple_obj);
    });

    it('converts complex object with PascalCase keys to underscored', function() {
      assert.deepEqual(humps.depascalizeKeys(this.complexPascalObj), this.complex_obj);
    });

    it('depascalizes keys with a custom separator', function() {
      actual = humps.depascalizeKeys(this.complexPascalObj, { separator: '-' });
      assert.deepEqual(actual, this.complexCustomObj);
    });
  });

  describe('.camelize', function() {
    it('converts underscored strings to camelcase', function() {
      assert.equal(humps.camelize('hello_world'), 'helloWorld');
    });

    it('converts hyphenated strings to camelcase', function() {
      assert.equal(humps.camelize('hello-world'), 'helloWorld');
      assert.equal(humps.camelize('hello-world-1'), 'helloWorld1');
    });

    it('converts space-separated strings to camelcase', function() {
      assert.equal(humps.camelize('hello world'), 'helloWorld');
    });

    it('converts PascalCased strings to camelcase', function() {
      assert.equal(humps.camelize('HelloWorld'), 'helloWorld');
    });

    it('keeps numbers unchanged', function() {
      assert.equal(humps.camelize('-1'), '-1');
      assert.equal(humps.camelize('1'), '1');
    });
  });

  describe('.decamelize', function() {
    it('converts camelcased strings to underscored', function() {
      assert.equal(humps.decamelize('helloWorld'), 'hello_world');
    });

    it('decamelizes strings with custom separator', function() {
      actual = humps.decamelize('helloWorld', { separator: '-' });
      assert.equal(actual, 'hello-world');
    });

    it('does not separate on digits', function() {
      assert.equal(humps.decamelize('helloWorld1'), 'hello_world1');
    });

    it('uses a custom split regexp', function() {
      assert.equal(humps.decamelize('helloWorld1', { split: /(?=[A-Z0-9])/ }),
        'hello_world_1');
    });
  });

  describe('.pascalize', function() {
    it('converts underscored strings to PascalCase', function() {
      assert.equal(humps.pascalize('hello_world'), 'HelloWorld');
    });

    it('converts hyphenated strings to PascalCase', function() {
      assert.equal(humps.pascalize('hello-world'), 'HelloWorld');
    });

    it('converts space-separated strings to PascalCase', function() {
      assert.equal(humps.pascalize('hello world'), 'HelloWorld');
    });
  });
});
