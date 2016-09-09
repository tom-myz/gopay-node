"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var charge_1 = require("../validation/schemas/charge");

var Charges = function (_CRUDResource_1$CRUDR) {
    _inherits(Charges, _CRUDResource_1$CRUDR);

    function Charges(api) {
        _classCallCheck(this, Charges);

        var _this = _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.call(this, api));

        _this._createRoute = _this.defineRoute("POST", "/charges");
        return _this;
    }

    Charges.prototype.list = function list(storeId, callback, data, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };

    Charges.prototype.create = function create(data, callback, merchantId, token) {
        return this._createRoute(null, data, callback, { token: token, validationSchema: charge_1.chargeCreateSchema });
    };

    Charges.prototype.get = function get(storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };

    return Charges;
}(CRUDResource_1.CRUDResource);

Charges.routeBase = "/(merchants/:merchantId/)stores/:storeId/charges";
exports.Charges = Charges;
//# sourceMappingURL=Charges.js.map