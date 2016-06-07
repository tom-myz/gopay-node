"use strict";
var Validator_1 = require("../../validation/validators/Validator");
exports.payvisionSchema = {
    merchantGuid: [new Validator_1.default.UUID()]
};
exports.worldpaySchema = {};
exports.gatewayCredentialsSchema = {
    payvision: exports.payvisionSchema,
    worldpay: exports.worldpaySchema
};
//# sourceMappingURL=GatewayCredentials.js.map