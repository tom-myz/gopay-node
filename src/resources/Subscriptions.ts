/**
 *  @module Resources/Subscriptions
 */

import { ResponseCallback, ErrorResponse, PollParams, HTTPMethod, SendData } from "../api/RestAPI"
import { CRUDResource, CRUDPaginationParams, CRUDItemsResponse } from "./CRUDResource"
import { Metadata } from "./common/types"
import { ProcessingMode } from "./common/enums"
import { ResponseCharges, ChargesListParams } from "./Charges"
import {PaymentType} from "./TransactionTokens";

export enum SubscriptionPeriod {
    DAILY        = "daily",
    WEEKLY       = "weekly",
    BIWEEKLY     = "biweekly",
    MONTHLY      = "monthly",
    QUARTERLY    = "quarterly",
    SEMIANNUALLY = "semiannually",
    ANNUALLY     = "annually"
}

export enum SubscriptionStatus {
    UNVERIFIED  = "unverified",
    CURRENT     = "current",
    UNPAID      = "unpaid",
    CANCELED    = "canceled",
    UNCONFIRMED = "unconfirmed",
    COMPLETED   = "completed"
}

export enum InstallmentPlan {
    REVOLVING          = "revolving",
    FIXED_CYCLES       = "fixed_cycles",
    FIXED_CYCLE_AMOUNT = "fixed_cycle_amount"
}

/* Request */
export interface InstallmentBaseParams {
    planType: InstallmentPlan;
}

export interface InstallmentRevolvingParams extends InstallmentBaseParams {
    planType: InstallmentPlan.REVOLVING;
}

export interface InstallmentCyclesParams extends InstallmentBaseParams {
    planType: InstallmentPlan.FIXED_CYCLES;
    fixedCycles: number;
}

export interface InstallmentCycleAmountParams extends InstallmentBaseParams {
    planType: InstallmentPlan.FIXED_CYCLE_AMOUNT;
    fixedCycleAmount: number;
}

export type InstallmentPlanItem<InstallmentPlanData extends InstallmentBaseParams> = InstallmentPlanData;

export interface InstallmentPlanSimulationParams<InstallmentPlanData extends InstallmentBaseParams> {
    installmentPlan: InstallmentPlanData;
    amount: number;
    currency: string;
    initialAmount?: number;
    subsequentCyclesStart?: string | number;
    paymentType: PaymentType;
    period: SubscriptionPeriod
}

export interface SubscriptionsListParams extends CRUDPaginationParams {
    search?: string
    status?: SubscriptionStatus
    mode?: ProcessingMode
}

export interface SubscriptionCreateParams {
    transactionTokenId: string;
    amount: number;
    currency: string;
    period: SubscriptionPeriod;
    metadata?: Metadata;
    initialAmount?: number;
    subsequentCyclesStart?: string | number;
    installmentPlan?: InstallmentPlanItem<any>;
}

export interface SubscriptionUpdateParams {
    transactionTokenId?: string;
    amount?: number;
    metadata?: Metadata;
    installmentPlan?: Partial<InstallmentPlanItem<any>>;
}

/* Response */
export interface SubscriptionItem {
    id: string
    merchantId: string
    storeId: string
    transactionTokenId: string
    amount: number
    currency: string
    amountFormatted: number
    period: SubscriptionPeriod
    status: SubscriptionStatus
    metadata?: Metadata
    mode: ProcessingMode
    installmentPlan?: InstallmentPlanItem<any>
    initialAmount?: number
    subsequentCyclesStart?: string
    createdOn: string
}

export interface CycleAmount {
    cycleDate: string;
    amount: number;
}

export type InstallmentPlanSimulationItem<InstallmentPlanData extends InstallmentBaseParams> =
    Required<InstallmentPlanSimulationParams<InstallmentPlanData>> & {
    cycles: CycleAmount[];
}

export type ResponseSubscription = SubscriptionItem
export type ResponseSubscriptions = CRUDItemsResponse<SubscriptionItem>

export class Subscriptions extends CRUDResource {

    static requiredParams: string[] = ["transactionTokenId", "amount", "currency", "period"];
    static requiredSimulationParams: string[] = ["installmentPlan", "paymentType", "currency", "period"];

    static routeBase: string = "/stores/:storeId/subscriptions";

    list(data?: SendData<SubscriptionsListParams>,
         callback?: ResponseCallback<ResponseSubscriptions>,
         storeId?: string): Promise<ResponseSubscriptions> {

        return this.defineRoute(HTTPMethod.GET, "(/stores/:storeId)/subscriptions")(data, callback, ["storeId"], storeId)
    }

    create(data: SubscriptionCreateParams,
           callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this.defineRoute(HTTPMethod.POST, "/subscriptions", Subscriptions.requiredParams)(data, callback)
    }

    get(storeId: string,
        id: string,
        data?: SendData<PollParams>,
        callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    update(storeId: string,
           id: string,
           data?: SendData<SubscriptionUpdateParams>,
           callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {

        return this._updateRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    delete(storeId: string,
           id: string,
           data?: SendData<void>,
           callback?: ResponseCallback<ErrorResponse>): Promise<ErrorResponse> {

        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id)
    }

    charges(storeId: string,
            id: string,
            data?: SendData<ChargesListParams>,
            callback?: ResponseCallback<ResponseCharges>): Promise<ResponseCharges> {

        return this.defineRoute(HTTPMethod.GET, `${Subscriptions.routeBase}/:id/charges`)(
            data, callback, ["storeId", "id"], storeId, id
        )
    }

    poll(storeId: string,
         id: string,
         data?: SendData<void>,
         callback?: ResponseCallback<ResponseSubscription>): Promise<ResponseSubscription> {
        const promise: () => Promise<ResponseSubscription> = () => this.get(
            storeId,
            id,
            { ...(data as object), polling : true }
        );
        return this.api.longPolling(
            promise,
            (response: ResponseSubscription) => response.status !== SubscriptionStatus.UNVERIFIED,
            callback
        );
    }

    simulation<InstallmentPlanData extends InstallmentBaseParams>(
        data: SendData<InstallmentPlanSimulationParams<InstallmentPlanData>>,
        callback?: ResponseCallback<InstallmentPlanSimulationItem<InstallmentPlanData>>,
        storeId?: string
    ): Promise<InstallmentPlanSimulationItem<InstallmentPlanData>> {
        return this.defineRoute(
            HTTPMethod.POST,
            "(/stores/:storeId)/subscriptions/simulate_plan",
            Subscriptions.requiredSimulationParams
        )(data, callback, ["storeId"], storeId)
    }

}
