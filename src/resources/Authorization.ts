import { CRUDResource, CRUDDefinedRoute } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { authorizeSchema } from "../validation/authorization"

export interface AuthorizeParams {
    email: string
    password: string
}

export class Authorization extends CRUDResource {

    private _authorizeRoute: CRUDDefinedRoute = this.defineRoute("POST", "/authenticate")

    public authorize (data: AuthorizeParams, callback?: SDKCallbackFunction) {
        return this._authorizeRoute(null, data, callback, { validationSchema : authorizeSchema })
    }

}