"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var Balance = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(Balance, _CRUDResource_1$CRUDR);

    function Balance() {
        (0, _classCallCheck3.default)(this, Balance);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Balance.prototype.get = function get(storeId, data, callback) {
        return this._listRoute()(data, callback, ["storeId"], storeId);
    };

    return Balance;
}(CRUDResource_1.CRUDResource);

Balance.routeBase = "(/stores/:storeId)/balance";
exports.Balance = Balance;
//# sourceMappingURL=Balance.js.map