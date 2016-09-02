"use strict";
const CRUDResource_1 = require("./CRUDResource");
const transfer_1 = require("../validation/schemas/transfer");
class Transfers extends CRUDResource_1.CRUDResource {
    constructor(...args) {
        super(...args);
        this._finalizeTransfer = this.defineRoute("PATCH", "/merchants/:merchantId/transfers/:id/finalize");
        this._getTransfersPendingMerchants = this.defineRoute("GET", "/transfers_pending");
        this._getMerchantPendingTransfers = this.defineRoute("GET", "/merchants/:merchantId/transfers_pending");
    }
    list(callback, data, merchantId, token) {
        const params = { merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    }
    create(data, callback, merchantId, token) {
        const params = { merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: transfer_1.transferCreateSchema });
    }
    get(id, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    }
    update(id, data, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: transfer_1.transferUpdateSchema });
    }
    finalizeTransfer(id, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._finalizeTransfer(params, null, callback, { token: token });
    }
    getTransfersPendingMerchants(merchantId, callback, data, token) {
        const params = { merchantId: merchantId };
        return this._getTransfersPendingMerchants(params, data, callback, { token: token });
    }
    getMerchantPendingTransfers(merchantId, callback, data, token) {
        const params = { merchantId: merchantId };
        return this._getMerchantPendingTransfers(params, data, callback, { token: token, validationSchema: transfer_1.transferPendingMerchantsSchema });
    }
}
Transfers.routeBase = "/(merchants/:merchantId/)transfers";
exports.Transfers = Transfers;
//# sourceMappingURL=Transfers.js.map