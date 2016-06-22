"use strict";
const contact_info_1 = require("./contact-info");
const transactionTokenSchema = {
    type: "required|string"
};
function getTransactionTokenSchema(type) {
    switch (type) {
        case "card":
            return Object.assign({}, transactionTokenSchema, {
                "data.cardholder": "required|string",
                "data.cardNumber": "required|string",
                "data.expMonth": "required|numeric",
                "data.expYear": "required|numeric",
                "data.cvv": "required|min:3|max:4"
            }, contact_info_1.getContactInfoSchema("data.address."));
        default:
            return transactionTokenSchema;
    }
}
exports.getTransactionTokenSchema = getTransactionTokenSchema;
//# sourceMappingURL=transaction-token.js.map