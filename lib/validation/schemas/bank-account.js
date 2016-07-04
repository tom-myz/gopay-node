"use strict";
exports.bankAccountCreateSchema = {
    holderName: "required",
    bankName: "required",
    branchName: "string",
    currency: "required|min:3",
    accountNumber: "required",
    routingNumber: "string",
    swiftCode: "string",
    ifscCode: "string",
    routingCode: "string"
};
exports.bankAccountUpdateSchema = {
    isPrimary: "boolean",
    holderName: "string",
    bankName: "string",
    branchName: "string",
    currency: "min:3",
    accountNumber: "string",
    routingNumber: "string",
    swiftCode: "string",
    ifscCode: "string",
    routingCode: "string"
};
//# sourceMappingURL=bank-account.js.map