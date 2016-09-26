"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var Stores = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(Stores, _CRUDResource_1$CRUDR);

    function Stores() {
        (0, _classCallCheck3.default)(this, Stores);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Stores.prototype.list = function list(data, callback) {
        return this._listRoute()(data, callback);
    };

    Stores.prototype.create = function create(data, callback) {
        return this._createRoute(Stores.requiredParams)(data, callback);
    };

    Stores.prototype.get = function get(id, data, callback) {
        return this._getRoute()(data, callback, ["id"], id);
    };

    Stores.prototype.update = function update(id, data, callback) {
        return this._updateRoute()(data, callback, ["id"], id);
    };

    Stores.prototype.delete = function _delete(id, data, callback) {
        return this._deleteRoute()(data, callback, ["id"], id);
    };

    return Stores;
}(CRUDResource_1.CRUDResource);

Stores.requiredParams = ["name"];
Stores.routeBase = "/stores";
exports.Stores = Stores;
//# sourceMappingURL=Stores.js.map