"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("isomorphic-fetch");
var process = require("process");
var decamelize = require("decamelize");
var constants_1 = require("../constants");
var object_1 = require("../utils/object");
var fetch_1 = require("../utils/fetch");
var TimeoutError_1 = require("../errors/TimeoutError");
var parser_1 = require("../errors/parser");

var RestAPI = function () {
    function RestAPI() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        (0, _classCallCheck3.default)(this, RestAPI);

        this.endpoint = options.endpoint || constants_1.DEFAULT_ENDPOINT;
        this.appId = options.appId || process.env[constants_1.ENV_KEY_APP_ID];
        this.secret = options.secret || process.env[constants_1.ENV_KEY_SECRET];
    }

    RestAPI.requestParams = function requestParams(params) {
        return object_1.transformKeys(params, decamelize);
    };

    RestAPI.requestUrl = function requestUrl(url, data, isQueryString) {
        var queryString = void 0;
        if (isQueryString) {
            queryString = Object.keys(data || {}).map(function (k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join("&");
        }
        return queryString ? url + "?" + queryString : url;
    };

    RestAPI.handleSuccess = function handleSuccess(response, resolve, callback) {
        if (typeof callback === "function") {
            callback(response);
        }
        resolve(response);
    };

    RestAPI.handleError = function handleError(error, reject, callback) {
        var err = parser_1.fromError(error);
        if (typeof callback === "function") {
            callback(err);
        }
        reject(err);
    };

    RestAPI.prototype.getBody = function getBody(data, payload) {
        var _object_1$partitionKe = object_1.partitionKeys(data, function (k) {
            return ["appId", "secret"].indexOf(k) !== -1;
        });

        var _ = _object_1$partitionKe[0];
        var _data = _object_1$partitionKe[1];

        return !payload ? JSON.stringify(_data) : null;
    };

    RestAPI.prototype.getHeaders = function getHeaders(data, body) {
        var _object_1$partitionKe2 = object_1.partitionKeys(data, function (k) {
            return ["appId", "secret"].indexOf(k) !== -1;
        });

        var _object_1$partitionKe3 = _object_1$partitionKe2[0];
        var appId = _object_1$partitionKe3.appId;
        var secret = _object_1$partitionKe3.secret;
        var _ = _object_1$partitionKe2[1];

        var headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        if (appId || this.appId) {
            headers.append("Authorization", "ApplicationToken " + (appId || this.appId) + "|" + (secret || this.secret || ""));
        }
        return headers;
    };

    RestAPI.prototype.send = function send(method, url, data, callback) {
        var _this = this;

        var payload = ["GET", "DELETE"].indexOf(method) !== -1;
        var body = this.getBody(data, payload);
        var headers = this.getHeaders(data, body);
        return new Promise(function (resolve, reject) {
            var request = new Request("" + _this.endpoint + RestAPI.requestUrl(url, data, payload), {
                body: body,
                headers: headers,
                method: method,
                mode: "cors"
            });
            fetch(request).then(fetch_1.checkStatus).then(fetch_1.parseJSON).then(function (response) {
                return RestAPI.handleSuccess(response, resolve, callback);
            }).catch(function (error) {
                return RestAPI.handleError(error, reject, callback);
            });
        });
    };

    RestAPI.prototype.longPolling = function longPolling(promise, condition, callback) {
        var interval = arguments.length <= 3 || arguments[3] === undefined ? constants_1.POLLING_INTERVAL : arguments[3];

        var _marked = [poll].map(_regenerator2.default.mark);

        var timeout = arguments.length <= 4 || arguments[4] === undefined ? constants_1.POLLING_TIMEOUT : arguments[4];

        var elapsedTime = 0;
        function pollWait(wait) {
            return new Promise(function (resolve) {
                return setTimeout(function () {
                    elapsedTime += wait;
                    resolve();
                }, wait);
            });
        }
        function poll() {
            return _regenerator2.default.wrap(function poll$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!true) {
                                _context.next = 5;
                                break;
                            }

                            _context.next = 3;
                            return promise();

                        case 3:
                            _context.next = 0;
                            break;

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _marked[0], this);
        }
        function polling() {
            var generator = arguments.length <= 0 || arguments[0] === undefined ? poll() : arguments[0];

            if (elapsedTime >= timeout) {
                return Promise.reject(new TimeoutError_1.TimeoutError(timeout));
            }
            return pollWait(interval).then(function () {
                return generator.next().value;
            }).then(function (response) {
                if (!condition(response)) {
                    return polling(generator);
                }
                return response;
            });
        }
        return new Promise(function (resolve, reject) {
            polling().then(function (response) {
                return RestAPI.handleSuccess(response, resolve, callback);
            }).catch(function (error) {
                return RestAPI.handleError(error, reject, callback);
            });
        });
    };

    return RestAPI;
}();

exports.RestAPI = RestAPI;
//# sourceMappingURL=RestAPI.js.map