import { RestAPIOptions } from "./api/RestAPI";
import { PaymentsSDK } from "./PaymentsSDK";
import { Balance } from "./resources/Balance";
import { BankAccounts } from "./resources/BankAccounts";
import { Charges } from "./resources/Charges";
import { CheckoutInfo } from "./resources/CheckoutInfo";
import { Merchants } from "./resources/Merchants";
import { Refunds } from "./resources/Refunds";
import { Stores } from "./resources/Stores";
import { TransactionsHistory } from "./resources/TransactionsHistory";
import { TransactionTokens } from "./resources/TransactionTokens";
import { Transfers } from "./resources/Transfers";
import { Verification } from "./resources/Verification";
import { WebHooks } from "./resources/WebHooks";
export default class SDK extends PaymentsSDK {
    balance: Balance;
    bankAccounts: BankAccounts;
    charges: Charges;
    checkoutInfo: CheckoutInfo;
    merchants: Merchants;
    refunds: Refunds;
    stores: Stores;
    transactionsHistory: TransactionsHistory;
    transactionTokens: TransactionTokens;
    transfers: Transfers;
    verification: Verification;
    webHooks: WebHooks;
    constructor(options?: RestAPIOptions);
}
