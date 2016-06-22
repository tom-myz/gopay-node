"use strict";
const camelcase = require("camelcase");
function camelCase(obj) {
    return Object.keys(obj).reduce((r, k) => {
        const c = (o) => typeof o === "object" && Boolean(o);
        let v = obj[k];
        if (c(v)) {
            if (Array.isArray(v)) {
                v = v.map((i) => c(i) ? camelCase(i) : i);
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