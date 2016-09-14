import { RestAPIOptions } from "./api/RestAPI"
import { PaymentsSDK } from "./PaymentsSDK"

// Resources
import { Merchants } from "./resources/Merchants"
import { Stores } from "./resources/Stores"

export default class SDK extends PaymentsSDK {

    public merchants: Merchants
    public stores: Stores

    constructor (options?: RestAPIOptions) {
        super(options)

        this.merchants = new Merchants(this.api)
        this.stores = new Stores(this.api)
    }

}
