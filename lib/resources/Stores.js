"use strict";
const CRUDResource_1 = require("./CRUDResource");
const store_1 = require("../validation/schemas/store");
class Stores extends CRUDResource_1.CRUDResource {
    list(callback, data, merchantId, token) {
        const params = { merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    }
    create(data, callback, merchantId, token) {
        const params = { merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: store_1.storeCreateSchema });
    }
    get(id, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    }
    update(id, data, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: store_1.storeUpdateSchema });
    }
    delete(id, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    }
}
Stores.routeBase = "/(merchants/:merchantId/)stores";
exports.Stores = Stores;
//# sourceMappingURL=Stores.js.map