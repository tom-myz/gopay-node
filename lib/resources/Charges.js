"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var Charges = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(Charges, _CRUDResource_1$CRUDR);

    function Charges() {
        (0, _classCallCheck3.default)(this, Charges);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Charges.prototype.list = function list(storeId, data, callback) {
        return this._listRoute()(data, callback, ["storeId"], storeId);
    };

    Charges.prototype.create = function create(data, callback) {
        return this.defineRoute("POST", "/charges")(data, callback);
    };

    Charges.prototype.get = function get(storeId, id, data, callback) {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id);
    };

    Charges.prototype.poll = function poll(storeId, id, data, callback) {
        var _this2 = this;

        var promise = function promise() {
            return _this2._getRoute()(data, null, ["storeId", "id"], storeId, id);
        };
        return this.api.longPolling(promise, function (response) {
            return response.status !== "pending";
        }, callback);
    };

    return Charges;
}(CRUDResource_1.CRUDResource);

Charges.routeBase = "/stores/:storeId/charges";
exports.Charges = Charges;
//# sourceMappingURL=Charges.js.map