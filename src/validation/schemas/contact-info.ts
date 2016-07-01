export function getContactInfoSchema (prefix: string = "") {
    return {
        [`${prefix}name`]        : "string",
        [`${prefix}companyName`] : "string",
        [`${prefix}phoneNumber`] : "string",
        [`${prefix}line1`]       : "string",
        [`${prefix}line2`]       : "string",
        [`${prefix}state`]       : "string",
        [`${prefix}city`]        : "string",
        [`${prefix}country`]     : "string",
        [`${prefix}zip`]         : "string"
    }
}
