import { WithAPI } from "../api/WithAPI"
import { Validation, ValidationSchema } from "../validation/Validation"
import Validator from "../validation/validators/Validator"
import { VALIDATION_ERROR } from "../errors/Errors"

export interface AuthorizationCredentials {
    email: string
    password: string
}

export interface AuthorizationResponse {
    token: string
}

export class Authorization extends WithAPI {

    private validation: ValidationSchema = {
        email    : [ new Validator.Required(), new Validator.Email() ],
        password : [ new Validator.Required() ]
    }

    public authorize (credentials: AuthorizationCredentials): Promise<string> {
        const validationErrors: Array<any> = Validation.validate(credentials, this.validation)

        if (validationErrors.length !== 0) {
           return Promise.reject<string>(VALIDATION_ERROR(validationErrors))
        }

        return this.api.send({
            body   : credentials,
            method : "POST",
            url    : "/authenticate"
        }).then((response: AuthorizationResponse) => {
            this.api.token = response.token
            return Promise.resolve(response.token)
        })
    }

}
