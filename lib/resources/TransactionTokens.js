"use strict";
const CRUDResource_1 = require("./CRUDResource");
const transaction_token_1 = require("../validation/schemas/transaction-token");
class TransactionTokens extends CRUDResource_1.CRUDResource {
    create(data, callback) {
        const validationSchema = transaction_token_1.getTransactionTokenSchema(data.type);
        return this._createRoute(null, data, callback, { validationSchema: validationSchema });
    }
    get(id, callback, token) {
        const params = { id: id };
        return this._getRoute(params, null, callback, { token: token });
    }
    delete(id, callback, token) {
        const params = { id: id };
        return this._deleteRoute(params, null, callback, { token: token });
    }
}
TransactionTokens.routeBase = "/tokens";
exports.TransactionTokens = TransactionTokens;
//# sourceMappingURL=TransactionTokens.js.map