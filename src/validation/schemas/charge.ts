export const chargeCreateSchema = {
    token    : "required",
    amount   : "required|numeric",
    currency : "required|min:3",
    metadata : "object"
}

