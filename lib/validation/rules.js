"use strict";
exports.ruleBoolean = [
    "boolean",
    function (val) {
        return typeof val === "boolean" || (typeof val === "number" && (val === 0 || val === 1));
    },
    "The :attribute is not of boolean type."
];
exports.ruleObject = [
    "object",
    function (val) {
        return typeof val === "object" && val !== null;
    },
    "The :attribute is not object."
];
exports.ruleUUID = [
    "uuid",
    function (val) {
        return val.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).length !== null;
    },
    "The :attribute is valid UUID."
];
//# sourceMappingURL=rules.js.map