import camelCase from "camelcase"
import { APIError } from "../errors/APIError"
import { transformKeys } from "./object"

export function checkStatus(response: Response): Promise<Response> {
    if (response.status >= 200 && response.status < 400) {
        return Promise.resolve(response)
    }

    return parseJSON(response)
        .then((json: any) => { throw new APIError(response.status, json) })
}

export function parseJSON(response: Response): Promise<any> {
    return response.text()
        .then((text: string) => text ? transformKeys(JSON.parse(text), camelCase) : {})
}
