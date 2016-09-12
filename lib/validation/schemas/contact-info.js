"use strict";

function getContactInfoSchema() {
    var _ref;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var required = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var requiredRule = required ? "required|" : "";
    return _ref = {}, _ref[prefix + "name"] = requiredRule + "string", _ref[prefix + "companyName"] = requiredRule + "string", _ref[prefix + "phoneNumber"] = requiredRule + "string", _ref[prefix + "line1"] = requiredRule + "string", _ref[prefix + "line2"] = "string", _ref[prefix + "state"] = requiredRule + "string", _ref[prefix + "city"] = requiredRule + "string", _ref[prefix + "country"] = requiredRule + "string", _ref[prefix + "zip"] = requiredRule + "string", _ref;
}
exports.getContactInfoSchema = getContactInfoSchema;
//# sourceMappingURL=contact-info.js.map