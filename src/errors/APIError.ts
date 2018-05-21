/**
 *  @module Errors
 */

export enum RequestErrorCode {
    RequestError = "REQUEST_ERROR"
}

export enum ResponseErrorCode {
    /* generic */
    BadRequest                                 = "BAD_REQUEST",
    Forbidden                                  = "FORBIDDEN",
    NotFound                                   = "NOT_FOUND",
    NotAllowed                                 = "NOT_ALLOWED",
    Conflicted                                 = "CONFLICTED",
    TooManyRequests                            = "TOO_MANY_REQUESTS",
    InternalServerError                        = "INTERNAL_SERVER_ERROR",
    ServiceUnavailable                         = "SERVICE_UNAVAILABLE",
    NotAuthorized                              = "NOT_AUTHORIZED",

    /* global */
    UnknownError                               = "UNKNOWN_ERROR",
    Timeout                                    = "TIMEOUT",
    DBError                                    = "DB_ERROR",
    InvalidRequest                             = "INVALID_REQUEST",
    UnableToGetIdempotentResult                = "UNABLE_TO_GET_IDEMPOTENT_REQUEST",

    /* auth */
    InvalidDomain                              = "INVALID_DOMAIN",
    InvalidCredentials                         = "INVALID_CREDENTIALS",
    InvalidPermissions                         = "INVALID_PERMISSIONS",
    ImproperAuth                               = "IMPROPER_AUTH",
    UserBanned                                 = "USER_BANNED",
    InvalidLoginToken                          = "INVALID_LOGIN_TOKEN",
    ExpiredLoginToken                          = "EXPIRED_LOGIN_TOKEN",
    ChargeTooQuick                             = "CHARGE_TOO_QUICK",

    /* file upload */
    FileUploadError                            = "FILE_UPLOAD_ERROR",
    FileMaxSizeExceeded                        = "FILE_MAX_SIE_EXCEEDED",
    FileInvalidType                            = "FILE_INVALID_TYPE",
    FileNotFound                               = "FILE_NOT_FOUND",

    /* crud actions */
    TokenGenerationException                   = "TOKEN_GENERATION_EXCEPTION",
    TokenForWrongStore                         = "TOKEN_FOR_WRONG_STORE",
    NonSubscriptionPayment                     = "NON_SUBSCRIPTION_PAYMENT",
    BankAccountExists                          = "BANK_ACCOUNT_EXISTS",
    EmailExists                                = "EMAIL_EXISTS",
    StoreExists                                = "STORE_EXISTS",
    GatewayCredentialsExists                   = "GATEWAY_CREDENTIALS_EXISTS",
    WebhookURLExists                           = "WEBHOOK_URL_EXISTS",
    GroupExists                                = "GROUP_EXISTS",
    PrimaryBankAccountNotFound                 = "PRIMARY_BANK_ACCOUNT_NOT_FOUND",
    MustHaveAPrimaryBankAccount                = "MUST_HAVE_A_PRIMARY_BANK_ACCOUNT",
    VerificationDataExists                     = "VERIFICATION_DATA_EXISTS",
    TemplateExists                             = "TEMPLATE_EXISTS",
    ResourceLimitReached                       = "RESOURCE_LIMIT_REACHED",

    /* payments and charges */
    InvalidToken                               = "INVALID_TOKEN",
    InvalidCard                                = "INVALID_CARD",
    ForbiddenIP                                = "FORBIDDEN_IP",
    InvalidUserData                            = "INVALID_USER_DATA",
    NonUniqueActiveToken                       = "NON_UNIQUE_ACTIVE_TOKEN",
    TransactionAlreadyProcessed                = "TRANSACTION_ALREADY_PROCESSED",
    TransactionTokenExpired                    = "TRANSACTION_TOKEN_EXPIRED",
    RecurringTokenNotAllowed                   = "RECURRING_TOKEN_NOT_ALLOWED",
    RecurringTokenDisabled                     = "RECURRING_TOKEN_DISABLED",
    RecurringUsageLimitRequired                = "RECURRING_USAGE_LIMIT_REQUIRED",
    CardProcessingDisabled                     = "CARD_PROCESSING_DISABLED",
    QRProcessingDisabled                       = "QR_PROCESSING_DISABLED",
    ConvenienceProcessingDisabled              = "CONVENIENCE_PROCESSING_DISABLED",
    NotOneTimeToken                            = "NOT_ONE_TIME_TOKEN",
    NotLumpSum                                 = "NOT_LUMP_SUM",
    NotSubscriptionToken                       = "NOT_SUBSCRIPTION_TOKEN",
    NotRecurringToken                          = "NOT_RECURRING_TOKEN",
    CurrencyMustMatchCharge                    = "CURRENCY_MUST_MATCH_CHARGE",
    RefundNotWithinBounds                      = "REFUND_NOT_WITHIN_BOUNDS",
    InvalidTransfer                            = "INVALID_TRANSFER",
    TransferAlreadyExists                      = "TRANSFER_ALREADY_EXISTS",
    NoLedgers                                  = "NO_LEDGERS",
    LiveModeNotEnabledWhenUnverified           = "LIVE_MODE_NOT_ENABLED_WHEN_UNVERIFIED",
    SelfTransferNotPermitted                   = "SELF_TRANSFER_NOT_PERMITTED",
    CardLocked                                 = "CARD_LOCKED",
    SubscriptionProcessing                     = "SUBSCRIPTION_PROCESSING",
    AlreadyCaptured                            = "ALREADY_CAPTURED",
    CaptureAmountTooLarge                      = "CAPTURE_AMOUNT_TOO_LARGE",
    PartialCaptureNotSupported                 = "PARTIAL_CAPTURE_NOT_SUPPORTED",
    NoGatewaysAvailable                        = "NO_GATEWAY_AVAILABLE",

