"use strict";
const CRUDResource_1 = require("./CRUDResource");
const webhook_1 = require("../validation/schemas/webhook");
class WebHooks extends CRUDResource_1.CRUDResource {
    list(storeId, data, callback, merchantId, token) {
        const params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    }
    create(storeId, data, callback, merchantId, token) {
        const params = { storeId: storeId, merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: webhook_1.webHookCreateSchema });
    }
    get(storeId, id, callback, merchantId, token) {
        const params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    }
    update(storeId, id, data, callback, merchantId, token) {
        const params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: webhook_1.webHookUpdateSchema });
    }
    delete(storeId, id, callback, merchantId, token) {
        const params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    }
}
WebHooks.routeBase = "/(merchants/:merchantId/)stores/:storeId/webhooks";
exports.WebHooks = WebHooks;
//# sourceMappingURL=WebHooks.js.map