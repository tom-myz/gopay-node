import { Resource, DefinedRoute } from "./Resource"

export interface AuthorizeParams {
    email: string
    password: string
}

export class Authorization extends Resource {

    private _authorizeRoute: DefinedRoute = this.defineRoute("POST", "/authenticate")

    public authorize (data: AuthorizeParams | FormData, callback?: SDKCallbackFunction): Promise<any> {
        return this._authorizeRoute(null, data, callback, { validationSchema : authorizeSchema })
    }

}
