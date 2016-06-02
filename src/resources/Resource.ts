export interface IParams {
    [key: string]: any
}
export interface IListParams<P> extends IParams {
    data?: P
}

export interface URLSegments {
    id?: string
    merchantId?: string
    storeId?: string
}

export interface SendOptions<P> {
    id?: string
    merchantId?: string
    storeId?: string
    data?: P
}