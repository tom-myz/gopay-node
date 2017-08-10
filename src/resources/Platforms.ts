import { ResponseCallback } from "../api/RestAPI"
import { CRUDResource } from "./CRUDResource"
import { CardBrand } from "./common/CardBrand"
import { PlatformItem, PlatformConfiguration as PlatformConfig } from "./common/Platform"
import { WithConfig } from "./common/Common"

/* Request */

/* Response */
export interface PlatformConfigurationItem extends PlatformItem, WithConfig<PlatformConfig> {
    supportedPaymentTypes?: Array<string>
    supportedCardBrands?: Array<CardBrand>
}

export type ResponsePlatformConfiguration = Readonly<PlatformConfigurationItem>

export class Platforms extends CRUDResource {

    public getConfiguration(
        callback?: ResponseCallback<ResponsePlatformConfiguration>
    ): Promise<ResponsePlatformConfiguration> {
        return this.defineRoute("GET", "/platform")(null, callback)
    }

}
