"use strict";

var configuration_1 = require("./configuration");
var contact_info_1 = require("./contact-info");
exports.merchantCreateSchema = Object.assign({
    name: "required",
    email: "required|email",
    password: "required|min:8|max:32",
    roles: "required|array"
}, configuration_1.getConfigurationSchema("configuration."));
exports.merchantUpdateSchema = Object.assign({
    name: "string",
    email: "email",
    roles: "array"
}, configuration_1.getConfigurationSchema("configuration."));
function merchantChangePasswordSchema(isAdmin) {
    return {
        oldPassword: "" + (!isAdmin ? "required|" : ""),
        newPassword: "required",
        confirmPassword: "required|same:newPassword"
    };
}
exports.merchantChangePasswordSchema = merchantChangePasswordSchema;
exports.merchantForgotPasswordSchema = {
    email: "required|email"
};
exports.merchantResetPasswordSchema = {
    newPassword: "required",
    confirmPassword: "required|same:newPassword"
};
exports.merchantCreateVerificationSchema = Object.assign({
    homepageUrl: "required|url",
    companyDescription: "required",
    businessType: "required",
    systemManagerName: "required",
    systemManagerNumber: "string",
    systemManagerEmail: "email"
}, contact_info_1.getContactInfoSchema("companyContactInfo.", true));
exports.merchantUpdateVerificationSchema = Object.assign({
    homepageUrl: "url",
    companyDescription: "string",
    businessType: "string",
    systemManagerName: "string",
    systemManagerNumber: "string",
    systemManagerEmail: "email"
}, contact_info_1.getContactInfoSchema("companyContactInfo."));
exports.merchantCreateVerifySchema = {
    percentFee: "required|numeric|min:0|max:1"
};
exports.merchantTransactionHistory = {
    from: "string",
    to: "string"
};
//# sourceMappingURL=merchant.js.map