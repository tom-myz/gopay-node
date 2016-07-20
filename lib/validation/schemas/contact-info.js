"use strict";
function getContactInfoSchema(prefix = "", required = false) {
    const requiredRule = required ? "required." : "";
    return {
        [`${prefix}name`]: `${requiredRule}string`,
        [`${prefix}companyName`]: `${requiredRule}string`,
        [`${prefix}phoneNumber`]: `${requiredRule}string`,
        [`${prefix}line1`]: `${requiredRule}string`,
        [`${prefix}line2`]: "string",
        [`${prefix}state`]: `${requiredRule}string`,
        [`${prefix}city`]: `${requiredRule}string`,
        [`${prefix}country`]: `${requiredRule}string`,
        [`${prefix}zip`]: `${requiredRule}string`
    };
}
exports.getContactInfoSchema = getContactInfoSchema;
//# sourceMappingURL=contact-info.js.map