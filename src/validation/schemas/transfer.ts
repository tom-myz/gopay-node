export const transferCreateSchema = {
    from     : "date",
    to       : "required|date",
    metadata : "object"
}

export const transferUpdateSchema = {
    status : "string"
}

export const transferPendingMerchantsSchema = {
    from : "date",
    to   : "required|date"
}