"use strict";
const CRUDResource_1 = require("./CRUDResource");
const ledger_1 = require("../validation/schemas/ledger");
class Ledger extends CRUDResource_1.CRUDResource {
    list(callback, data, token) {
        return this._listRoute(null, data, callback, { token: token });
    }
    update(id, data, callback, token) {
        const params = { id: id };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: ledger_1.ledgerUpdateSchema });
    }
}
Ledger.routeBase = "/ledger";
exports.Ledger = Ledger;
//# sourceMappingURL=Ledger.js.map