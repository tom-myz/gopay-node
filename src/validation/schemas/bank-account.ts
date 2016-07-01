export const bankAccountCreateSchema = {
    holderName    : "required",
    bankName      : "required",
    branchName    : "string",
    currency      : "required|min:3",
    accountNumber : "required",
    routingNumber : "",
    swiftCode     : "",
    ifscCode      : "",
    routingCode   : ""
}

export const bankAccountUpdateSchema = {
    isPrimary     : "boolean",
    holderName    : "",
    bankName      : "",
    branchName    : "",
    currency      : "min:3",
    accountNumber : "",
    routingNumber : "",
    swiftCode     : "",
    ifscCode      : "",
    routingCode   : ""
}
