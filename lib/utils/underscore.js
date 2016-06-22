"use strict";
const decamelize = require("decamelize");
function underscore(obj) {
    return Object.keys(obj).reduce((r, k) => {
        const c = (o) => typeof o === "object" && Boolean(o);
        let v = obj[k];
        if (c(v)) {
            if (Array.isArray(v)) {
                v = v.map((i) => c(i) ? underscore(i) : i);
            }
            else {
                v = underscore(v);
            }
        }
        r[decamelize(k)] = v;
        return r;
    }, {});
}
exports.underscore = underscore;
//# sourceMappingURL=underscore.js.map