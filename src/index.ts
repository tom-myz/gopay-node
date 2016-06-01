import config from "./config"
import { RestAPI } from "./api/RestAPI"
import { Authorization } from "./resources/Authorization"
import { Merchant } from "./resources/merchants/Merchant"
import { Store } from "./resources/stores/Store"

export interface SDKOptions {
    endpoint?  : string
    token?     : string
    appId?     : string
    secret?    : string
    camelCase? : boolean
}

export class PaymentsSDK {

    public api: RestAPI

    /* Resources */
    public authorization: Authorization
    public merchant: Merchant
    public store: Store
    
    constructor (options: SDKOptions = <SDKOptions>{}) {
        // TODO: check if it's node and take process.env credentials
        const endpoint = options.endpoint || config.endpoint
        const appId = options.appId
        const secret = options.secret

        const token = options.token
        const camel = options.camelCase || false

        this.api = new RestAPI({ endpoint, appId, secret, token, camel })

        /* Resources */
        this.authorization = new Authorization(this.api)
        this.merchant = new Merchant(this.api)
        this.store = new Store(this.api)
    }
    
    
    
}

export default PaymentsSDK
