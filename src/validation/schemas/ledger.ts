export const ledgerUpdateSchema = {
    status : "string",
    note   : "string"
}

export const ledgerCreateForTransferSchema = {
    amount   : "required|number",
    currency : "required|string",
    note     : "string"
}

export const ledgerBalanceSchema = {
    currency : "string"
}