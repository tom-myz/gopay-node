import { MerchantModel } from "../src/models/merchants/MerchantModel"
import { API } from "../src/api/API"
import { Error } from "../src/errors/Error";

/*
const merchant = new MerchantModel({
    id: "4fbaaffc-c270-410e-8997-e40261192380"
})
*/

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
