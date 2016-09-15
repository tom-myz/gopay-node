"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resource_1 = require("./Resource");

var CheckoutInfo = function (_Resource_1$Resource) {
    (0, _inherits3.default)(CheckoutInfo, _Resource_1$Resource);

    function CheckoutInfo() {
        (0, _classCallCheck3.default)(this, CheckoutInfo);
        return (0, _possibleConstructorReturn3.default)(this, _Resource_1$Resource.apply(this, arguments));
    }

    CheckoutInfo.prototype.get = function get(data, callback) {
        return this.defineRoute("GET", "/checkout_info")(data, callback);
    };

    return CheckoutInfo;
}(Resource_1.Resource);

exports.CheckoutInfo = CheckoutInfo;
//# sourceMappingURL=CheckoutInfo.js.map