"use strict";

exports.refundCreateSchema = {
    amount: "required|numeric",
    currency: "required|min:3",
    reason: "string",
    message: "string",
    metadata: "object"
};
//# sourceMappingURL=refund.js.map