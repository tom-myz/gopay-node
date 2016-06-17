export const chargeCreateSchema = {
    token    : "required|string",
    amount   : "required|numeric",
    currency : "required|string",
    metadata : "object"
}

