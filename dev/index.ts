import { MerchantModel } from "../src/models/merchants/MerchantModel"
import { API } from "../src/api/API"
import {Error} from "../src/errors/Error";

const merchant = new MerchantModel()

merchant
    .setProp("email", "test")
    .setProp("password", "")
    .create({ email: "test1", password: "" })
    .then((created) => {
        console.warn(created)
    })
    .catch((error: Error) => {
        console.warn(error)
    })

//API.setTest(true)
