"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var Subscriptions = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(Subscriptions, _CRUDResource_1$CRUDR);

    function Subscriptions() {
        (0, _classCallCheck3.default)(this, Subscriptions);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Subscriptions.prototype.list = function list(storeId, data, callback) {
        return this._listRoute()(data, callback, ["storeId"], storeId);
    };

    Subscriptions.prototype.create = function create(data, callback) {
        return this.defineRoute("POST", "/subscriptions", Subscriptions.requiredParams)(data, callback);
    };

    Subscriptions.prototype.get = function get(storeId, id, data, callback) {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id);
    };

    return Subscriptions;
}(CRUDResource_1.CRUDResource);

Subscriptions.requiredParams = ["token", "amount", "currency", "period"];
Subscriptions.routeBase = "/stores/:storeId/subscriptions";
exports.Subscriptions = Subscriptions;
//# sourceMappingURL=Subscriptions.js.map