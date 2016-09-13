"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Resource = function () {
    function Resource(api) {
        _classCallCheck(this, Resource);

        this.api = api;
    }

    Resource.compilePath = function compilePath(path, pathParams) {
        return path.replace(/\((\w|:|\/)+\)/ig, function (o) {
            var part = o.replace(/:(\w+)/ig, function (s, p) {
                return pathParams[p] || s;
            });
            return part.indexOf(":") === -1 ? part.replace(/\(|\)/g, "") : "";
        }).replace(/:(\w+)/ig, function (s, p) {
            return pathParams[p] || s;
        });
    };

    Resource.prototype.defineRoute = function defineRoute(method, path) {
        var api = this.api;
        return function route(pathParams, data, callback, options) {
            var url = Resource.compilePath(path, pathParams);
            var cb = callback || function (err, result) {
                return null;
            };
            function getBody() {
                if (data instanceof FormData) {
                    return data;
                } else if ((typeof data === "undefined" ? "undefined" : _typeof(data)) === "object" && ["GET", "DELETE"].indexOf(method) === -1) {
                    return JSON.stringify(data);
                }
                return null;
            }
            function getUrl(_url) {
                var queryString = void 0;
                if (["GET", "DELETE"].indexOf(method) !== -1) {
                    queryString = Object.keys(data || {}).map(function (k) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
                    }).join("&");
                }
                return queryString ? _url + "?" + queryString : _url;
            }
            return api.send({ body: getBody(), method: method, url: getUrl(url) }, cb, options);
        };
    };

    return Resource;
}();

exports.Resource = Resource;
//# sourceMappingURL=Resource.js.map