"use strict";
var RequestError_1 = require("./RequestError");
var ValidationError_1 = require("./ValidationError");
exports.ACTION_NOT_PERMITTED = new RequestError_1.RequestError("ACTION_NOT_PERMITTED");
function VALIDATION_ERROR(errors) {
    return new ValidationError_1.ValidationError(errors);
}
exports.VALIDATION_ERROR = VALIDATION_ERROR;
//# sourceMappingURL=Errors.js.map