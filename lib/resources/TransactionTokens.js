"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var transaction_token_1 = require("../validation/schemas/transaction-token");
var TransactionTokens = (function (_super) {
    __extends(TransactionTokens, _super);
    function TransactionTokens() {
        _super.apply(this, arguments);
    }
    TransactionTokens.prototype.create = function (data, callback, token) {
        var validationSchema = transaction_token_1.getTransactionTokenSchema(data.type);
        return this._createRoute(null, data, callback, { token: token, validationSchema: validationSchema });
    };
    TransactionTokens.prototype.get = function (id, callback, token) {
        var params = { id: id };
        return this._getRoute(params, null, callback, { token: token });
    };
    TransactionTokens.prototype.delete = function (id, callback, token) {
        var params = { id: id };
        return this._updateRoute(params, null, callback, { token: token });
    };
    TransactionTokens.routeBase = "/tokens";
    return TransactionTokens;
}(CRUDResource_1.CRUDResource));
exports.TransactionTokens = TransactionTokens;
//# sourceMappingURL=TransactionTokens.js.map