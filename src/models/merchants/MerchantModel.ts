import { CRUDModel } from "../common/CRUDModel"

export interface PMerchant {
    id?                 : string
    email?              : string
    password?           : string
    active?             : string
    createdOn?          : number
    updatedOn?          : number
    address?            : Object
    gatewayCredentials? : Object
}

export class MerchantModel extends CRUDModel<PMerchant> {

    parse (props: PMerchant) {
        return new MerchantModel(props)
    }

    id (): string {
        return this.props.id
    }
    
    url (): string {
        return "/merchants"
    }

}
