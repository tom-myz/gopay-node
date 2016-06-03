import { process } from "process"
import config from "./config"
import { RestAPI, RestAPIOptions } from "./api/RestAPI"
import { Authorization } from "./resources/Authorization"
import { Merchant } from "./resources/merchants/Merchant"
import { Merchants } from "./resources/merchants/Merchants"
import { Store } from "./resources/stores/Store"
import { Stores } from "./resources/stores/Stores"
import { TransactionToken } from "./resources/charges/TransactionToken"
import { Charge } from "./resources/charges/Charge"
import { Charges } from "./resources/charges/Charges"
import { Transfer } from "./resources/transfers/Transfer"
import { Transfers } from "./resources/transfers/Transfers"
import { Payouts } from "./resources/payouts/Payouts"
import { BankAccount } from "./resources/bankAccounts/BankAccount"
import { BankAccounts } from "./resources/bankAccounts/BankAccounts"

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
    public token: TransactionToken
    public merchant: Merchant
    public merchants: Merchants
    public store: Store
    public stores: Stores
    public charge: Charge
    public charges: Charges
    public transfer: Transfer
    public transfers: Transfers
    public payouts: Payouts
    public bankAccount: BankAccount
    public bankAccounts: BankAccounts
    
    constructor (options?: SDKOptions) {
        this.api = new RestAPI(this.getOptions(options))

        /* Resources */
        this.authorization = new Authorization(this.api)
        this.token = new TransactionToken(this.api)
        this.merchant = new Merchant(this.api)
        this.merchants = new Merchants(this.api)
        this.store = new Store(this.api)
        this.stores = new Stores(this.api)
        this.charge = new Charge(this.api)
        this.charges = new Charges(this.api)
        this.transfer = new Transfer(this.api)
        this.transfers = new Transfers(this.api)
        this.payouts = new Payouts(this.api)
        this.bankAccount = new BankAccount(this.api)
        this.bankAccounts = new BankAccounts(this.api)
    }
    
    public getOptions (options: SDKOptions = <SDKOptions>{}): RestAPIOptions  {
        return {
            endpoint : options.endpoint || config.endpoint,
            appId    : options.appId || process.env[config.envAppId],
            secret   : options.secret || process.env[config.envSecret],
            token    : options.token,
            camel    : options.camelCase || false
        }
    }
}

export default PaymentsSDK
