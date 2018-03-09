/**
 *  @internal
 *  @module Enums
 */

export enum CardBrand {
    VISA       = "visa",
    MASTERCARD = "mastercard",
    MAESTRO    = "maestro",
    AMEX       = "american_express",
    DINERS     = "diners_club",
    DISCOVER   = "discover",
    JCB        = "jcb",
    UNIONPAY   = "unionpay"
}

export enum ProcessingMode {
    TEST      = "test",
    LIVE      = "live",
    LIVE_TEST = "live_test"
}
