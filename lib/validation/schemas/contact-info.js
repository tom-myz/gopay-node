"use strict";

function getContactInfoSchema() {
    var _ref;

    var prefix = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

    return _ref = {}, _ref[prefix + "name"] = "string", _ref[prefix + "companyName"] = "string", _ref[prefix + "phoneNumber"] = "string", _ref[prefix + "line1"] = "string", _ref[prefix + "line2"] = "string", _ref[prefix + "state"] = "string", _ref[prefix + "city"] = "string", _ref[prefix + "country"] = "string", _ref[prefix + "zip"] = "string", _ref;
}
exports.getContactInfoSchema = getContactInfoSchema;
//# sourceMappingURL=contact-info.js.map
