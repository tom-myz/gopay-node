import SDK from "../src/index.ts"
/*
const merchant = new MerchantModel({
    id: "4fbaaffc-c270-410e-8997-e40261192380"
})
*/


const sdk = new SDK({ camelCase : true })

console.warn(sdk)

sdk.authorization.authorize({ email: "test10@test.com", password: "testtest"})
    .then(() => sdk.merchant.read("4fbaaffc-c270-410e-8997-e40261192380"))
    .then((m) => console.warn(m))
    .then(() => sdk.store.read("4677896b-391c-4e06-ba49-c584558570b9"))
    .then((m) => console.warn(m))
    .then(() => sdk.store.read("4677896b-391c-4e06-ba49-c584558570b9", "4fbaaffc-c270-410e-8997-e40261192380"))
    .then((m) => console.warn(m))
    .catch((a) => console.warn(a))

//const auth = new Authorization({ email: "test10@test.com", password: "testtest"})

/*
auth.authorize()
    .then((a) => console.warn(a))
    .catch((a) => console.warn(a))
*/
/*
API.authenticate("test10@test.com", "testtest")
    .then((token) => {
        console.warn(token)


        const merchant = new MerchantModel()

        merchant
            .set({
                email: "test102@test.com",
                password: "testtest"
            })
            .create()
            .then((created) => {
                console.warn(created)
            })
            .catch((error: Error) => {
                console.warn(error)
            })
    })
    .catch((e) => console.warn(e))
*/

/*
const a = merchant
    .set("email", "test10@test.com")

a.update().then((m) => console.warn(m))
*/
//a.update({ email: "test2"})
//a.update(false, { email: "test2"})

//    console.warn(a)

/*
const b = a.set("password", "")

console.warn(b)
*/
    //.create({ email: "test1", password: "" })
    //.then((created) => {
    //    console.warn(created)
    //})
    //.catch((error: Error) => {
    //    console.warn(error)
    //})

//API.setTest(true)
