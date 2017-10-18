export interface WithCreatedOn {
    createdOn?: string
}

export interface WithIdempotentKey {
    idempotentKey?: string
}

export interface WithConfig<T> {
    configuration: T
}

export interface AmountWithCurrency {
    amount: number
    currency: string
}
