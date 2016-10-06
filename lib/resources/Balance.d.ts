import { ResponseCallback, AuthParams } from "../api/RestAPI";
import { CRUDResource, CRUDPaginationParams } from "./CRUDResource";
export interface BalancesListParams extends CRUDPaginationParams, AuthParams {
}
export interface BalanceItem {
    currency: string;
    currentBalance: number;
    overallBalance: number;
    merchantId: string;
    storeId: string;
}
export interface BalancesItems {
    balances: Array<BalanceItem>;
}
export declare type ResponseBalance = BalanceItem;
export declare type ResponseBalances = BalancesItems;
export declare class Balance extends CRUDResource {
    static routeBase: string;
    get(storeId?: string, data?: BalancesListParams, callback?: ResponseCallback<ResponseBalances>): Promise<ResponseBalances>;
}