    /* validation responses */
    VerificationRequired                       = "VERIFICATION_REQUIRED",
    ChangeProhibited                           = "CHARGE_PROHIBITED",
    ForbiddenParameter                         = "FORBIDDEN_PARAMETER",
    ValidationError                            = "VALIDATION_ERROR",
    RequiredValue                              = "REQUIRED_VALUE",
    InvalidFormat                              = "INVALID_FORMAT",
    InvalidPercentFee                          = "INVALID_PERCENT_FEE",
    InvalidCardNumber                          = "INVALID_CARD_NUMBER",
    InvalidCardExpiration                      = "INVALID_CARD_EXPIRATION",
    InvalidCVV                                 = "INVALID_CVV",
    InvalidFormatLength                        = "INVALID_FORMAT_LENGTH",
    InvalidFormatUUID                          = "INVALID_UUID",
    InvalidFormatBase64                        = "INVALID_FORMAT_BASE64",
    InvalidFormatEmail                         = "INVALID_FORMAT_EMAIL",
    InvalidFormatCurrency                      = "INVALID_FORMAT_CURRENCY",
    InvalidCurrency                            = "INVALID_CURRENCY",
    InvalidAmount                              = "INVALID_AMOUNT",
    InvalidEventForStore                       = "INVALID_EVENT_FOR_STORE",
    InvalidFormatDomain                        = "INVALID_FORMAT_DOMAIN",
    InvalidFormatUrl                           = "INVALID_FORMAT_URL",
    InvalidFormatObject                        = "INVALID_FORMAT_OBJECT",
    InvalidFormatCountry                       = "INVALID_FORMAT_COUNTRY",
    InvalidPhoneNumber                         = "INVALID_PHONE_NUMBER",
    InvalidFormatSwiftCode                     = "INVALID_FORMAT_SWIFT_CODE",
    InvalidFormatRoutingNumber                 = "INVALID_FORMAT_ROUTING_NUMBER",
    InvalidFormatRoutingCode                   = "INVALID_FORMAT_ROUTING_CODE",
    InvalidFormatIfcsCode                      = "INVALID_FORMAT_IFCS_CODE",
    InvalidFormatBankAccountNumber             = "INVALID_FORMAT_BANK_ACCOUNT_NUMBER",
    InvalidPasswords                           = "INVALID_PASSWORDS",
    InvalidTimePeriod                          = "INVALID_TIME_PERIOD",
    InvalidDayOfWeek                           = "INVALID_DAY_OF_WEEK",
    InvalidWeekOfMonth                         = "INVALID_WEEK_OF_MONTH",
    InvalidDayOfMonth                          = "INVALID_DAY_OF_MONTH",
    InvalidColorsSize                          = "INVALID_COLOR_SIZE",
    NestedJsonNotAllowed                       = "NESTED_JSON_NOT_ALLOWED",
    InvalidFormatDate                          = "INVALID_FORMAT_DATE",
    InvalidChargeStatus                        = "INVALID_CHARGE_STATUS",
    InvalidQRScanGateway                       = "INVALID_QR_SCAN_GATEWAY",
    CardLimitExceededForStore                  = "CARD_LIMIT_EXCEEDED_FOR_STORE",
    InvalidLanguage                            = "INVALID_LANGUAGE",
    SubscriptionNotAllowed                     = "SUBSCRIPTION_NOT_ALLOWED",
    OneTimeOnlyAllowed                         = "ONE_TIME_ONLY_ALLOWED",
    AuthExpired                                = "AUTH_EXPIRED",
    InvalidTemplateKey                         = "INVALID_TEMPLATE_KEY",
    NonPublicTemplate                          = "NON_PUBLIC_TEMPLATE",
    OnlyJapanesePhoneNumberAllowed             = "ONLY_JAPANESE_PHONE_NUMBER_ALLOWED",
    ExpirationDateOutOfBounds                  = "EXPIRATION_DATE_OUT_OF_BOUNDS",
    UnsupportedLanguage                        = "UNSUPPORTED_LANGUAGE",
    DefaultLanguageNotSupported                = "DEFAULT_LANGUAGE_NOT_SUPPORTED",
    CaptureOnlyForCardPayment                  = "CAPTURE_ONLY_FOR_CARD_PAYMENT",
    InvalidScheduledCaptureDate                = "INVALID_SCHEDULED_CAPTURE_DATE",
    InvalidMerchantStatus                      = "INVALID_MERCHANT_STATUS",
    IncoherentDateRange                        = "INCOHERENT_DATE_RANGE",
    MustHaveOneElement                         = "MUST_HAVE_ONE_ELEMENT",
    ChargeAmountTooLow                         = "CHARGE_AMOUNT_TOO_LOW",

