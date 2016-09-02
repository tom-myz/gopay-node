"use strict";
const CRUDResource_1 = require("./CRUDResource");
const charge_1 = require("../validation/schemas/charge");
class Charges extends CRUDResource_1.CRUDResource {
    constructor(api) {
        super(api);
        this._createRoute = this.defineRoute("POST", "/charges");
    }
    list(storeId, callback, data, merchantId, token) {
        const params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    }
    create(data, callback, merchantId, token) {
        return this._createRoute(null, data, callback, { token: token, validationSchema: charge_1.chargeCreateSchema });
    }
    get(storeId, id, callback, merchantId, token) {
        const params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._getRoute(params, null, callback, { token: token });
    }
}
Charges.routeBase = "/(merchants/:merchantId/)stores/:storeId/charges";
exports.Charges = Charges;
//# sourceMappingURL=Charges.js.map