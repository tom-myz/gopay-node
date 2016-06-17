"use strict";
var configuration_1 = require("./configuration");
var contact_info_1 = require("./contact-info");
exports.merchantCreateSchema = Object.assign({
    email: "required|email",
    password: "required|string|between:8,32",
    roles: "array"
}, configuration_1.getConfigurationSchema("configuration."), contact_info_1.getContactInfoSchema("address."));
exports.merchantUpdateSchema = Object.assign({
    email: "email"
}, configuration_1.getConfigurationSchema("configuration."), contact_info_1.getContactInfoSchema("address."));
//# sourceMappingURL=merchant.js.map