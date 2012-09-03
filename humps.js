// =========
// = humps =
// =========
// version 0.1.2
// Underscore-to-camelCase converter (and vice versa)
// for strings and object keys

// humps is copyright © 2012 Dom Christie
// Released under the MIT license.


;(function(global) {
  
  var _processKeys = function(convert, obj, separator) {
    if(!_.isObject(obj) || _.isDate(obj)) {
      return obj;
    }
    var output = {};
    _.each(obj, function(val, key) {
      
      if(_.isArray(val)) {
        var convertedArray = [];
        _.each(val, function(item) {
          convertedArray.push(_processKeys(convert, item, separator));
        });
        output[convert(key, separator)] = convertedArray;
      }
      else if(_.isObject(val)) {
        output[convert(key, separator)] = 
          _processKeys(convert, val, separator);
      }
      else {
        output[convert(key, separator)] = val;
      }
    });
    return output;
  };
  
  var camelize = function(string) {
    return string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  };
  
  var decamelize = function(string, separator) {
    if (separator === undefined) {
      separator = '_';
    }
    return string.replace(/([a-z])([A-Z0-9])/g, '$1'+ separator +'$2').toLowerCase();
  };
  
  global.humps = {
    camelize: camelize,
    decamelize: decamelize,
    camelizeKeys: function(object) {
      return _processKeys(camelize, object);
    },
    decamelizeKeys: function(object, separator) {
      return _processKeys(decamelize, object, separator);
    }
  };
  
})(this);