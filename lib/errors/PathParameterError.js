"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtendableError = require("es6-error");

var PathParameterError = function (_ExtendableError) {
    (0, _inherits3.default)(PathParameterError, _ExtendableError);

    function PathParameterError(parameter) {
        (0, _classCallCheck3.default)(this, PathParameterError);

        var _this = (0, _possibleConstructorReturn3.default)(this, _ExtendableError.call(this, "GPay: Required url parameter '" + parameter + "' is not defined."));

        _this.parameter = parameter;
        return _this;
    }

    return PathParameterError;
}(ExtendableError);

exports.PathParameterError = PathParameterError;
//# sourceMappingURL=PathParameterError.js.map