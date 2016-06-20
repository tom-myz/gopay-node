export const bankAccountCreateSchema = {
    holderName    : "required|string",
    bankName      : "required|string",
    branchName    : "string",
    currency      : "required|string|min:3",
    accountNumber : "required|string",
    routingNumber : "string",
    swiftCode     : "string",
    ifscCode      : "string",
    routingCode   : "string"
}

export const bankAccountUpdateSchema = {
    isPrimary     : "boolean",
    holderName    : "string",
    bankName      : "string",
    branchName    : "string",
    currency      : "string|min:3",
    accountNumber : "string",
    routingNumber : "string",
    swiftCode     : "string",
    ifscCode      : "string",
    routingCode   : "string"
}
