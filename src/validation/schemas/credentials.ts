export function credentialsCreateSchema(gateway: string) {
    return Object.assign({
        gateway     : "required",
        currencies  : "required|array",
        credentials : "object"
    })
}

export function credentialsUpdateSchema(gateway: string) {
    return Object.assign({
        gateway     : "string",
        currencies  : "array",
        credentials : "object"
    })
}
