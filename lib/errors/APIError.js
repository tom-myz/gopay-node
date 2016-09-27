"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtendableError = require("es6-error");

var APIError = function (_ExtendableError) {
    (0, _inherits3.default)(APIError, _ExtendableError);

    function APIError(status, response, route) {
        (0, _classCallCheck3.default)(this, APIError);

        var _this = (0, _possibleConstructorReturn3.default)(this, _ExtendableError.call(this, "GPay: Route '" + route + "' returned error with '" + status + "' status."));

        _this.status = status;
        _this.response = Object.keys(response).length !== 0 ? response : null;
        return _this;
    }

    return APIError;
}(ExtendableError);

exports.APIError = APIError;
//# sourceMappingURL=APIError.js.map