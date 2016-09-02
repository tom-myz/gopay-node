export declare function credentialsCreateSchema(gateway: string): {
    gateway: string;
    currencies: string;
    credentials: string;
} & {};
export declare function credentialsUpdateSchema(gateway: string): {
    gateway: string;
    currencies: string;
    credentials: string;
} & {};
export declare function credentialsPayvision(prefix?: string, required?: Boolean): {};
export declare function credentialsWorldpay(prefix?: string, required?: Boolean): {};
export declare function credentialsWirecard(prefix?: string, required?: Boolean): {};
export declare function credentialsAlliedWallet(prefix?: string, required?: Boolean): {};
