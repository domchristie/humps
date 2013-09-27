describe("humps", function() {
  
  // =========
  // = Setup =
  // =========
  
  beforeEach(function() {
    this.simple_Obj = {
      attr_one: "foo",
      attr_two: "bar"
    };
    
    this.simpleCamelObj = {
      attrOne: "foo",
      attrTwo: "bar"
    };
    
    this.simplePascalObj = {
      AttrOne: "foo",
      AttrTwo: "bar"
    };
    
    this.complex_Obj = {
      attr_one: "foo",
      attr_two: {
        nested_attr_1: "bar"
      },
      attr_three: {
        nested_attr_2: {
          nested_attr_3: [{
            nested_in_array_1: "baz"
          }, {
            nested_in_array_2: "hello"
          }, {
            nested_in_array_3: ["world", "boo"]
          }]
        }
      }
    };
    
    this.complexCamelObj = {
      attrOne: "foo",
      attrTwo: {
        nestedAttr1: "bar"
      },
      attrThree: {
        nestedAttr2: {
          nestedAttr3: [{
            nestedInArray1: "baz"
          }, {
            nestedInArray2: "hello"
          }, {
            nestedInArray3: ["world", "boo"]
          }]
        }
      }
    };
    
    this.complexPascalObj = {
      AttrOne: "foo",
      AttrTwo: {
        NestedAttr1: "bar"
      },
      AttrThree: {
        NestedAttr2: {
          NestedAttr3: [{
            NestedInArray1: "baz"
          }, {
            NestedInArray2: "hello"
          }, {
            NestedInArray3: ["world", "boo"]
          }]
        }
      }
    };
    
    this.complexCustomObj = {
      "attr-one": "foo",
      "attr-two": {
        "nested-attr-1": "bar"
      },
      "attr-three": {
        "nested-attr-2": {
          "nested-attr-3": [{
            "nested-in-array-1": "baz"
          }, {
            "nested-in-array-2": "hello"
          }, {
            "nested-in-array-3": ["world", "boo"]
          }]
        }
      }
    };
  });
  
  // =========
  // = Specs =
  // =========
  
  describe(".camelizeKeys", function() {
    it("should convert simple object keys to camelcase", function() {
      expect(humps.camelizeKeys(this.simple_Obj)).toEqual(this.simpleCamelObj);
    });
    
    it("should convert complex object keys to camelcase", function() {
      expect(humps.camelizeKeys(this.complex_Obj)).toEqual(this.complexCamelObj);
    });
    
    it("should not attempt to process dates", function() {
      'work in progress';
      var date = new Date();
      var _object = {
        a_date: date
      };
      var convertedObject = {
        aDate: date
      };
      expect(humps.camelizeKeys(_object)).toEqual(convertedObject);
    });

    it('should convert keys within arrays of objects', function() {
      var array = [{ first_name: "Sam" }, { first_name: "Jenna" }],
          convertedArray = [{ firstName: "Sam" }, { firstName: "Jenna" }],
          result = humps.camelizeKeys(array);
      expect(result).toEqual(convertedArray);
      // Ensure it’s an array, and not an object with numeric keys
      expect(toString.call(result)).toEqual('[object Array]');
    });
  });
  
  describe(".decamelizeKeys", function() {
    it("should convert simple object keys to camelcase", function() {
      expect(humps.decamelizeKeys(this.simpleCamelObj)).toEqual(this.simple_Obj);
    });
    
    it("should convert complex object keys to camelcase", function() {
      expect(humps.decamelizeKeys(this.complexCamelObj)).toEqual(this.complex_Obj);
    });
    
    it("should decamelize keys with a custom separator", function() {
      expect(humps.decamelizeKeys(this.complexCamelObj, '-')).toEqual(this.complexCustomObj);
    });
  });
  
  describe(".pascalizeKeys", function() {
    it("should convert simple object keys to PascalCase", function() {
      expect(humps.pascalizeKeys(this.simple_Obj)).toEqual(this.simplePascalObj);
    });
    
    it("should convert complex object keys to PascalCase", function() {
      expect(humps.pascalizeKeys(this.complex_Obj)).toEqual(this.complexPascalObj);
    });
    
    it("should not attempt to process dates", function() {
      'work in progress';
      var date = new Date();
      var _object = {
        a_date: date
      };
      var convertedObject = {
        ADate: date
      };
      expect(humps.pascalizeKeys(_object)).toEqual(convertedObject);
    });
  });
  
  describe(".camelize", function() {
    it("should convert underscored strings to camelcase", function() {
      expect(humps.camelize('hello_world')).toEqual('helloWorld');
    });
    
    it("should convert hyphenated strings to camelcase", function() {
      expect(humps.camelize('hello-world')).toEqual('helloWorld');
    });
    
    it("should convert space-separated strings to camelcase", function() {
      expect(humps.camelize('hello world')).toEqual('helloWorld');
    });
    
    it("should convert PascalCased strings to camelcase", function() {
      expect(humps.camelize('HelloWorld')).toEqual('helloWorld');
    });
  });
  
  describe(".decamelize", function() {
    it("should convert camelcased strings to underscored", function() {
      expect(humps.decamelize('helloWorld')).toEqual('hello_world');
    });
    
    it("should decamelize strings with custom separator", function() {
      expect(humps.decamelize('helloWorld', '-')).toEqual('hello-world');
    });
  });
  
  describe(".pascalize", function() {
    it("should convert underscored strings to PascalCase", function() {
      expect(humps.pascalize('hello_world')).toEqual('HelloWorld');
    });
    
    it("should convert hyphenated strings to PascalCase", function() {
      expect(humps.pascalize('hello-world')).toEqual('HelloWorld');
    });
    
    it("should convert space-separated strings to PascalCase", function() {
      expect(humps.pascalize('hello world')).toEqual('HelloWorld');
    });
  });

});