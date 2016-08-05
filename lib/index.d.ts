import { RestAPI, RestAPIOptions } from "./api/RestAPI";
import { Authorization } from "./resources/Authorization";
import { Merchants } from "./resources/Merchants";
import { Stores } from "./resources/Stores";
import { Transfers } from "./resources/Transfers";
import { Ledgers } from "./resources/Ledgers";
import { BankAccounts } from "./resources/BankAccounts";
import { WebHooks } from "./resources/WebHooks";
import { ApplicationTokens } from "./resources/ApplicationTokens";
import { TransactionTokens } from "./resources/TransactionTokens";
import { Charges } from "./resources/Charges";
import { Credentials } from "./resources/Credentials";
export declare class PaymentsSDK {
    api: RestAPI;
    authorization: Authorization;
    merchants: Merchants;
    stores: Stores;
    charges: Charges;
    transfers: Transfers;
    ledgers: Ledgers;
    bankAccounts: BankAccounts;
    webHooks: WebHooks;
    applicationTokens: ApplicationTokens;
    transactionTokens: TransactionTokens;
    credentials: Credentials;
    constructor(options?: RestAPIOptions);
}
export default PaymentsSDK;
