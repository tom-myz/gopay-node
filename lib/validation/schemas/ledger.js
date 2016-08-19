"use strict";
exports.ledgerUpdateSchema = {
    status: "string",
    note: "string"
};
exports.ledgerCreateForTransferSchema = {
    amount: "required|number",
    currency: "required|string",
    note: "string"
};
exports.ledgerBalanceSchema = {
    currency: "string"
};
//# sourceMappingURL=ledger.js.map