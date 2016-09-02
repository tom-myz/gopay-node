import { RestAPI, RestAPIOptions } from "./api/RestAPI"
import { Authorization } from "./resources/Authorization"
import { Merchants } from "./resources/Merchants"
import { Stores } from "./resources/Stores"
import { Transfers } from "./resources/Transfers"
import { Ledgers } from "./resources/Ledgers"
import { BankAccounts } from "./resources/BankAccounts"
import { WebHooks } from "./resources/WebHooks"
import { ApplicationTokens } from "./resources/ApplicationTokens"
import { TransactionTokens } from "./resources/TransactionTokens"
import { Charges } from "./resources/Charges"
import { Credentials } from "./resources/Credentials"

export class PaymentsSDK {

    public api: RestAPI

    /* Resources */
    public authorization: Authorization
    public merchants: Merchants
    public stores: Stores
    public charges: Charges
    public transfers: Transfers
    public ledgers: Ledgers
    public bankAccounts: BankAccounts
    public webHooks: WebHooks
    public applicationTokens: ApplicationTokens
    public transactionTokens: TransactionTokens
    public credentials: Credentials

    constructor (options?: RestAPIOptions) {
        this.api = new RestAPI(options)

        /* Resources */
        this.authorization = new Authorization(this.api)
        this.merchants = new Merchants(this.api)
        this.stores = new Stores(this.api)
        this.charges = new Charges(this.api)
        this.transfers = new Transfers(this.api)
        this.ledgers = new Ledgers(this.api)
        this.bankAccounts = new BankAccounts(this.api)
        this.webHooks = new WebHooks(this.api)
        this.applicationTokens = new ApplicationTokens(this.api)
        this.transactionTokens = new TransactionTokens(this.api)
        this.credentials = new Credentials(this.api)
    }
}

export default PaymentsSDK
