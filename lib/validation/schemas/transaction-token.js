"use strict";

var contact_info_1 = require("./contact-info");
var transactionTokenSchema = {
    type: "required|string"
};
function getTransactionTokenSchema(type) {
    switch (type) {
        case "card":
            return Object.assign({}, transactionTokenSchema, {
                "data.cardholder": "required",
                "data.cardNumber": "required",
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