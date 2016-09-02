"use strict";
const CRUDResource_1 = require("./CRUDResource");
const authorization_1 = require("../validation/schemas/authorization");
class Authorization extends CRUDResource_1.CRUDResource {
    constructor(...args) {
        super(...args);
        this._authorizeRoute = this.defineRoute("POST", "/authenticate");
    }
    authorize(data, callback) {
        return this._authorizeRoute(null, data, callback, { validationSchema: authorization_1.authorizeSchema });
    }
}
exports.Authorization = Authorization;
//# sourceMappingURL=Authorization.js.map