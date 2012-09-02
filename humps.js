// =========
// = humps =
// =========
// version 0.1
// Underscore-to-camelCase converter (and vice versa)
// for strings and object keys

// humps is copyright © 2012 Dom Christie
// Released under the MIT license.


var humps = (function() {
  
  var _processObject = function(convert, obj, separator) {
    if(typeof obj !== 'object') {
      return obj;
    }
    
    var output = {};
    _.each(obj, function(val, key) {
      
      if(_.isArray(val)) {
        var convertedArray = [];
        _.each(val, function(item) {
          convertedArray.push(_processObject(convert, item, separator));
        });
        output[convert(key, separator)] = convertedArray;
      }
      else if(_.isObject(val)) {
        output[convert(key, separator)] = 
          _processObject(convert, val, separator);
      }
      else {
        output[convert(key, separator)] = obj[key];
      }
    });
    return output;
  }
  
  var camelize = function(string) {
    return string.replace(/[\-_\s]+(.)?/g, function(match, char) {
      return char ? char.toUpperCase() : '';
    });
  };
  
  var decamelize = function(string, separator) {
    if (separator == null) {
      separator = '_';
    }
    return string.replace(/([a-z])([A-Z0-9])/g, '$1'+ separator +'$2').toLowerCase();
  };
  
  return {
    camelize: camelize,
    decamelize: decamelize,
    camelizeKeys: function(object) {
      return _processObject(camelize, object);
    },
    decamelizeKeys: function(object, separator) {
      return _processObject(decamelize, object, separator);
    }
  }
  
})();