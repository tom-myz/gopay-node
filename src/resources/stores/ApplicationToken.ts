import { ResourceAccessType } from "../../api/RestAPI"
import { IValidatedResource } from "../../validation/Validation"
import { StoreCRUDResource } from "../StoreCRUDResource"
import { ACTION_NOT_PERMITTED } from "../../errors/Errors"

export interface PApplicationToken {
    id?: string
    token?: string
    secret?: string
}

export class ApplicationToken
    extends StoreCRUDResource<PApplicationToken>
    implements IValidatedResource<PApplicationToken> {

    public single: boolean = false

    public urlSegment: string = "app_tokens"

    public accessType: ResourceAccessType = ResourceAccessType.Token

    public read (params?: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

    public update (params?: any): Promise<any> {
        return Promise.reject(ACTION_NOT_PERMITTED)
    }

}
