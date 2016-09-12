"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.ruleBoolean = ["boolean", function (val) {
    return typeof val === "boolean" || typeof val === "number" && (val === 0 || val === 1);
}, "The :attribute is not of boolean type."];
exports.ruleObject = ["object", function (val) {
    return (typeof val === "undefined" ? "undefined" : _typeof(val)) === "object" && val !== null;
}, "The :attribute is not object."];
exports.ruleUUID = ["uuid", function (val) {
    return (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val)
    );
}, "The :attribute is valid UUID."];
exports.ruleDate = ["date", function (val) {
    return new Date(val).toString() !== "Invalid Date";
}, "The :attribute is not valid date format."];
//# sourceMappingURL=rules.js.map