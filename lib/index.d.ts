import { RestAPIOptions } from "./api/RestAPI";
import { PaymentsSDK } from "./PaymentsSDK";
export default class SDK extends PaymentsSDK {
    constructor(options?: RestAPIOptions);
}
