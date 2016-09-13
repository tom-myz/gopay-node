"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var refund_1 = require("../validation/schemas/refund");

var Refunds = function (_CRUDResource_1$CRUDR) {
    _inherits(Refunds, _CRUDResource_1$CRUDR);

    function Refunds() {
        _classCallCheck(this, Refunds);

        return _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Refunds.prototype.list = function list(chargeId, storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId, chargeId: chargeId };
        return this._listRoute(params, data, callback, { token: token });
    };

    Refunds.prototype.create = function create(chargeId, storeId, data, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId, chargeId: chargeId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: refund_1.refundCreateSchema });
    };

    Refunds.prototype.get = function get(chargeId, storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId, chargeId: chargeId };
        return this._getRoute(params, null, callback, { token: token });
    };

    return Refunds;
}(CRUDResource_1.CRUDResource);

Refunds.routeBase = "/(merchants/:merchantId/)stores/:storeId/charges/:chargeId/refunds";
exports.Refunds = Refunds;
//# sourceMappingURL=Refunds.js.map