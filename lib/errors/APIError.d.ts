export declare class APIError extends Error {
    status: number;
    response: any;
    constructor(status: number, response?: any, route?: string);
}
