"use strict";
const configuration_1 = require("./configuration");
const contact_info_1 = require("./contact-info");
exports.merchantCreateSchema = Object.assign({
    email: "required|email",
    password: "required|string|between:8,32",
    roles: "array"
}, configuration_1.getConfigurationSchema("configuration."), contact_info_1.getContactInfoSchema("address."));
exports.merchantUpdateSchema = Object.assign({
    email: "email"
}, configuration_1.getConfigurationSchema("configuration."), contact_info_1.getContactInfoSchema("address."));
function merchantChangePasswordSchema(isAdmin) {
    return {
        oldPassword: `${!isAdmin ? "required|" : ""}string`,
        newPassword: "required|string",
        confirmPassword: "required|string|same:newPassword"
    };
}
exports.merchantChangePasswordSchema = merchantChangePasswordSchema;
exports.merchantResetPasswordSchema = {
    email: "required|email"
};
//# sourceMappingURL=merchant.js.map