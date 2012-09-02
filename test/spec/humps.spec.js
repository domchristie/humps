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
  });
  
  describe(".decamelize", function() {
    it("should convert camelcased strings to underscored", function() {
      expect(humps.decamelize('helloWorld')).toEqual('hello_world');
    });
    
    it("should decamelize strings with custom separator", function() {
      expect(humps.decamelize('helloWorld', '-')).toEqual('hello-world');
    });
  });

});