export const ledgerUpdateSchema = {
    note : "string"
}

export const ledgerCreateForTransferSchema = {
    amount   : "required|numeric",
    currency : "required|min:3",
    note     : "string"
}

export const ledgerBalanceSchema = {
    currency : "string"
}