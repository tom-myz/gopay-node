"use strict";
function isEmpty(input) {
    if ([undefined, null, ""].indexOf(input) !== -1) {
        return true;
    }
    else if (typeof input === "object" && Object.getOwnPropertyNames(input).length === 0) {
        return true;
    }
    else if (Array.isArray(input) && input.length === 0) {
        return true;
    }
    return false;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty.js.map