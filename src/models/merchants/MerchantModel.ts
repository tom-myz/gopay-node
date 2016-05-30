import { Model } from "../common/Model"
import { UUID } from "../../types/UUID"

export interface MerchantProps {
    merchantId?: string
    email?: string
    password?: string
    active?: string
    createdOn?: number
    updatedOn?: number
    address?: Object
    gatewayCredentials?: Object
}



export class MerchantModel extends Model<MerchantProps> {

    validation (): any {
        return null
    }

    url (): string {
        return "/merchants"
    }

}
