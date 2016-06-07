import { WithAPI } from "../api/WithAPI";
export interface AuthorizationCredentials {
    email: string;
    password: string;
}
export interface AuthorizationResponse {
    token: string;
}
export declare class Authorization extends WithAPI {
    private validation;
    authorize(credentials: AuthorizationCredentials): Promise<string>;
}
