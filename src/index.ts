import { RestAPIOptions } from "./api/RestAPI"
import { PaymentsSDK } from "./PaymentsSDK"

// Resources
import { Balance } from "./resources/Balance"
import { BankAccounts } from "./resources/BankAccounts"
import { Charges } from "./resources/Charges"
import { CheckoutInfo } from "./resources/CheckoutInfo"
import { Merchants } from "./resources/Merchants"
import { Ledgers } from "./resources/Ledgers"
import { Refunds } from "./resources/Refunds"
import { Stores } from "./resources/Stores"
import { Subscriptions } from "./resources/Subscriptions"
import { TransactionTokens } from "./resources/TransactionTokens"
import { Transfers } from "./resources/Transfers"
import { Verification } from "./resources/Verification"
import { WebHooks } from "./resources/WebHooks"

export default class SDK extends PaymentsSDK {

    public balance: Balance
    public bankAccounts: BankAccounts
    public charges: Charges
    public checkoutInfo: CheckoutInfo
    public merchants: Merchants
    public ledgers: Ledgers
    public refunds: Refunds
    public stores: Stores
    public subscriptions: Subscriptions
    public transactionTokens: TransactionTokens
    public transfers: Transfers
    public verification: Verification
    public webHooks: WebHooks

    constructor (options?: RestAPIOptions) {
        super(options)

        this.balance = new Balance(this.api)
        this.bankAccounts = new BankAccounts(this.api)
        this.charges = new Charges(this.api)
        this.checkoutInfo = new CheckoutInfo(this.api)
        this.merchants = new Merchants(this.api)
        this.ledgers = new Ledgers(this.api)
        this.refunds = new Refunds(this.api)
        this.stores = new Stores(this.api)
        this.subscriptions = new Subscriptions(this.api)
        this.transactionTokens = new TransactionTokens(this.api)
        this.transfers = new Transfers(this.api)
        this.verification = new Verification(this.api)
        this.webHooks = new WebHooks(this.api)
    }

}
