"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
        cls.apply(this, arguments);
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

var PathParameterError = function (_extendableBuiltin2) {
    (0, _inherits3.default)(PathParameterError, _extendableBuiltin2);

    function PathParameterError(parameter) {
        (0, _classCallCheck3.default)(this, PathParameterError);

        var _this = (0, _possibleConstructorReturn3.default)(this, _extendableBuiltin2.call(this, "GPay: Required url parameter '" + parameter + "' is not defined."));

        _this.parameter = parameter;
        return _this;
    }

    return PathParameterError;
}(_extendableBuiltin(Error));

exports.PathParameterError = PathParameterError;
//# sourceMappingURL=PathParameterError.js.map