import { WithAPI } from "../api/WithAPI"
import {Validation, ValidationSchema, ValidatedResource} from "../validation/Validation"
import Validator from "../validation/validators/Validator"
import { VALIDATION_ERROR } from "../errors/Errors"

export interface AuthorizationCredentials {
    email: string
    password: string
}

export interface AuthorizationResponse {
    token: string
}

export class Authorization extends WithAPI implements ValidatedResource<AuthorizationCredentials> {

    private validation: ValidationSchema = {
        email    : [ new Validator.Required(), new Validator.Email() ],
        password : [ new Validator.Required() ]
    }

    public validate (data: AuthorizationCredentials = {} as AuthorizationCredentials,
                     schema: ValidationSchema): Promise<AuthorizationCredentials> {
        const errors: Array<any> = Validation.validate(data, schema)

        if (errors.length === 0) {
            return Promise.resolve(data)
        }
        return Promise.reject<AuthorizationCredentials>(VALIDATION_ERROR(errors))
    }

    public authorize (credentials: AuthorizationCredentials): Promise<AuthorizationResponse> {
        const validationErrors: Array<any> = Validation.validate(credentials, this.validation)

        if (validationErrors.length !== 0) {
           return Promise.reject<AuthorizationResponse>(VALIDATION_ERROR(validationErrors))
        }

        return this.validate(credentials, this.validation)
            .then(() => this.api.send({
                body   : credentials,
                method : "POST",
                url    : "/authenticate"
            })
            .then((response: AuthorizationResponse) => {
                this.api.token = response.token
                return response
            }))
    }

}
