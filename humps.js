// =========
// = humps =
// =========
// version 0.4
// Underscore-to-camelCase converter (and vice versa)
// for strings and object keys

// humps is copyright © 2013 Dom Christie
// Released under the MIT license.


;(function(global) {
  
  var _processKeys = function(convert, obj, separator) {
    if(!_isObject(obj) || _isDate(obj) || _isRegExp(obj)) {
      return obj;
    }

    var output,
        i = 0,
        l = 0;

    if(_isArray(obj)) {
      output = [];
      for(l=obj.length; i<l; i++) {
        output.push(_processKeys(convert, obj[i], separator));
      }
    }
    else {
      output = {};
      for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          var val = obj[key];
          if(_isArray(val)) {
            var convertedArray = [];
            i = 0;
            for(l=val.length; i<l; i++) {
              convertedArray.push(_processKeys(convert, val[i], separator));
            }
            output[convert(key, separator)] = convertedArray;
          }
          else if(_isObject(val)) {
            output[convert(key, separator)] = 
              _processKeys(convert, val, separator);
          }
          else {
            output[convert(key, separator)] = val;
          }
        }
      }
    }
    return output;
  };
  
  // String conversion methods
  
  var separateWords = function(string, separator) {
    if (separator === undefined) {
      separator = '_';
    }
    return string.replace(/([a-z])([A-Z0-9])/g, '$1'+ separator +'$2');
  };
  
  var camelize = function(string) {
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.replace(/^([A-Z])/, function(match, chr) {
      return chr ? chr.toLowerCase() : '';
    });
  };
  
  var pascalize = function(string) {
    return camelize(string).replace(/^([a-z])/, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  };
  
  var decamelize = function(string, separator) {
    return separateWords(string, separator).toLowerCase();
  };
  
  // Utilities
  // Taken from Underscore.js

  var toString = Object.prototype.toString;

  var _isObject = function(obj) {
    return obj === Object(obj);
  };
  var _isArray = function(obj) {
    return toString.call(obj) == '[object Array]';
  };
  var _isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };
  var _isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };
  
  global.humps = {
    camelize: camelize,
    decamelize: decamelize,
    pascalize: pascalize,
    depascalize: decamelize,
    camelizeKeys: function(object) {
      return _processKeys(camelize, object);
    },
    decamelizeKeys: function(object, separator) {
      return _processKeys(decamelize, object, separator);
    },
    pascalizeKeys: function(object) {
      return _processKeys(pascalize, object);
    },
    depascalizeKeys: this.decamelizeKeys
  };
  
})(this);
