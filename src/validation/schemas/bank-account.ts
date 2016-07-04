export const bankAccountCreateSchema = {
    holderName    : "required",
    bankName      : "required",
    branchName    : "string",
    currency      : "required|min:3",
    accountNumber : "required",
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
    currency      : "min:3",
    accountNumber : "string",
    routingNumber : "string",
    swiftCode     : "string",
    ifscCode      : "string",
    routingCode   : "string"
}
