export type TransferPeriod = "weekly" | "biweekly" | "monthly"

export interface TransferSchedule {
    period: TransferPeriod
    dayOfWeek: number
    weekOfMonth: number
    dayOfMonth: number
}
