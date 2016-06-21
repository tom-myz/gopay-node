"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var ledger_1 = require("../validation/schemas/ledger");
var Ledger = (function (_super) {
    __extends(Ledger, _super);
    function Ledger() {
        _super.apply(this, arguments);
    }
    Ledger.prototype.list = function (callback, data, token) {
        return this._listRoute(null, data, callback, { token: token });
    };
    Ledger.prototype.update = function (id, data, callback, token) {
        var params = { id: id };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: ledger_1.ledgerUpdateSchema });
    };
    Ledger.routeBase = "/ledger";
    return Ledger;
}(CRUDResource_1.CRUDResource));
exports.Ledger = Ledger;
//# sourceMappingURL=Ledger.js.map