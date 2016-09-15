"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resource_1 = require("./Resource");

var Merchants = function (_Resource_1$Resource) {
    (0, _inherits3.default)(Merchants, _Resource_1$Resource);

    function Merchants() {
        (0, _classCallCheck3.default)(this, Merchants);
        return (0, _possibleConstructorReturn3.default)(this, _Resource_1$Resource.apply(this, arguments));
    }

    Merchants.prototype.me = function me(data, callback) {
        return this.defineRoute("GET", "/me")(data, callback);
    };

    return Merchants;
}(Resource_1.Resource);

exports.Merchants = Merchants;
//# sourceMappingURL=Merchants.js.map