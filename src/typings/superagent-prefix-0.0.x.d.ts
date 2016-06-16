declare module "superagent-prefix" {
    import superagent = require("superagent")

    function prefix (prefix: string): (request: superagent.Request<any>) => superagent.Request<any>

    export = prefix
}
