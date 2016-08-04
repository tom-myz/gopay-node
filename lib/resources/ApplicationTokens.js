"use strict";
const CRUDResource_1 = require("./CRUDResource");
const application_token_1 = require("../validation/schemas/application-token");
class ApplicationTokens extends CRUDResource_1.CRUDResource {
    list(storeId, callback, data, merchantId, token) {
        const params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    }
    create(storeId, data, callback, merchantId, token) {
        const params = { storeId: storeId, merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: application_token_1.applicationTokenCreateSchema });
    }
    update(storeId, id, data, callback, merchantId, token) {
        const params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: application_token_1.applicationTokenUpdateSchema });
    }
    delete(storeId, id, callback, merchantId, token) {
        const params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    }
}
ApplicationTokens.routeBase = "/(merchants/:merchantId/)stores/:storeId/app_tokens";
exports.ApplicationTokens = ApplicationTokens;
//# sourceMappingURL=ApplicationTokens.js.map