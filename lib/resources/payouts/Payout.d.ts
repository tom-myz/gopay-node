export interface PPayout {
    id?: string;
    chargeId?: string;
    transferId?: string;
    amount?: number;
    platformFee?: number;
    currency?: string;
    status?: string;
    metadata?: Object;
    createdOn?: number;
    updatedOn?: number;
}
