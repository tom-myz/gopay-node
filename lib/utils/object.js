"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function transformKeys(obj, transformer) {
    return Object.keys(obj || {}).reduce(function (r, k) {
        var c = function c(o) {
            return (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && Boolean(o);
        };
        var v = obj[k];
        if (c(v)) {
            if (Array.isArray(v)) {
                v = v.map(function (i) {
                    return c(i) ? transformKeys(i, transformer) : i;
                });
            } else {
                v = transformKeys(v, transformer);
            }
        }
        r[transformer(k)] = v;
        return r;
    }, {});
}
exports.transformKeys = transformKeys;
//# sourceMappingURL=object.js.map