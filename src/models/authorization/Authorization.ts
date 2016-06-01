import { Model } from "../common/Model"
import { ValidationSchema } from "../../validation/Validation"
import Validator from "../../validation/validators/Validator"

export interface PAuthorization {
    email?    : string
    password? : string
    token?    : string
}

export class Authorization extends Model<PAuthorization> {

    schema: ValidationSchema = {
        email    : [ new Validator.Required() ],
        password : [ new Validator.Required() ]
    }

    parse (props: PAuthorization) {
        return new Authorization(props)
    }

    url (): string {
        return "/authenticate"
    }

    authorize (): Promise<string> {
        return this._api.send("POST", this.url(), this.props, false)
            .then(({ token }: PAuthorization) => {
                this._api.token = token
                return Promise.resolve(token)
            })
    }

}
