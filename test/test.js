var assert = require('assert');
var humps = require('../humps');

describe('humps', function() {
  'use strict';

  // =========
  // = Setup =
  // =========

  var simple_obj = {
      attr_one: 'foo',
      attr_two: 'bar'
    },
    simpleCamelObj = {
      attrOne: 'foo',
      attrTwo: 'bar'
    },
    simplePascalObj = {
      AttrOne: 'foo',
      AttrTwo: 'bar'
    },
    complex_obj = {
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
    },
    complex_obj_decamelized_one_level_deep = {
      attr_one: 'foo',
      attr_two: {
        nestedAttr1: 'bar'
      },
      attr_three: {
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
    },
    complex_obj_decamelized_two_levels_deep = {
      attr_one: 'foo',
      attr_two: {
        nested_attr1: 'bar'
      },
      attr_three: {
        nested_attr2: {
          nestedAttr3: [{
            nestedInArray1: 'baz'
          }, {
            nestedInArray2: 'hello'
          }, {
            nestedInArray3: ['world', 'boo']
          }]
        }
      }
    },
    complex_obj_decamelized_three_levels_deep = {
      attr_one: 'foo',
      attr_two: {
        nested_attr1: 'bar'
      },
      attr_three: {
        nested_attr2: {
          nested_attr3: [{
            nestedInArray1: 'baz'
          }, {
            nestedInArray2: 'hello'
          }, {
            nestedInArray3: ['world', 'boo']
          }]
        }
      }
    },
    complexCamelObj = {
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
    },
    complexObjCamelizedOneLevelDeep = {
      attrOne: 'foo',
      attrTwo: {
        nested_attr1: 'bar'
      },
      attrThree: {
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
    },
    complexObjCamelizedTwoLevelsDeep = {
      attrOne: 'foo',
      attrTwo: {
        nestedAttr1: 'bar'
      },
      attrThree: {
        nestedAttr2: {
          nested_attr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        }
      }
    },
    complexObjCamelizedThreeLevelsDeep = {
      attrOne: 'foo',
      attrTwo: {
        nestedAttr1: 'bar'
      },
      attrThree: {
        nestedAttr2: {
          nestedAttr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        }
      }
    },
    complexPascalObj = {
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
    },
    complexObjPascalizedOneLevelDeep = {
      AttrOne: 'foo',
      AttrTwo: {
        nested_attr1: 'bar'
      },
      AttrThree: {
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
    },
    complexObjPascalizedTwoLevelsDeep = {
      AttrOne: 'foo',
      AttrTwo: {
        NestedAttr1: 'bar'
      },
      AttrThree: {
        NestedAttr2: {
          nested_attr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        }
      }
    },
    complexObjPascalizedThreeLevelsDeep = {
      AttrOne: 'foo',
      AttrTwo: {
        NestedAttr1: 'bar'
      },
      AttrThree: {
        NestedAttr2: {
          NestedAttr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        }
      }
    },
    complexIgnoringNumbersObj = {
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
    },
    complexCustomObj = {
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

  // =========
  // = Specs =
  // =========

  describe('.camelizeKeys', function() {
    it('converts simple object keys to camelcase', function() {
      assert.deepStrictEqual(humps.camelizeKeys(simple_obj), simpleCamelObj);
    });

    it('converts complex object keys to camelcase', function() {
      assert.deepStrictEqual(humps.camelizeKeys(complex_obj), complexCamelObj);
    });

    it('converts complex object keys to camelcase', function() {
      assert.deepStrictEqual(humps.camelizeKeys(complex_obj), complexCamelObj);
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
      assert.deepStrictEqual(humps.camelizeKeys(_object), convertedObject);
    });

    it('converts keys within arrays of objects', function() {
      var array = [{first_name: 'Sam'}, {first_name: 'Jenna'}],
        convertedArray = [{firstName: 'Sam'}, {firstName: 'Jenna'}],
        result = humps.camelizeKeys(array);
      assert.deepStrictEqual(result, convertedArray);
      // Ensure it’s an array, and not an object with numeric keys
      assert.deepStrictEqual(toString.call(result), '[object Array]');
    });

    it('uses a custom conversion callback', function() {
      var result = humps.camelizeKeys(simple_obj, function(key, convert) {
        return key === 'attr_one' ? key : convert(key);
      });
      assert.deepStrictEqual(result, { attr_one: 'foo', attrTwo: 'bar' });
    });

    describe("when the value is a function", function() {
      it('converts the key and assigns the function', function() {
        function myFunction() {
        }
        var _object = {
          a_function: myFunction
        };

        var result = humps.camelizeKeys(_object);
        assert.deepStrictEqual(result.aFunction, myFunction);
      });
    });

    describe("when the depth option is provided", function() {
      describe("and it is less than 1", function() {
        it('does not convert anything given a depth of -1', function() {
          assert.deepStrictEqual(
            humps.camelizeKeys(complex_obj, { depth: -1 }),
            complex_obj
          );
        });

        it('does not convert anything given a depth of 0', function() {
          assert.deepStrictEqual(
            humps.camelizeKeys(complex_obj, { depth: 0 }),
            complex_obj
          );
        });
      });

      it('converts keys only on the top level', function() {
        assert.deepStrictEqual(
          humps.camelizeKeys(complex_obj, { depth: 1 }),
          complexObjCamelizedOneLevelDeep
        );
      });

      it('converts keys two levels deep', function() {
        assert.deepStrictEqual(
          humps.camelizeKeys(complex_obj, { depth: 2 }),
          complexObjCamelizedTwoLevelsDeep
        );
      });

      it('converts keys three levels deep', function() {
        assert.deepStrictEqual(
          humps.camelizeKeys(complex_obj, { depth: 3 }),
          complexObjCamelizedThreeLevelsDeep
        );
      });

      it('converts keys in the entire object four levels deep', function() {
        assert.deepStrictEqual(
          humps.camelizeKeys(complex_obj, { depth: 4 }),
          complexCamelObj
        );
      });
    });
  });

  describe('.decamelizeKeys', function() {
    it('converts simple objects with camelcased keys to underscored', function() {
      assert.deepStrictEqual(humps.decamelizeKeys(simpleCamelObj), simple_obj);
    });

    it('converts complex objects with camelcased keys to underscored', function() {
      assert.deepStrictEqual(humps.decamelizeKeys(complexCamelObj), complex_obj);
    });

    it('decamelizes keys with a custom separator', function() {
      var result = humps.decamelizeKeys(complexCamelObj, { separator: '-' });
      assert.deepStrictEqual(result, complexCustomObj);
    });

    it('uses a custom split regexp', function() {
      var result = humps.decamelizeKeys({ attr1: 'foo' }, { split: /(?=[A-Z0-9])/ });
      assert.deepStrictEqual(result, { attr_1: 'foo' });
    });

    it('uses a custom conversion callback', function() {
      var result = humps.decamelizeKeys(simpleCamelObj, function(key, convert, options) {
        return key === 'attrOne' ? key : convert(key, options);
      });
      assert.deepStrictEqual(result, { attrOne: 'foo', attr_two: 'bar' });
    });

    it('uses a custom conversion callback as an option', function() {
      var result = humps.decamelizeKeys(simpleCamelObj, {
        process: function(key, convert, options) {
          return key === 'attrOne' ? key : convert(key, options);
        }
      });
      assert.deepStrictEqual(result, { attrOne: 'foo', attr_two: 'bar' });
    });

    describe("when the value is a function", function() {
      it('converts the key and assigns the function', function() {
        function myFunction() {
        }
        var _object = {
          aFunction: myFunction
        };

        var result = humps.decamelizeKeys(_object);
        assert.deepStrictEqual(result.a_function, myFunction);
      });
    });

    describe("when the depth option is provided", function() {
      describe("and it is less than 1", function() {
        it('does not convert anything given a depth of -1', function() {
          assert.deepStrictEqual(
            humps.decamelizeKeys(complexCamelObj, { depth: -1 }),
            complexCamelObj
          );
        });

        it('does not convert anything given a depth of 0', function() {
          assert.deepStrictEqual(
            humps.decamelizeKeys(complexCamelObj, { depth: 0 }),
            complexCamelObj
          );
        });
      });

      it('converts keys only on the top level', function() {
        assert.deepStrictEqual(
          humps.decamelizeKeys(complexCamelObj, { depth: 1 }),
          complex_obj_decamelized_one_level_deep
        );
      });

      it('converts keys two levels deep', function() {
        assert.deepStrictEqual(
          humps.decamelizeKeys(complexCamelObj, { depth: 2 }),
          complex_obj_decamelized_two_levels_deep
        );
      });

      it('converts keys three levels deep', function() {
        assert.deepStrictEqual(
          humps.decamelizeKeys(complexCamelObj, { depth: 3 }),
          complex_obj_decamelized_three_levels_deep
        );
      });

      it('converts keys in the entire object four levels deep', function() {
        assert.deepStrictEqual(
          humps.decamelizeKeys(complexCamelObj, { depth: 4 }),
          complex_obj
        );
      });

      it('converts keys in the entire custom object four levels deep', function() {
        assert.deepStrictEqual(
          humps.decamelizeKeys(complexCamelObj, { depth: 4, separator: '-' }),
          complexCustomObj
        );
      });

      it('still works with a custom conversion callback as an option', function() {
        var result = humps.decamelizeKeys(simpleCamelObj, {
          depth: 2,
          process: function(key, convert, options) {
            return key === 'attrOne' ? key : convert(key, options);
          }
        });
        assert.deepStrictEqual(result, { attrOne: 'foo', attr_two: 'bar' });
      });
    });
  });

  describe('.pascalizeKeys', function() {
    it('converts simple object keys to PascalCase', function() {
      assert.deepStrictEqual(humps.pascalizeKeys(simple_obj), simplePascalObj);
    });

    it('converts complex object keys to PascalCase', function() {
      assert.deepStrictEqual(humps.pascalizeKeys(complex_obj), complexPascalObj);
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
      assert.deepStrictEqual(humps.pascalizeKeys(_object), convertedObject);
    });

    it('uses a custom conversion callback', function() {
      var result = humps.pascalizeKeys(simple_obj, function(key, convert) {
        return key === 'attr_one' ? key : convert(key);
      });
      assert.deepStrictEqual(result, { attr_one: 'foo', AttrTwo: 'bar' });
    });

    describe("when the depth option is provided", function() {
      describe("and it is less than 1", function() {
        it('does not convert anything given a depth of -1', function() {
          assert.deepStrictEqual(
            humps.pascalizeKeys(complex_obj, { depth: -1 }),
            complex_obj
          );
        });

        it('does not convert anything given a depth of 0', function() {
          assert.deepStrictEqual(
            humps.pascalizeKeys(complex_obj, { depth: 0 }),
            complex_obj
          );
        });
      });

      it('converts keys only on the top level', function() {
        assert.deepStrictEqual(
          humps.pascalizeKeys(complex_obj, { depth: 1 }),
          complexObjPascalizedOneLevelDeep
        );
      });

      it('converts keys two levels deep', function() {
        assert.deepStrictEqual(
          humps.pascalizeKeys(complex_obj, { depth: 2 }),
          complexObjPascalizedTwoLevelsDeep
        );
      });

      it('converts keys three levels deep', function() {
        assert.deepStrictEqual(
          humps.pascalizeKeys(complex_obj, { depth: 3 }),
          complexObjPascalizedThreeLevelsDeep
        );
      });

      it('converts keys in the entire object four levels deep', function() {
        assert.deepStrictEqual(
          humps.pascalizeKeys(complex_obj, { depth: 4 }),
          complexPascalObj
        );
      });
    });
  });

  describe('.depascalizeKeys', function() {
    it('converts simple object with PascalCase keys to underscored', function() {
      assert.deepStrictEqual(humps.depascalizeKeys(simplePascalObj), simple_obj);
    });

    it('converts complex object with PascalCase keys to underscored', function() {
      assert.deepStrictEqual(humps.depascalizeKeys(complexPascalObj), complex_obj);
    });

    it('depascalizes keys with a custom separator', function() {
      var result = humps.depascalizeKeys(complexPascalObj, { separator: '-' });
      assert.deepStrictEqual(result, complexCustomObj);
    });

    describe("when the depth option is provided", function() {
      describe("and it is less than 1", function() {
        it('does not convert anything given a depth of -1', function() {
          assert.deepStrictEqual(
            humps.depascalizeKeys(complexCamelObj, { depth: -1 }),
            complexCamelObj
          );
        });

        it('does not convert anything given a depth of 0', function() {
          assert.deepStrictEqual(
            humps.depascalizeKeys(complexCamelObj, { depth: 0 }),
            complexCamelObj
          );
        });
      });

      it('converts keys only on the top level', function() {
        assert.deepStrictEqual(
          humps.depascalizeKeys(complexCamelObj, { depth: 1 }),
          complex_obj_decamelized_one_level_deep
        );
      });

      it('converts keys two levels deep', function() {
        assert.deepStrictEqual(
          humps.depascalizeKeys(complexCamelObj, { depth: 2 }),
          complex_obj_decamelized_two_levels_deep
        );
      });

      it('converts keys three levels deep', function() {
        assert.deepStrictEqual(
          humps.depascalizeKeys(complexCamelObj, { depth: 3 }),
          complex_obj_decamelized_three_levels_deep
        );
      });

      it('converts keys in the entire object four levels deep', function() {
        assert.deepStrictEqual(
          humps.depascalizeKeys(complexCamelObj, { depth: 4 }),
          complex_obj
        );
      });
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
      var result = humps.decamelize('helloWorld', { separator: '-' });
      assert.equal(result, 'hello-world');
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
