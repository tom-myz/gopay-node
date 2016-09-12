"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var ledger_1 = require("../validation/schemas/ledger");

var Ledgers = function (_CRUDResource_1$CRUDR) {
    _inherits(Ledgers, _CRUDResource_1$CRUDR);

    function Ledgers() {
        _classCallCheck(this, Ledgers);

        var _this = _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));

        _this._createLedgerForTransfer = _this.defineRoute("POST", "/merchants/:merchantId/transfers/:transferId/ledgers");
        _this._getBalance = _this.defineRoute("GET", "/merchants/:id/(stores/:storeId/)balance");
        _this._getForTransfer = _this.defineRoute("GET", "/(merchants/:merchantId/)transfers/:transferId/ledgers");
        return _this;
    }

    Ledgers.prototype.list = function list(callback, data, merchantId, storeId, token) {
        var params = { merchantId: merchantId, storeId: storeId };
        return this._listRoute(params, data, callback, { token: token });
    };

    Ledgers.prototype.get = function get(id, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    };

    Ledgers.prototype.update = function update(id, data, callback, merchantId, token) {
        var params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: ledger_1.ledgerUpdateSchema });
    };

    Ledgers.prototype.createLedgerForTransfer = function createLedgerForTransfer(data, callback, merchantId, transferId, token) {
        var params = { merchantId: merchantId, transferId: transferId };
        return this._createLedgerForTransfer(params, data, callback, { token: token, validationSchema: ledger_1.ledgerCreateForTransferSchema });
    };

    Ledgers.prototype.getForTransfer = function getForTransfer(callback, data, merchantId, transferId, token) {
        var params = { merchantId: merchantId, transferId: transferId };
        return this._getForTransfer(params, data, callback, { token: token });
    };

    Ledgers.prototype.getBalance = function getBalance(callback, data, id, storeId, token) {
        return this._getBalance({ id: id, storeId: storeId }, data, callback, { token: token, validationSchema: ledger_1.ledgerBalanceSchema });
    };

    return Ledgers;
}(CRUDResource_1.CRUDResource);

Ledgers.routeBase = "/(merchants/:merchantId/)(stores/:storeId/)ledgers";
exports.Ledgers = Ledgers;
//# sourceMappingURL=Ledgers.js.map