import { WithAPI } from "../api/WithAPI";
import { ValidationSchema, ValidatedResource } from "../validation/Validation";
export interface AuthorizationCredentials {
    email: string;
    password: string;
}
export interface AuthorizationResponse {
    token: string;
}
export declare class Authorization extends WithAPI implements ValidatedResource<AuthorizationCredentials> {
    private validation;
    validate(data: AuthorizationCredentials, schema: ValidationSchema): Promise<AuthorizationCredentials>;
    authorize(credentials: AuthorizationCredentials): Promise<string>;
}
