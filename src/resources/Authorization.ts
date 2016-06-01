import { WithAPI } from "../api/WithAPI"
import { Validation, ValidationSchema } from "../validation/Validation"
import Validator from "../validation/validators/Validator"
import { ValidationError } from "../errors/CommonError"

export interface AuthorizationCredentials {
    email    : string
    password : string
}

export interface AuthorizationResponse {
    token: string
}

export class Authorization extends WithAPI {

    private validation: ValidationSchema = {
        email    : [ new Validator.Required() ],
        password : [ new Validator.Required() ]
    }

    public authorize (credentials: AuthorizationCredentials): Promise<string> {
        const validationErrors = Validation.validate(credentials, this.validation)
        
        if (validationErrors.length !== 0) {
           return Promise.reject<string>(new ValidationError(validationErrors))
        }
        
        return this.api.send({
            method : "POST",
            url    : "/authenticate",
            body   : credentials
        }).then((response: AuthorizationResponse) => {
            this.api.token = response.token
            return Promise.resolve(response.token)
        })
    }

} 
