/**
 *  @module SDK
 */

import { RestAPI, RestAPIOptions } from "../api/RestAPI"

export abstract class PaymentsSDK {

    public api:RestAPI;

    constructor (options?: RestAPIOptions) {
        this.api = new RestAPI(options);
    }

}