    /* invalid card errors */
    BinNotFound                                = "BIN_NOT_FOUND",
    LuhnCheckFailed                            = "LUHN_CHECK_FAILED",
    InvalidCardNumberLength                    = "INVALID_CARD_NUMBER_LENGTH",
    CardPaymentDisabled                        = "CARD_PAYMENT_DISABLED",
    DebitDisabled                              = "DEBIT_DISABLED",
    PrepaidDisabled                            = "PREPAID_DISABLED",
    CountryNotSupported                        = "COUNTRY_NOT_SUPPORTED",
    CardBrandNotSupported                      = "CARD_BRAND_NOT_SUPPORTED",
    Unspecified                                = "UNSPECIFIED",

    /** Used when creating a new Platform */
    MerchantConsoleURIExists                   = "MERCHANT_CONSOLE_URI_EXISTS",

    /** Used when creating a new Merchant */
    OnlyASCII                                  = "ONLY_ASCII",
    UniqueCharacters                           = "UNIQUE_CHARACTERS",
    AtLeastOneDigit                            = "AT_LEAST_ONE_DIGIT",
    AtLeastOneLetter                           = "AT_LEAST_ONE_LETTER",
    EmptyRoles                                 = "EMPTY_ROLES",
    EditOwnRolesNotAllowed                     = "EDIT_OWN_ROLES_NOT_ALLOWED",
    InvalidCardBrand                           = "INVALID_CARD_BRAND",
    UnsupportedCountry                         = "UNSUPPORTED_COUNTRY",
    UnsupportedCurrency                        = "UNSUPPORTED_CURRENCY",
    CannotBanSelf                              = "CANNOT_BAN_SELF",
    NoDuplicateCurrencies                      = "NO_DUPLICATE_CURRENCIES",

    PlatformNotFound                           = "PLATFORM_NOT_FOUND",
    InvalidPlatform                            = "INVALID_PLATFORM",
    InvalidInvoiceFeeConfiguration             = "INVALID_INVOICE_FEE_CONFIGURATION",
    InvalidPlatformRole                        = "INVALID_PLATFORM_ROLE",

    /* verification */
    DataNotSubmitted                           = "DATA_NOT_SUBMITTED",
    NoBankAccount                              = "NO_BANK_ACCOUNT",
    PercentFeeNotSubmitted                     = "PERCENT_FEE_NOT_SUBMITTED",
    InsufficientSystemManagerInfo              = "INSUFFICIENT_SYSTEM_MANAGER_INFO",

    /* gateway credentials */
    CredentialsExist                           = "CREDENTIALS_EXISTS",
    RefundExceedsChargeAmount                  = "REFUND_EXCEEDS_CHARGE_AMOUNT",
    CannotRefundUnsuccessfulCharge             = "CANNOT_REFUND_UNSUCCESSFUL_CHARGE",
    RefundNotAllowed                           = "REFUND_NOT_ALLOWED",
    CancelNotAllowed                           = "CANCEL_NOT_ALLOWED",

