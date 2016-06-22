"use strict";
const CRUDResource_1 = require("./CRUDResource");
class ApplicationTokens extends CRUDResource_1.CRUDResource {
    list(storeId, callback, data, merchantId, token) {
        const params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    }
    create(storeId, callback, merchantId, token) {
        const params = { storeId: storeId, merchantId: merchantId };
        return this._createRoute(params, null, callback, { token: token });
    }
    delete(storeId, id, callback, merchantId, token) {
        const params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    }
}
ApplicationTokens.routeBase = "/(merchants/:merchantId/)stores/:storeId/app_tokens";
exports.ApplicationTokens = ApplicationTokens;
//# sourceMappingURL=ApplicationTokens.js.map