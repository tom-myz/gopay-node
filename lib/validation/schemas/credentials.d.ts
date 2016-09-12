export declare function credentialsCreateSchema(gateway: string): {
    gateway: string;
    currencies: string;
    credentials: string;
} & {
    [x: string]: string;
};
export declare function credentialsUpdateSchema(gateway: string): {
    gateway: string;
    currencies: string;
    credentials: string;
} & {
    [x: string]: string;
};
export declare function credentialsPayvision(prefix?: string, required?: Boolean): {
    [x: string]: string;
};
export declare function credentialsWorldpay(prefix?: string, required?: Boolean): {
    [x: string]: string;
};
export declare function credentialsWirecard(prefix?: string, required?: Boolean): {
    [x: string]: string;
};
export declare function credentialsAlliedWallet(prefix?: string, required?: Boolean): {
    [x: string]: string;
};
