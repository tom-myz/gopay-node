import { RestAPI } from "./RestAPI"

export abstract class WithAPI {
    public api: RestAPI

    constructor (api: RestAPI) {
        this.api = api
    }
}
