"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var Refunds = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(Refunds, _CRUDResource_1$CRUDR);

    function Refunds() {
        (0, _classCallCheck3.default)(this, Refunds);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Refunds.prototype.list = function list(storeId, chargeId, data, callback) {
        return this._listRoute()(data, callback, ["storeId", "chargeId"], storeId, chargeId);
    };

    Refunds.prototype.create = function create(storeId, chargeId, data, callback) {
        return this._createRoute(Refunds.requiredParams)(data, callback, ["storeId", "chargeId"], storeId, chargeId);
    };

    Refunds.prototype.get = function get(storeId, chargeId, id, data, callback) {
        return this._getRoute()(data, callback, ["storeId", "chargeId", "id"], storeId, chargeId, id);
    };

    return Refunds;
}(CRUDResource_1.CRUDResource);

Refunds.requiredParams = ["amount", "currency"];
Refunds.routeBase = "/stores/:storeId/charges/:chargeId/refunds";
exports.Refunds = Refunds;
//# sourceMappingURL=Refunds.js.map