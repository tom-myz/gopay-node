export interface ConfigurationItem {
    debitEnabled?: boolean;
    prepaidEnabled?: boolean;
    paymentTypes: Array<string>;
    percentFee?: number;
    waitPeriod?: number;
    transferPeriod?: string;
    logoUrl?: string;
}
export interface ConfigurationParams {
    debitEnabled?: boolean;
    prepaidEnabled?: boolean;
    paymentTypes?: Array<string>;
}
export interface ConfigurationCreateParams extends ConfigurationParams {
}
export interface ConfigurationUpdateParams extends ConfigurationParams {
    logoUrl?: string;
}
