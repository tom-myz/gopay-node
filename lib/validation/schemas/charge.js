"use strict";
exports.chargeCreateSchema = {
    token: "required",
    amount: "required|numeric",
    currency: "required|min:3",
    metadata: "object"
};
//# sourceMappingURL=charge.js.map