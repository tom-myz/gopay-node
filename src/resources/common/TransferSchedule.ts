export const enum TransferPeriod {
    WEEKLY          = "weekly",
    BIWEEKLY        = "biweekly",
    SEMI_MONTHLY    = "semi_monthly",
    MONTHLY         = "monthly"
}

export const enum DayOfWeek {
    SUNDAY      = "sunday",
    MONDAY      = "monday",
    TUESDAY     = "tuesday",
    WEDNESDAY   = "wednesday",
    THURSDAY    = "thursday",
    FRIDAY      = "friday",
    SATURDAY    = "saturday"
}

export const enum WeekOfMonth {
    FIRST   = "first",
    SECOND  = "second",
    THIRD   = "third",
    FOURTH  = "fourth",
    LAST    = "last"
}

export interface TransferSchedule {
    period: TransferPeriod
    dayOfWeek: DayOfWeek
    weekOfMonth: WeekOfMonth
    dayOfMonth: number
    weekly?: {
        closingDay: DayOfWeek
        payoutDay: DayOfWeek
    }
    monthly?: {
        dayOfMonth: number
    }
}
