// =========
// = humps =
// =========
// Underscore-to-camelCase converter (and vice versa)
// for strings and object keys

// humps is copyright © 2012+ Dom Christie
// Released under the MIT license.


;(function(global) {

  var _processKeys = function(convert, obj, options, parentKeyExcluded) {
    if(!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj)) {
      return obj;
    }

    var output,
        i = 0,
        l = 0;

    var keyExclusions = options && options.keyExclusions || [];
    var parentKeyExclusions = options && options.parentKeyExclusions || [];

    if(_isArray(obj)) {
      output = [];
      for(l=obj.length; i<l; i++) {
        output.push(_processKeys(convert, obj[i], options));
      }
    }
    else {
      output = {};
      var excludeKey = parentKeyExcluded;

      for(var key in obj) {
        var parentKeyExcluded =
          parentKeyExclusions.indexOf(key) !== -1 ? true : false;

        if(obj.hasOwnProperty(key)
            && keyExclusions.indexOf(key) === -1
            && !excludeKey) {
          output[convert(key, options)] = _processKeys(convert, obj[key], options, parentKeyExcluded);
        } else {
          output[key] = _processKeys(convert, obj[key], options, parentKeyExcluded);
        }
      }
    }
    return output;
  };

  // String conversion methods

  var separateWords = function(string, options) {
    options = options || {};
    var separator = options.separator || '_';
    var split = options.split || /(?=[A-Z])/;

    return string.split(split).join(separator);
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

  var decamelize = function(string, options) {
    return separateWords(string, options).toLowerCase();
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
  var _isBoolean = function(obj) {
    return toString.call(obj) == '[object Boolean]';
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
    camelizeKeys: function(object, options) {
      return _processKeys(camelize, object, options);
    },
    decamelizeKeys: function(object, options) {
      return _processKeys(decamelize, object, options);
    },
    pascalizeKeys: function(object, options) {
      return _processKeys(pascalize, object, options);
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
