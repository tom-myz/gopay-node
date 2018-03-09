/**
 *  @module Resources/Platforms
 */

import { ResponseCallback, HTTPMethod } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { CardBrand } from "./common/enums"
import { PlatformItem, PlatformConfiguration as PlatformConfig } from "./common/Platform"
import { WithConfig } from "./common/types"
import { PaymentType } from "./TransactionTokens";

/* Request */

/* Response */
export interface PlatformConfigurationItem extends PlatformItem, WithConfig<PlatformConfig> {
    supportedPaymentTypes?: PaymentType[]
    supportedCardBrands?: CardBrand[]
}

export type ResponsePlatformConfiguration = Readonly<PlatformConfigurationItem>

export class Platforms extends CRUDResource {

    getConfiguration(
        callback?: ResponseCallback<ResponsePlatformConfiguration>
    ): Promise<ResponsePlatformConfiguration> {
        return this.defineRoute(HTTPMethod.GET, "/platform")(null, callback)
    }

}
