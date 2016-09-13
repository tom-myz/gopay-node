export const refundCreateSchema = {
    amount   : "required|numeric",
    currency : "required|min:3",
    reason   : "string",
    message  : "string",
    metadata : "object"
}
