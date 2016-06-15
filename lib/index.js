"use strict";
var RestAPI_1 = require("./api/RestAPI");
var PaymentsSDK = (function () {
    function PaymentsSDK(options) {
        this.api = new RestAPI_1.RestAPI(options);
    }
    return PaymentsSDK;
}());
exports.PaymentsSDK = PaymentsSDK;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaymentsSDK;
//# sourceMappingURL=index.js.map