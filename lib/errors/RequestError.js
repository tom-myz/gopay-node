"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CommonError_1 = require("./CommonError");
var RequestError = (function (_super) {
    __extends(RequestError, _super);
    function RequestError(code) {
        _super.call(this);
        this.code = code;
    }
    return RequestError;
}(CommonError_1.CommonError));
exports.RequestError = RequestError;
//# sourceMappingURL=RequestError.js.map