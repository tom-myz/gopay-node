import { ICRUDResource, CRUDResource } from "./CRUDResource"
import { ResourceAccessType } from "../api/RestAPI"
import { ValidationSchema } from "../validation/Validation"
import { isEmpty } from "../utils"

export abstract class MerchantCRUDResource<P> extends CRUDResource<P> implements ICRUDResource<P> {

    public urlSegment: string = ""

    public url (id?: string, merchantId?: string): string {
        if (isEmpty(merchantId)) {
            return `/${this.urlSegment}${id ? `/${id}` : ""}`
        }
        return `/merchants/${merchantId}/${this.urlSegment}${id ? `/${id}` : ""}`
    }

    public create (data: P, merchantId?: string): Promise<P> {
        return this._create(data, merchantId)
    }

    public read (id: string, merchantId?: string): Promise<P> {
        return this._read(id, merchantId)
    }

    public update (id: string, data: P, merchantId?: string): Promise<P> {
        return this._update(id, data, merchantId)
    }

    public delete (id: string, merchantId?: string): Promise<P> {
        return this._delete(id, merchantId)
    }

}
