"use strict";
var contact_info_1 = require("./contact-info");
var transactionTokenSchema = {
    type: "required|string"
};
function getTransactionTokenSchema(type) {
    switch (type) {
        case "card":
            return Object.assign({}, transactionTokenSchema, {
                "data.cardholder": "required|string",
                "data.cardNumber": "required|string",
                "data.expMonth": "required|string|size:2",
                "data.expYear": "required|string|between:2,4",
                "data.cvv": "required|string|between:3,4"
            }, contact_info_1.getContactInfoSchema("data.address."));
        default:
            return transactionTokenSchema;
    }
}
exports.getTransactionTokenSchema = getTransactionTokenSchema;
//# sourceMappingURL=transaction-token.js.map