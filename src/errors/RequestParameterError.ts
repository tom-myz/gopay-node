/**
 *  @module Errors
 */

export class RequestParameterError extends Error {

    parameter: string;

    constructor(parameter: string) {
        super();
        this.parameter = parameter;
        Object.setPrototypeOf(this, RequestParameterError.prototype);
    }

}
