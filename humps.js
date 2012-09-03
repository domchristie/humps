// =========
// = humps =
// =========
// version 0.2
// Underscore-to-camelCase converter (and vice versa)
// for strings and object keys

// humps is copyright © 2012 Dom Christie
// Released under the MIT license.


;(function(global) {
  
  var _processKeys = function(convert, obj, separator) {
    if(!_isObject(obj) || _isDate(obj) || _isRegExp(obj)) {
      return obj;
    }
    var output = {};
    
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        var val = obj[key];
        
        if(_isArray(val)) {
          var convertedArray = [];
          for(var i=0, l=val.length; i<l; i++) {
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
  
  var _isObject = function(obj) {
    return obj === Object(obj);
  };
  var _isArray = function(obj) {
    return toString.call(obj) == '[object Array]';
  };
  var _isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };
  _isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
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