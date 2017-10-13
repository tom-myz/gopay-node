export const enum TransferPeriod {
    WEEKLY   = "weekly",
    BIWEEKLY = "biweekly",
    MONTHLY  = "monthly"
}

export interface TransferSchedule {
    period: TransferPeriod
    dayOfWeek: number
    weekOfMonth: number
    dayOfMonth: number
}
