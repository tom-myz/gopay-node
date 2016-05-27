import fetch from "node-fetch"

interface RequestOptions {

}

export class Request {

    static create(): Request {
        return new Request()
    }

    send(options?: string): any {

    }

}
