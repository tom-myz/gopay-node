import SDK from "../lib/index"

const sdk = new SDK({
    appId: "HmGXTDsoDa0PR9nwW4tj",
    secret : "3ArFtX7EtySzUC50plJ8------",
    camel : true 
})

const paramsFormData: FormData = new FormData()
paramsFormData.append("email", "root_admin@univapay.com")
paramsFormData.append("password", "changeme")

//sdk.merchants.update("1", paramsFormData)
sdk.stores.list("1")

/*
sdk.authorization.authorize(paramsFormData)
    .then((result: any) => {
        console.warn(result)
        sdk.api.setToken(result.token)
    //    return Promise.resolve()
    })
    .then(() => {
        return sdk.merchants.create({
            name     : "aaaa",
            email    : "aaa",
            password : ""
        })
    })
    .catch((e: any) => console.error(e))
    */

/*
sdk.merchants.get("123", (err, result) => {
    console.warn("callback works!!!", err, result)
})
    .then((result) => console.warn("promise success works!", result))
    .catch((err) => console.warn("promise fail works!", err))
    */

/*
const path = "/(merchants/:merchantId/)stores(/:storeId)/test/:id"
const pathParams = {
    id: "33",
    //merchantId : "1",
    storeId : "1"
}

sdk.compilePath(path, pathParams)
*/

/*
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
    .catch((e: CommonError) => {
        console.error(e, e.getLocalised())
    })
*/
