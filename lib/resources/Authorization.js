"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WithAPI_1 = require("../api/WithAPI");
var Validation_1 = require("../validation/Validation");
var Validator_1 = require("../validation/validators/Validator");
var Errors_1 = require("../errors/Errors");
var Authorization = (function (_super) {
    __extends(Authorization, _super);
    function Authorization() {
        _super.apply(this, arguments);
        this.validation = {
            email: [new Validator_1.default.Required(), new Validator_1.default.Email()],
            password: [new Validator_1.default.Required()]
        };
    }
    Authorization.prototype.authorize = function (credentials) {
        var _this = this;
        var validationErrors = Validation_1.Validation.validate(credentials, this.validation);
        if (validationErrors.length !== 0) {
            return Promise.reject(Errors_1.VALIDATION_ERROR(validationErrors));
        }
        return this.api.send({
            body: credentials,
            method: "POST",
            url: "/authenticate"
        }).then(function (response) {
            _this.api.token = response.token;
            return Promise.resolve(response.token);
        });
    };
    return Authorization;
}(WithAPI_1.WithAPI));
exports.Authorization = Authorization;
//# sourceMappingURL=Authorization.js.map