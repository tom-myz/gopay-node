import SDK from "../src/index.ts"
import { PMerchant } from "../src/resources/merchants/Merchant"
import { PStore } from "../src/resources/stores/Store"
import { PTransactionToken } from "../src/resources/charges/TransactionToken"
import { PCharge } from "../src/resources/charges/Charge"

const sdk = new SDK({ camelCase : true })

sdk.authorization.authorize({ email: "test@test.com", password: "testtest" })
    .then(() => {
        return sdk.merchant.create({ data : { 
            email    : "demo8@test.com",
            password : "demotest"
        }})
    })
    .then((m: PMerchant) => {
        return sdk.store.create({ merchantId: m.id, data : {
            name : "demo store"
        }})
    })
    .then((s: PStore) => {
        return sdk.token.create({ data : {
            type : "card",
            storeId: s.id,
            data : {
                cardNumber : "4111111111111111",
                expMonth   : "12",
                expYear    : "2020",
                cvv        : "123"
            }
        }})
    })
    .then((t: PTransactionToken<any>) => {
        return sdk.charge.create({ data : {
            token    : t.token,
            amount   : 100,
            currency : "jpy"
        }})
    })
    .then((c: PCharge) => {
        console.info("Yay!!!", c)
    })
    .catch((e) => console.error(e))
