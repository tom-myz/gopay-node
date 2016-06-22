import { RestAPI, RestAPIOptions } from "./api/RestAPI";
import { Authorization } from "./resources/Authorization";
import { Merchants } from "./resources/Merchants";
import { Stores } from "./resources/Stores";
import { Transfers } from "./resources/Transfers";
import { Ledger } from "./resources/Ledger";
import { BankAccounts } from "./resources/BankAccounts";
import { WebHooks } from "./resources/WebHooks";
import { ApplicationTokens } from "./resources/ApplicationTokens";
import { TransactionTokens } from "./resources/TransactionTokens";
import { Charges } from "./resources/Charges";
export declare class PaymentsSDK {
    api: RestAPI;
    authorization: Authorization;
    merchants: Merchants;
    stores: Stores;
    charges: Charges;
    transfers: Transfers;
    ledger: Ledger;
    bankAccounts: BankAccounts;
    webHooks: WebHooks;
    applicationTokens: ApplicationTokens;
    transactionTokens: TransactionTokens;
    constructor(options?: RestAPIOptions);
}
export default PaymentsSDK;
