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

var APIError = function (_extendableBuiltin2) {
    (0, _inherits3.default)(APIError, _extendableBuiltin2);

    function APIError(status, response, route) {
        (0, _classCallCheck3.default)(this, APIError);

        var _this = (0, _possibleConstructorReturn3.default)(this, _extendableBuiltin2.call(this, "GPay: Route '" + route + "' returned error with '" + status + "' status."));

        _this.status = status;
        _this.response = Object.keys(response).length !== 0 ? response : null;
        return _this;
    }

    return APIError;
}(_extendableBuiltin(Error));

exports.APIError = APIError;
//# sourceMappingURL=APIError.js.map