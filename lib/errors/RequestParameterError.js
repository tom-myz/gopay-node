"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtendableError = require("es6-error");

var RequestParameterError = function (_ExtendableError) {
    (0, _inherits3.default)(RequestParameterError, _ExtendableError);

    function RequestParameterError(parameter) {
        (0, _classCallCheck3.default)(this, RequestParameterError);

        var _this = (0, _possibleConstructorReturn3.default)(this, _ExtendableError.call(this, "GPay: Required parameter '" + parameter + "' is not defined."));

        _this.parameter = parameter;
        return _this;
    }

    return RequestParameterError;
}(ExtendableError);

exports.RequestParameterError = RequestParameterError;
//# sourceMappingURL=RequestParameterError.js.map