import { getContactInfoSchema } from "./contact-info"

const transactionTokenSchema = {
    type : "required|string"
}

export function getTransactionTokenSchema (type?: string) {

    switch (type) {
        case "card" :
            return Object.assign({}, transactionTokenSchema, {
                "data.cardholder" : "required|string",
                "data.cardNumber" : "required|string",
                "data.expMonth"   : "required|string|size:2",
                "data.expYear"    : "required|string|between:2,4",
                "data.cvv"        : "required|string|between:3,4"
            }, getContactInfoSchema("data.address."))

        default :
            return transactionTokenSchema
    }

}
