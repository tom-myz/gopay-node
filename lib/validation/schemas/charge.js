"use strict";
exports.chargeCreateSchema = {
    token: "required|string",
    amount: "required|numeric",
    currency: "required|string|min:3",
    metadata: "object"
};
//# sourceMappingURL=charge.js.map