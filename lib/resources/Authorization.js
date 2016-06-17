"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CRUDResource_1 = require("./CRUDResource");
var authorization_1 = require("../validation/schemas/authorization");
var Authorization = (function (_super) {
    __extends(Authorization, _super);
    function Authorization() {
        _super.apply(this, arguments);
        this._authorizeRoute = this.defineRoute("POST", "/authenticate");
    }
    Authorization.prototype.authorize = function (data, callback) {
        return this._authorizeRoute(null, data, callback, { validationSchema: authorization_1.authorizeSchema });
    };
    return Authorization;
}(CRUDResource_1.CRUDResource));
exports.Authorization = Authorization;
//# sourceMappingURL=Authorization.js.map