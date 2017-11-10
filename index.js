(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["validator-core"] = factory();
	else
		root["validator-core"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getType = exports.getType = function getType(v) {
  return Object.prototype.toString.call(v).slice(8, -1);
};

var isValidDate = exports.isValidDate = function isValidDate(inDate) {
  if (!inDate) return false;

  var valid = true;
  // yyyy.mm.dd => yyyy-mm-dd
  if (typeof inDate === 'string') {
    var pos = inDate.indexOf('.');
    if (pos > 0 && pos <= 6) {
      inDate = inDate.replace(/\./g, '-');
    }
  }

  var testDate = new Date(inDate);
  var yr = testDate.getFullYear();
  var mo = testDate.getMonth();

  if (yr < 1000) {
    return false;
  }
  if (isNaN(mo)) {
    return false;
  }

  return valid;
};

var dateCompare = exports.dateCompare = function dateCompare(value, params, type) {
  if (!isValidDate(value) || !isValidDate(params)) return false;

  var v = getType(value) === 'Date' ? value : new Date(value);

  if (type === 'after') return v.getTime() > new Date(params).getTime();
  if (type === 'after_equal') return v.getTime() >= new Date(params).getTime();
  if (type === 'before') return v.getTime() < new Date(params).getTime();
  if (type === 'before_equal') return v.getTime() <= new Date(params).getTime();
};

var numCompare = exports.numCompare = function numCompare(value, params, type) {
  if (getType(value) !== 'Number') return false;

  if (type === 'lt') return parseFloat(value) < parseFloat(params);
  if (type === 'lte') return parseFloat(value) <= parseFloat(params);
  if (type === 'gt') return parseFloat(value) > parseFloat(params);
  if (type === 'gte') return parseFloat(value) >= parseFloat(params);
  if (type === 'equal') return parseFloat(value) === parseFloat(params);
};

var isContain = exports.isContain = function isContain(value, params, type) {
  var isEqual = null;
  if (getType(value) === 'Number') isEqual = function isEqual(value, item) {
    return value == item;
  };
  if (getType(value) === 'Boolean') isEqual = function isEqual(value, item) {
    return value === (item === 'true');
  };
  if (getType(value) === 'String') isEqual = function isEqual(value, item) {
    return value === item;
  };

  if (isEqual === null) return false;

  for (var i = 0; i < params.length; i++) {
    var item = params[i];
    if (isEqual(value, item)) return type === 'in';
  }

  return type !== 'in';
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lib = __webpack_require__(0);

var _runner = __webpack_require__(2);

var _runner2 = _interopRequireDefault(_runner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
  function Validator(ruleList) {
    _classCallCheck(this, Validator);

    this._rules = {};
    this._tips = {};
    this._optional = {};

    if ((0, _lib.getType)(ruleList) === 'Array') this.use(ruleList);
  }

  _createClass(Validator, [{
    key: '_runSingleRule',
    value: function _runSingleRule(value, rule) {
      if ((0, _lib.getType)(rule) === 'Function') {
        return rule(value);
      } else if ((0, _lib.getType)(rule) === 'String') {
        return (0, _runner2.default)(rule, value);
      } else {
        if ((0, _lib.getType)(rule) !== 'RegExp') throw new TypeError('rule type error!! rule type must be function or RegExp or String!');

        return rule.test(value);
      }
    }
  }, {
    key: '_runRuleSet',
    value: function _runRuleSet(name, value, ruleSet) {
      if (!ruleSet) throw new TypeError('There are no ruleset that name ' + name);
      // 如果是可选，不填也是正确的
      if (this._optional[name] && !value) return -1;

      for (var idx = 0; idx < ruleSet.length; idx++) {
        var rule = ruleSet[idx];
        if (!this._runSingleRule(value, rule)) return idx;
      }

      return -1;
    }
  }, {
    key: '_getResult',
    value: function _getResult(name, index) {
      if (index === -1) {
        return {
          isError: false,
          isPass: true,
          name: name
        };
      }

      var tipSet = this._tips[name];
      var tip = tipSet.length === 1 ? tipSet[0] : tipSet[index];

      return {
        isError: true,
        isPass: false,
        name: name,
        tip: tip
      };
    }

    /**
     * Init validator with a set of rule
     * @param {[Object]} ruleList 
     */

  }, {
    key: 'use',
    value: function use(ruleList) {
      for (var i = 0; i < ruleList.length; i++) {
        var item = ruleList[i];

        if (item.optional) this._optional[item.name] = true;
        if (item.tips) this._tips[item.name] = item.tips;
        this._rules[item.name] = item.rules;
      }
    }

    /**
     * check with preset ruleset
     * @param {any} value 
     * @param {String} name 
     */

  }, {
    key: 'check',
    value: function check(value, name) {
      if ((0, _lib.getType)(name) === 'String') {
        var errIdx = this._runRuleSet(name, value, this._rules[name]);
        return this._getResult(name, errIdx);
      }

      throw new TypeError('params: [' + name + '] should be String');
    }

    /**
     * check with different input field
     * @param {[any]|Object} values 
     * @param {[String]?} name 
     * @param {[RegExp]?} diffs 
     */

  }, {
    key: 'checkWithDiff',
    value: function checkWithDiff(values, names, diffs) {
      if ((0, _lib.getType)(values) === 'Object') {
        var name = values.name,
            value = values.value;

        var errIdx = this._runRuleSet(name, value, this._rules[name]);
        return this._getResult(name, errIdx);
      }

      if ((0, _lib.getType)(values) === 'Array' && diffs) {
        // 根据 diff 正则匹配校验规则
        var diffName = void 0;
        diffs.forEach(function (item, index) {
          if ((0, _lib.getType)(item) === 'RegExp' && item.test(values[0])) {
            diffName = names[index];
          }
        });
        var _errIdx = this._runRuleSet(diffName, values[1], this._rules[diffName]);
        return this._getResult(diffName, _errIdx);
      }

      throw new TypeError('If the first args is not an Object, then all args should be Array');
    }

    /**
     * use validator core to run a single test
     * @param {any} value 
     * @param {String} rule 
     */

  }, {
    key: 'test',
    value: function test(value, rule) {
      return this._runSingleRule(value, rule);
    }
  }]);

  return Validator;
}();

exports.default = Validator;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = runPresetRule;

var _index = __webpack_require__(0);

var _presetRules = __webpack_require__(3);

function runPresetRule(queryStr, value) {
  if (!queryStr) throw new Error('can not parse rule of undefined');

  var _queryStr$split = queryStr.split(':'),
      _queryStr$split2 = _slicedToArray(_queryStr$split, 2),
      ruleName = _queryStr$split2[0],
      params = _queryStr$split2[1];

  var rule = _presetRules.presetRules[ruleName];
  if (!rule) throw new Error('does not has the rule ' + ruleName);

  if ((0, _index.getType)(rule) === 'RegExp') return rule.test(value);

  params = /(size|in|not_in)/.test(ruleName) ? params.split(/,|-|~/) : params;

  return rule(value, params);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.presetRules = undefined;

var _index = __webpack_require__(0);

var presetRules = exports.presetRules = {
  required: /^.{1,}$/,
  phone: /(^[1][34578][0-9]{9}$)/,
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/,
  url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  integer: /^-?\d+$/,
  id_card: /^(\d{18,18}|\d{15,15}|\d{17,17}(X|x))$/,
  // date
  after: function after(value, params) {
    return (0, _index.dateCompare)(value, params, 'after');
  },
  after_equal: function after_equal(value, params) {
    return (0, _index.dateCompare)(value, params, 'after_equal');
  },
  before: function before(value, params) {
    return (0, _index.dateCompare)(value, params, 'before');
  },
  before_equal: function before_equal(value, params) {
    return (0, _index.dateCompare)(value, params, 'before_equal');
  },
  // string
  size: function size(value, params) {
    if ((0, _index.getType)(value) !== 'String') return false;

    if (params.length === 1) params.unshift(0);

    var len = value.length;
    return len <= params[1] && len >= params[0];
  },
  // number
  gt: function gt(value, params) {
    return (0, _index.numCompare)(value, params, 'gt');
  },
  gte: function gte(value, params) {
    return (0, _index.numCompare)(value, params, 'gte');
  },
  lt: function lt(value, params) {
    return (0, _index.numCompare)(value, params, 'lt');
  },
  lte: function lte(value, params) {
    return (0, _index.numCompare)(value, params, 'lte');
  },
  equal: function equal(value, params) {
    return (0, _index.numCompare)(value, params, 'equal');
  },

  in: function _in(value, params) {
    return (0, _index.isContain)(value, params, 'in');
  },
  not_in: function not_in(value, params) {
    return (0, _index.isContain)(value, params, 'not_in');
  }
};

/***/ })
/******/ ]);
});