"use strict";
const CRUDResource_1 = require("./CRUDResource");
const ledger_1 = require("../validation/schemas/ledger");
class Ledger extends CRUDResource_1.CRUDResource {
    list(callback, data, merchantId, storeId, token) {
        const params = { merchantId: merchantId, storeId: storeId };
        return this._listRoute(params, data, callback, { token: token });
    }
    update(id, data, callback, merchantId, storeId, token) {
        const params = { id: id, merchantId: merchantId, storeId: storeId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: ledger_1.ledgerUpdateSchema });
    }
}
Ledger.routeBase = "/(merchants/:merchantId/)(stores/:storeId/)ledgers";
exports.Ledger = Ledger;
//# sourceMappingURL=Ledger.js.map