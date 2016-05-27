namespace NodeFetch {

    type HeadersObject = { [key: string]: string }

    enum Method {
        GET,
        POST,
        PUT,
        DELETE,
        PATCH,
        HEAD,
        OPTION
    }

    declare class Headers {
        constructor(init?: HeadersObject): Headers
        append(name: string, value: string): void;
        delete(name: string):void;
        get(name: string): string;
        getAll(name: string): Array<string>;
        has(name: string): boolean;
        set(name: string, value: string): void;
        forEach(callback: (value: string, name: string) => void): void;
    }

    declare class Body {
        bodyUsed: boolean;
        json(): Promise<any>;
        json<T>(): Promise<T>;
        text(): Promise<string>;
    }

    interface RequestInit {
        method?: Method
        headers?: Headers
        body?: any
        mode?: any
        credentials?: any
        cache?: any
        redirect?: any
        referrer?: any
        integrity?: any
    }

    declare class Request extends Body {
        constructor(input?: string | Request, init?: RequestInit): Request
        method: Method
        redirect: string
        headers: Headers
        url: string
        clone(): Request
    }

    interface ResponseInit {
        status?: number
        statusText?: string
        headers?: HeadersObject
    }

    declare class Response extends Body {
        constructor(body?: any, init?: ResponseInit): Response
        ok: boolean
        headers: Headers
        status: number
        statusText: string
        url: string
        clone(): Response
    }

    function fetch (url: string, opts?: any): Promise<any>
}

declare module "node-fetch/lib/headers" {

}

declare module "node-fetch/lib/response" {

}

declare module "node-fetch/lib/request" {

}

declare module "node-fetch/lib/body" {

}


declare module "node-fetch" {
    import Headers from "node-fetch/lib/headers"
    import Response from "node-fetch/lib/response"
    import Request from "node-fetch/lib/request"
    import Body from "node-fetch/lib/body"

    const fetch: Fetch = NodeFetch.Fetch

    export {
        fetch,
        Headers,
        Response,
        Request,
        Body
    }
}
