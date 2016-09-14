import { RestAPIOptions } from "./api/RestAPI";
import { PaymentsSDK } from "./PaymentsSDK";
import { Merchants } from "./resources/Merchants";
import { Stores } from "./resources/Stores";
export default class SDK extends PaymentsSDK {
    merchants: Merchants;
    stores: Stores;
    constructor(options?: RestAPIOptions);
}
