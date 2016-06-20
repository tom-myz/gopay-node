export const chargeCreateSchema = {
    token    : "required|string",
    amount   : "required|numeric",
    currency : "required|string|min:3",
    metadata : "object"
}

