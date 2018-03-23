/**
 *  @internal
 *  @module Configuration
 */

export const enum TransferPeriod {
    WEEKLY      = "weekly",
    BIWEEKLY    = "biweekly",
    SEMIMONTHLY = "semimonthly",
    MONTHLY     = "monthly"
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

export interface TransferScheduleItem {
    waitPeriod: string;
    period: TransferPeriod;
    dayOfWeek: DayOfWeek;
    weekOfMonth: WeekOfMonth;
    dayOfMonth: number;
    weeklyClosingDay?: DayOfWeek;
    weeklyPayoutDay?: DayOfWeek;
}
