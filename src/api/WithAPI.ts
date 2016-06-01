import { RestAPI } from "./RestAPI"

export abstract class WithAPI {
    constructor (public api: RestAPI) {}
}
