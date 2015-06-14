// =========
// = humps =
// =========
// version 0.6.0
// Underscore-to-camelCase converter (and vice versa)
// for strings and object keys

// humps is copyright © 2014 Dom Christie
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
          output[convert(key, separator)] = _processKeys(convert, obj[key], separator);
        }
      }
    }
    return output;
  };

  // String conversion methods

  var separateWords = function(string, separator) {
    if (typeof separator === 'undefined') {
      separator = '_';
    }
    return string.replace(/([a-z])([A-Z0-9])/g, '$1'+ separator +'$2');
  };

  var camelize = function(string) {
    if (_isNumerical(string)) {
      return string;
    }
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
  };

  var pascalize = function(string) {
    var camelized = camelize(string);
    // Ensure 1st char is always uppercase
    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
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

  // Performant way to determine if obj coerces to a number
  var _isNumerical = function(obj) {
    obj = obj - 0;
    return obj === obj;
  };

  var humps = {
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
    depascalizeKeys: function () {
      return this.decamelizeKeys.apply(this, arguments);
    }
  };

  if (typeof define === 'function' && define.amd) {
    define(humps);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = humps;
  } else {
    global.humps = humps;
  }

})(this);
