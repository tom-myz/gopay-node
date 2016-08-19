"use strict";
const CRUDResource_1 = require("./CRUDResource");
const ledger_1 = require("../validation/schemas/ledger");
class Ledgers extends CRUDResource_1.CRUDResource {
    constructor(...args) {
        super(...args);
        this._createLedgerForTransfer = this.defineRoute("POST", "/merchants/:merchantId/transfers/:transferId/ledgers");
        this._getBalance = this.defineRoute("GET", "/merchants/:id/(stores/:storeId/)balance");
    }
    list(callback, data, merchantId, storeId, token) {
        const params = { merchantId: merchantId, storeId: storeId };
        return this._listRoute(params, data, callback, { token: token });
    }
    update(id, data, callback, merchantId, storeId, token) {
        const params = { id: id, merchantId: merchantId, storeId: storeId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: ledger_1.ledgerUpdateSchema });
    }
    createLedgerForTransfer(data, callback, merchantId, transferId, token) {
        return this._createLedgerForTransfer({ merchantId: merchantId, transferId: transferId }, data, callback, { token: token, validationSchema: ledger_1.ledgerCreateForTransferSchema });
    }
    getBalance(callback, data, id, storeId, token) {
        return this._getBalance({ id: id, storeId: storeId }, data, callback, { token: token });
    }
}
Ledgers.routeBase = "/(merchants/:merchantId/)(stores/:storeId/)ledgers";
exports.Ledgers = Ledgers;
//# sourceMappingURL=Ledgers.js.map