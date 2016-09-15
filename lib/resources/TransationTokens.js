"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var CRUDResource_1 = require("./CRUDResource");

var TransactionTokens = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(TransactionTokens, _CRUDResource_1$CRUDR);

    function TransactionTokens() {
        (0, _classCallCheck3.default)(this, TransactionTokens);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    TransactionTokens.prototype.create = function create(data, callback) {
        return this._createRoute()(data, callback);
    };

    TransactionTokens.prototype.get = function get(id, data, callback) {
        return this._getRoute()(data, callback, ["id"], id);
    };

    TransactionTokens.prototype.delete = function _delete(id, data, callback) {
        return this._deleteRoute()(data, callback, ["id"], id);
    };

    return TransactionTokens;
}(CRUDResource_1.CRUDResource);

TransactionTokens.routeBase = "/tokens";
exports.TransactionTokens = TransactionTokens;
//# sourceMappingURL=TransationTokens.js.map
//# sourceMappingURL=TransationTokens.js.map
//# sourceMappingURL=TransationTokens.js.map
//# sourceMappingURL=TransationTokens.js.map