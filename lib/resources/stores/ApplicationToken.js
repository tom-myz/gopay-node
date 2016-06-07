"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RestAPI_1 = require("../../api/RestAPI");
var StoreCRUDResource_1 = require("../StoreCRUDResource");
var Errors_1 = require("../../errors/Errors");
var ApplicationToken = (function (_super) {
    __extends(ApplicationToken, _super);
    function ApplicationToken() {
        _super.apply(this, arguments);
        this.single = false;
        this.urlSegment = "app_tokens";
        this.accessType = RestAPI_1.ResourceAccessType.Token;
    }
    ApplicationToken.prototype.read = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    ApplicationToken.prototype.update = function (params) {
        return Promise.reject(Errors_1.ACTION_NOT_PERMITTED);
    };
    return ApplicationToken;
}(StoreCRUDResource_1.StoreCRUDResource));
exports.ApplicationToken = ApplicationToken;
//# sourceMappingURL=ApplicationToken.js.map