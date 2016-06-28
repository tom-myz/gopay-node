export function getContactInfoSchema (prefix: string = "") {
    return {
        [`${prefix}phoneNumber`] : "",
        [`${prefix}line1`]       : "",
        [`${prefix}line2`]       : "",
        [`${prefix}state`]       : "",
        [`${prefix}city`]        : "",
        [`${prefix}country`]     : "",
        [`${prefix}zip`]         : ""
    }
}
