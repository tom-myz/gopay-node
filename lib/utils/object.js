"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformKeys(obj, transformer) {
    return Object.keys(obj || {}).reduce(function (r, k) {
        var c = function c(o) {
            return (typeof o === "undefined" ? "undefined" : (0, _typeof3.default)(o)) === "object" && Boolean(o);
        };
        var v = obj[k];
        if (c(v)) {
            if (Array.isArray(v)) {
                v = v.map(function (i) {
                    return c(i) ? transformKeys(i, transformer) : i;
                });
            } else {
                v = transformKeys(v, transformer);
            }
        }
        r[transformer(k)] = v;
        return r;
    }, {});
}
exports.transformKeys = transformKeys;
function missingKeys(obj) {
    var keys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    if (!obj) {
        return keys;
    }
    if (obj.constructor !== {}.constructor) {
        return [];
    }
    var objKeys = Object.keys(obj || {});
    var missing = [];
    for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var key = _ref;

        if (objKeys.indexOf(key) === -1 || obj[key] === undefined) {
            missing.push(key);
        }
    }
    return missing;
}
exports.missingKeys = missingKeys;
function partitionKeys(obj, condition) {
    var left = {};
    var right = {};
    Object.keys(obj || {}).forEach(function (k) {
        if (condition(k)) {
            left[k] = obj[k];
        } else {
            right[k] = obj[k];
        }
    });
    return [left, right];
}
exports.partitionKeys = partitionKeys;
//# sourceMappingURL=object.js.map