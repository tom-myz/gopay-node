"use strict";
function getContactInfoSchema(prefix) {
    if (prefix === void 0) { prefix = ""; }
    return (_a = {},
        _a[prefix + "phoneNumber"] = "string",
        _a[prefix + "line1"] = "string",
        _a[prefix + "line2"] = "string",
        _a[prefix + "state"] = "string",
        _a[prefix + "city"] = "string",
        _a[prefix + "country"] = "string",
        _a[prefix + "zip"] = "string",
        _a
    );
    var _a;
}
exports.getContactInfoSchema = getContactInfoSchema;
//# sourceMappingURL=contact-info.js.map