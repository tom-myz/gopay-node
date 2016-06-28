"use strict";
function getContactInfoSchema(prefix = "") {
    return {
        [`${prefix}phoneNumber`]: "",
        [`${prefix}line1`]: "",
        [`${prefix}line2`]: "",
        [`${prefix}state`]: "",
        [`${prefix}city`]: "",
        [`${prefix}country`]: "",
        [`${prefix}zip`]: ""
    };
}
exports.getContactInfoSchema = getContactInfoSchema;
//# sourceMappingURL=contact-info.js.map