    /* apple pay */
    ApplePayNotEnabled                         = "APPLE_PAY_NOT_ENABLED",
    ApplePayAlreadyEnabled                     = "APPLE_PAY_ALREADY_ENABLED",
    ApplePayCertificateAlreadyUpdated          = "APPLE_PAY_CERTIFICATE_ALREADY_UPDATED",
    ApplePayUnsupportedAlgorithm               = "APPLE_PAY_UNSUPPORTED_ALGORITHM",
    ApplePayCertificateNotFound                = "APPLE_PAY_CERTIFICATE_NOT_FOUND",
    ApplePayUnableToGenerateCertificateRequest = "APPLE_PAY_uNABLE_TO_GENERATE_CERTIFICATE_REQUEST",
    ApplePayInvalidConfiguration               = "APPLE_PAY_INVALID_CONFIGURATION",
    ApplePayInvalidCertificate                 = "APPLE_PAY_INVALID_CERTIFICATE",
    ApplePayInvalidAlgorithm                   = "APPLE_PAY_INVALID_ALGORITHM",
    ApplePayInvalidCertificateFormat           = "APPLE_PAY_INVALID_CERTIFICATE_FORMAT",
    ApplePayInvalidSignature                   = "APPLE_PAY_INVALID_SIGNATURE",
    ApplePayError                              = "APPLE_PAY_ERROR",
    UnableToGenerateCertificateRequest         = "UNABLE_TO_GENERATE_CERTIFICATE_REQUEST",
    InvalidMerchantSettings                    = "INVALID_MERCHANT_SETTINGS",
    UnsupportedAlgorithm                       = "UNSUPPORTED_ALGORITHM",
    InvalidPaymentToken                        = "INVALID_PAYMENT_TOKEN",
    ExpiredPaymentToken                        = "EXPIRED_PAYMENT_TOKEN",
    InvalidCertificate                         = "INVALID_CERTIFICATE",
    InvalidLeafCertificate                     = "INVALID_LEAF_CERTIFICATE",
    InvalidIntermediateCertificate             = "INVALID_INTERMEDIATE_CERTIFICATE",
    InvalidChainOfTrust                        = "INVALID_CHAIN_OF_TRUST",
    InvalidSignature                           = "INVALID_SIGNATURE",

    /* idempotency */
    IdempotencyKeyConflict                     = "IDEMPOTENCY_KEY_CONFLICT",

    /* BannedCards */
    CardBanned                                 = "CARD_BANNED",
    // CRUD
    CardAlreadyBanned                          = "CARD_ALREADY_BANNED",
    CardNotBanned                              = "CARD_NOT_BANNED",

    /** Installments */
    SubscriptionAlreadyCanceled                      = "SUBSCRIPTION_ALREADY_CANCELED",
    SubscriptionNotFound                             = "SUBSCRIPTION_NOT_FOUND",
    InstallmentPlanNotFound                          = "INSTALLMENT_PLAN_NOT_FOUND",
    InstallmentInvalidPlan                           = "INSTALLMENT_INVALID_PLAN",
    InstallmentInvalidPlanType                       = "INSTALLMENT_INVALID_PLAN_TYPE",
    InstallmentInvalidInitialAmount                  = "INSTALLMENT_INVALID_INITIAL_AMOUNT",
    InstallmentInitialAmountsNotSupportedByProcessor = "INSTALLMENT_INITIAL_AMOUNTS_NOT_SUPPORTED_BY_PROCESSOR",
    InstallmentAlreadySet                            = "INSTALLMENT_ALREADY_SET",
    InstallmentMaxPayoutPeriodExceeded               = "INSTALLMENT_MAX_PAYOUT_PERIOD_EXCEEDED",
    InstallmentInsufficientAmountPerCharge           = "INSTALLMENT_INSUFFICIENT_AMOUNT_PER_CHARGE",
    InstallmentRevolvingPlanCannotHaveInitialAmount  = "INSTALLMENT_REVOLVING_PLAN_CANNOT_HAVE_INITIAL_AMOUNT",
    InstallmentsNotEnabled                           = "INSTALLMENTS_NOT_ENABLED",
    InstallmentInvalidCyclesCount                    = "INSTALLMENT_INVALID_CYCLES_COUNT",

    /* path bindables */
    InvalidElasticIndex                        = "INVALID_ELASTIC_INDEX",
    InvalidDateHistogramInterval               = "INVALID_DATE_HISTORY_INTERVAL",
    InvalidSqsEndpointKey                      = "INVALID_SQS_ENDPOINT_KEY"
}

export class APIError extends Error {

    status: number;
    response: any;

    constructor(status: number, response?: any) {
        super();
        this.status = status;
        this.response = Object.keys(response  || {}).length !== 0 ? response : null;
        Object.setPrototypeOf(this, APIError.prototype);
    }

}
