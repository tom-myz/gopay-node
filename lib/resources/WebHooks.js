"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var WebHooks = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(WebHooks, _CRUDResource_1$CRUDR);

    function WebHooks() {
        (0, _classCallCheck3.default)(this, WebHooks);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    WebHooks.prototype.list = function list(storeId, data, callback) {
        return this._listRoute()(data, callback, ["storeId"], storeId);
    };

    WebHooks.prototype.create = function create(storeId, data, callback) {
        return this._createRoute(["name"])(data, callback, ["storeId"], storeId);
    };

    WebHooks.prototype.get = function get(storeId, id, data, callback) {
        return this._getRoute()(data, callback, ["storeId", "id"], storeId, id);
    };

    WebHooks.prototype.update = function update(storeId, id, data, callback) {
        return this._updateRoute()(data, callback, ["storeId", "id"], storeId, id);
    };

    WebHooks.prototype.delete = function _delete(storeId, id, data, callback) {
        return this._deleteRoute()(data, callback, ["storeId", "id"], storeId, id);
    };

    return WebHooks;
}(CRUDResource_1.CRUDResource);

WebHooks.routeBase = "/stores/:storeId/webhooks";
exports.WebHooks = WebHooks;
//# sourceMappingURL=WebHooks.js.map