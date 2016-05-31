import { Model } from "../common/Model"
import { WithId } from "../common/WithId"
import { UUID } from "../../types/UUID"

export interface PMerchant extends WithId {
    id?: string
    email?: string
    password?: string
    active?: string
    createdOn?: number
    updatedOn?: number
    address?: Object
    gatewayCredentials?: Object
}

export interface RMerchant {
    stores: Object
}

export class MerchantModel extends Model<PMerchant> implements RMerchant {
    
    /* Relations */
    stores: Object
    
    parse (props: PMerchant) {
        return this
    }
    
    url (): string {
        return "/merchants"
    }

}
