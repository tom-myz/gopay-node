import { ResponseCallback } from "../api/RestAPI"
import { Resource } from "./Resource"
import { CardBrand } from "./common/CardBrand"
import { PlatformItem, PlatformConfiguration as PlatformConfig } from "./common/Platform"
import { WithConfig } from "./common/Common"

/* Request */

/* Response */
export interface PlatformConfigurationItem extends PlatformItem, WithConfig<PlatformConfig> {
    supportedPaymentTypes?: Array<string>
    supportedCardBrands?: Array<CardBrand>
    supportedGateways?: Array<string>
}

export type ResponsePlatformConfiguration = Readonly<PlatformConfigurationItem>

export class PlatformConfiguration extends Resource {

    public get(data?: any, callback?: ResponseCallback<ResponsePlatformConfiguration>): Promise<ResponsePlatformConfiguration> {
        return this.defineRoute("GET", "/platform")(data, callback)
    }

}
