/**
 *  @module Resources/TemporaryTokenAlias
 */

import { CRUDResource } from "./CRUDResource";
import { ResponseCallback, SendData, ErrorResponse } from "../api/RestAPI";

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

export interface TemporaryTokenAliasCreateParams {
    transactionTokenId: string;
    validUntil: string;
}

export type ResponseTemporaryTokenAlias = TemporaryTokenAlias;

export class TemporaryTokenAlias extends CRUDResource {

    static requiredParams: string[] = ["transactionTokenId", "validUntil"];

    static routeBase: string = "(/stores/:storeId)/tokens/alias";

    create(data: SendData<TemporaryTokenAliasCreateParams>,
           callback?: ResponseCallback<TemporaryTokenAliasItem>): Promise<TemporaryTokenAliasItem> {
        return this._createRoute(TemporaryTokenAlias.requiredParams)(data, callback);
    }

    get(storeId: string,
        id: string,
        data?: any,
        callback?: ResponseCallback<TemporaryTokenAliasItem>): Promise<TemporaryTokenAliasItem> {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    delete(storeId: string,
           id: string,
           data?: any,
           callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {
        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }
}
