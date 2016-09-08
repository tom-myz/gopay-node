"use strict";
exports.ledgerUpdateSchema = {
    note: "string"
};
exports.ledgerCreateForTransferSchema = {
    amount: "required|numeric",
    currency: "required|min:3",
    note: "string"
};
exports.ledgerBalanceSchema = {
    currency: "string"
};
//# sourceMappingURL=ledger.js.map