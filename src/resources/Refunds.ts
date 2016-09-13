import { CRUDResource, CRUDStoreIdParam, CRUDIdStoreIdParam, CRUDPaginationParams } from "./CRUDResource"
import { SDKCallbackFunction } from "../api/RestAPI"
import { refundCreateSchema } from "../validation/schemas/refund"

export interface RefundCreateParams {}

interface CRUDRefundParam extends CRUDStoreIdParam {
    chargeId: string
}

interface CRUDIdRefundParam extends CRUDIdStoreIdParam {
    chargeId: string
}

export class Refunds extends CRUDResource {

    public static routeBase: string = "/(merchants/:merchantId/)stores/:storeId/charges/:chargeId/refunds"

    public list (chargeId: string,
                 storeId: string,
                 data?: CRUDPaginationParams,
                 callback?: SDKCallbackFunction,
                 merchantId?: string,
                 token?: string): Promise<any> {
        const params: CRUDRefundParam = { storeId, merchantId, chargeId }
        return this._listRoute(params, data, callback, { token })
    }

    public create (chargeId: string,
                   storeId: string,
                   data: RefundCreateParams,
                   callback?: SDKCallbackFunction,
                   merchantId?: string,
                   token?: string): Promise<any> {
        const params: CRUDRefundParam = { storeId, merchantId, chargeId }
        return this._createRoute(params, data, callback, { token, validationSchema : refundCreateSchema })
    }

    public get (chargeId: string,
                storeId: string,
                id: string,
                callback?: SDKCallbackFunction,
                merchantId?: string,
                token?: string): Promise<any> {
        const params: CRUDIdRefundParam = { id, storeId, merchantId, chargeId }
        return this._getRoute(params, null, callback, { token })
    }

}
