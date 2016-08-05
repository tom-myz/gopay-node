"use strict";
const CRUDResource_1 = require("./CRUDResource");
const credentials_1 = require("../validation/schemas/credentials");
class Credentials extends CRUDResource_1.CRUDResource {
    list(callback, data, merchantId, token) {
        const params = { merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    }
    create(data, callback, merchantId, token) {
        const params = { merchantId: merchantId };
        return this._createRoute(params, data, callback, { token: token, validationSchema: credentials_1.credentialsCreateSchema(data.gateway) });
    }
    get(id, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    }
    update(id, data, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: credentials_1.credentialsUpdateSchema(data.gateway) });
    }
    delete(id, callback, merchantId, token) {
        const params = { id: id, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    }
}
Credentials.routeBase = "/(merchants/:merchantId/)credentials";
exports.Credentials = Credentials;
//# sourceMappingURL=Credentials.js.map