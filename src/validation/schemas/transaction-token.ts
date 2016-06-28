import { getContactInfoSchema } from "./contact-info"

const transactionTokenSchema = {
    type : "required|string"
}

export function getTransactionTokenSchema (type?: string) {

    switch (type) {
        case "card" :
            return Object.assign({}, transactionTokenSchema, {
                "data.cardholder" : "required",
                "data.cardNumber" : "required",
                "data.expMonth"   : "required|numeric",
                "data.expYear"    : "required|numeric",
                "data.cvv"        : "required|min:3|max:4"
            }, getContactInfoSchema("data.address."))

        default :
            return transactionTokenSchema
    }

}
