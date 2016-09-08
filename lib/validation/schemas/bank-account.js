"use strict";

exports.bankAccountCreateSchema = {
    holderName: "required",
    bankName: "required",
    branchName: "string",
    currency: "required|min:3",
    accountNumber: "required",
    routingNumber: "",
    swiftCode: "",
    ifscCode: "",
    routingCode: ""
};
exports.bankAccountUpdateSchema = {
    isPrimary: "boolean",
    holderName: "",
    bankName: "",
    branchName: "",
    currency: "min:3",
    accountNumber: "",
    routingNumber: "",
    swiftCode: "",
    ifscCode: "",
    routingCode: ""
};
//# sourceMappingURL=bank-account.js.map