import { RestAPI, RestAPIOptions } from "./api/RestAPI";
import { Authorization } from "./resources/Authorization";
import { Merchants } from "./resources/Merchants";
import { Stores } from "./resources/Stores";
import { Transfers } from "./resources/Transfers";
import { Payouts } from "./resources/Payouts";
import { BankAccounts } from "./resources/BankAccounts";
import { WebHooks } from "./resources/WebHooks";
import { ApplicationTokens } from "./resources/ApplicationTokens";
import { Charges } from "./resources/Charges";
export declare class PaymentsSDK {
    api: RestAPI;
    authorization: Authorization;
    merchants: Merchants;
    stores: Stores;
    charges: Charges;
    transfers: Transfers;
    payouts: Payouts;
    bankAccounts: BankAccounts;
    webHooks: WebHooks;
    applicationTokens: ApplicationTokens;
    constructor(options?: RestAPIOptions);
}
export default PaymentsSDK;
