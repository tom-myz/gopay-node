/**
 *  @module Resources/TemporaryTokenAlias
 */

import { CRUDResource } from "./CRUDResource";
import { ResponseCallback, SendData, ErrorResponse, HTTPMethod } from "../api/RestAPI";

export interface TemporaryTokenAliasItem {
    id?: string;
    transactionTokenId?: string;
    platformId?: string;
    merchantId?: string;
    storeId?: string;
    active?: boolean;
    validUntil?: string;
    metaData?: any;
    createdOn?: string;
}

export interface TemporaryTokenAliasShortItem {
    key?: string;
    validUntil?: string;
}

export interface TemporaryTokenAliasCreateParams {
    transactionTokenId: string;
    metadata?: any;
    amount?: number;
    currency?: string;
    validUntil?: string;
}

export enum TemporaryTokenAliasQrLogoType {
    None       = "None",
    Centered   = "Centered",
    Background = "Background"
}

export interface TemporaryTokenAliasQrOptions {
    size?: number;
    logo?: TemporaryTokenAliasQrLogoType;
    color?: string;
}

export type ResponseTemporaryTokenAlias = TemporaryTokenAlias;

export class TemporaryTokenAlias extends CRUDResource {

    static requiredParams: string[] = ["transactionTokenId"];

    static routeBase: string = "(/stores/:storeId)/tokens/alias";

    create(data: SendData<TemporaryTokenAliasCreateParams>,
           callback?: ResponseCallback<TemporaryTokenAliasShortItem>): Promise<TemporaryTokenAliasShortItem> {
        return this._createRoute(TemporaryTokenAlias.requiredParams)(data, callback);
    }

    get(storeId: string,
        id: string,
        data?: SendData<void>,
        callback?: ResponseCallback<TemporaryTokenAliasItem>): Promise<TemporaryTokenAliasItem> {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    getMedia(storeId: string,
             id: string,
             data?: SendData<TemporaryTokenAliasQrOptions>,
             callback?: ResponseCallback<Blob>): Promise<Blob> {
        return this.defineRoute(HTTPMethod.GET, `${this._routeBase}/:id`, [], true, false)
            ({ media: "qr", ...data }, callback, ["storeId", "id"], storeId, id)
            .then((response: Response) => {
                return response.blob()
            })
    }

    post(storeId: string,
         id: string,
         data?: SendData<void>,
         callback?: ResponseCallback<TemporaryTokenAliasItem>): Promise<TemporaryTokenAliasItem> {
        return this.defineRoute(HTTPMethod.POST, `${this._routeBase}/:id`)(data, callback, ["storeId", "id"], storeId, id)
    }

    postMedia(storeId: string,
              id: string,
              data?: SendData<TemporaryTokenAliasQrOptions>,
              callback?: ResponseCallback<Blob>): Promise<Blob> {
        return this.defineRoute(HTTPMethod.POST, `${this._routeBase}/:id`, [], true, false)
            ({ media: "qr", ...data }, callback, ["storeId", "id"], storeId, id)
            .then((response: Response) => {
                return response.blob()
            })
    }

    delete(storeId: string,
           id: string,
           data?: SendData<void>,
           callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }
}
