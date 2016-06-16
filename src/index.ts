import { RestAPI, RestAPIOptions } from "./api/RestAPI"
import { Authorization } from "./resources/Authorization"
import { Merchants } from "./resources/Merchants"
import { Stores } from "./resources/Stores"
import { Transfers } from "./resources/Transfers"
import { Payouts } from "./resources/Payouts"
import { BankAccounts } from "./resources/BankAccounts"
import { WebHooks } from "./resources/WebHooks"
import { ApplicationTokens } from "./resources/ApplicationTokens"
import { Charges } from "./resources/Charges"

export class PaymentsSDK {

    public api: RestAPI

    /* Resources */
    public authorization: Authorization
    public merchants: Merchants
    public stores: Stores
    public charges: Charges
    public transfers: Transfers
    public payouts: Payouts
    public bankAccounts: BankAccounts
    public webHooks: WebHooks
    public applicationTokens: ApplicationTokens

    constructor (options?: RestAPIOptions) {
        this.api = new RestAPI(options)

        /* Resources */
        this.authorization = new Authorization(this.api)
        this.merchants = new Merchants(this.api)
        this.stores = new Stores(this.api)
        this.charges = new Charges(this.api)
        this.transfers = new Transfers(this.api)
        this.payouts = new Payouts(this.api)
        this.bankAccounts = new BankAccounts(this.api)
        this.webHooks = new WebHooks(this.api)
        this.applicationTokens = new ApplicationTokens(this.api)
    }
}

export default PaymentsSDK
