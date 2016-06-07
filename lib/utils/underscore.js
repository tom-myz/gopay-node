"use strict";
var decamelize = require("decamelize");
function underscore(obj) {
    return Object.keys(obj).reduce(function (r, k) {
        var c = function (o) { return typeof o === "object" && Boolean(o); };
        var v = obj[k];
        if (c(v)) {
            if (Array.isArray(v)) {
                v = v.map(function (i) { return c(i) ? underscore(i) : i; });
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