export const webHookCreateSchema = {
    triggers : "required|array",
    url      : "required|url"
}

export const webHookUpdateSchema = {
    triggers : "array",
    url      : "url"
}
