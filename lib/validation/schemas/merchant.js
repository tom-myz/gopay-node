"use strict";
const configuration_1 = require("./configuration");
const contact_info_1 = require("./contact-info");
exports.merchantCreateSchema = Object.assign({
    name: "required",
    email: "required|email",
    password: "required|min:8|max:32",
    roles: "array"
}, configuration_1.getConfigurationSchema("configuration."), contact_info_1.getContactInfoSchema("address."));
exports.merchantUpdateSchema = Object.assign({
    name: "string",
    email: "email"
}, configuration_1.getConfigurationSchema("configuration."), contact_info_1.getContactInfoSchema("address."));
function merchantChangePasswordSchema(isAdmin) {
    return {
        oldPassword: `${!isAdmin ? "required|" : ""}`,
        newPassword: "required",
        confirmPassword: "required|same:newPassword"
    };
}
exports.merchantChangePasswordSchema = merchantChangePasswordSchema;
exports.merchantResetPasswordSchema = {
    email: "required|email"
};
//# sourceMappingURL=merchant.js.map