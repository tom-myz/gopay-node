"use strict";
var camelcase = require("camelcase");
function camelCase(obj) {
    return Object.keys(obj).reduce(function (r, k) {
        var c = function (o) { return typeof o === "object" && Boolean(o); };
        var v = obj[k];
        if (c(v)) {
            if (Array.isArray(v)) {
                v = v.map(function (i) { return c(i) ? camelCase(i) : i; });
            }
            else {
                v = camelCase(v);
            }
        }
        r[camelcase(k)] = v;
        return r;
    }, {});
}
exports.camelCase = camelCase;
//# sourceMappingURL=camelCase.js.map