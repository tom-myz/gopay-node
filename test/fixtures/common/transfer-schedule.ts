import {
    TransferSchedule,
    TransferPeriod,
    DayOfWeek,
    WeekOfMonth
} from "../../../src/resources/common/TransferSchedule";

export function generateFixture(): TransferSchedule {
    return {
        period      : TransferPeriod.MONTHLY,
        dayOfWeek   : DayOfWeek.MONDAY,
        weekOfMonth : WeekOfMonth.FIRST,
        dayOfMonth  : 1,
        monthly     : {
            dayOfMonth : 1
        }
    }
}
