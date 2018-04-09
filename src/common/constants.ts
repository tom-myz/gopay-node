/**
 *  @internal
 *  @module Constants
 */

export const DEFAULT_ENDPOINT: string = "https://api.gopay.jp";
export const ENV_KEY_ENDPOINT: string = "GOPAY_ENDPOINT";
export const ENV_KEY_APP_ID: string = "GOPAY_APP_ID";
export const ENV_KEY_SECRET: string = "GOPAY_SECRET";
export const POLLING_TIMEOUT: number = 600000; // 10 minutes
export const IDEMPOTENCY_KEY_HEADER: string = "Idempotency-Key";
