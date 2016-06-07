import { RestAPI, RestAPIOptions } from "./api/RestAPI";
import { Authorization } from "./resources/Authorization";
import { Merchant } from "./resources/merchants/Merchant";
import { Merchants } from "./resources/merchants/Merchants";
import { Store } from "./resources/stores/Store";
import { Stores } from "./resources/stores/Stores";
import { TransactionToken } from "./resources/charges/TransactionToken";
import { Charge } from "./resources/charges/Charge";
import { Charges } from "./resources/charges/Charges";
import { Transfer } from "./resources/transfers/Transfer";
import { Transfers } from "./resources/transfers/Transfers";
import { Payouts } from "./resources/payouts/Payouts";
import { BankAccount } from "./resources/bankAccounts/BankAccount";
import { BankAccounts } from "./resources/bankAccounts/BankAccounts";
export interface SDKOptions {
    appId?: string;
    camelCase?: boolean;
    endpoint?: string;
    secret?: string;
    token?: string;
}
export declare class PaymentsSDK {
    api: RestAPI;
    authorization: Authorization;
    token: TransactionToken;
    merchant: Merchant;
    merchants: Merchants;
    store: Store;
    stores: Stores;
    charge: Charge;
    charges: Charges;
    transfer: Transfer;
    transfers: Transfers;
    payouts: Payouts;
    bankAccount: BankAccount;
    bankAccounts: BankAccounts;
    constructor(options?: SDKOptions);
    getOptions(options?: SDKOptions): RestAPIOptions;
}
export default PaymentsSDK;
