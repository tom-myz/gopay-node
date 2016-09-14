"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function transformKeys(obj, transformer) {
    return Object.keys(obj || {}).reduce(function (r, k) {
        var c = function c(o) {
            return (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && Boolean(o);
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
function hasAllKeys(obj) {
    var keys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    var objKeys = Object.keys(obj || {});
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

        if (objKeys.indexOf(key) === -1) {
            return false;
        }
    }
    return true;
}
exports.hasAllKeys = hasAllKeys;
function missingKeys(obj) {
    var keys = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    var objKeys = Object.keys(obj || {});
    var missing = [];
    for (var _iterator2 = keys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var key = _ref2;

        if (objKeys.indexOf(key) === -1) {
            missing.push(key);
        }
    }
    return missing;
}
exports.missingKeys = missingKeys;
//# sourceMappingURL=object.js.map