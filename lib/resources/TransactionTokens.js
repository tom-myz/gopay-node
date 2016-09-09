"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var transaction_token_1 = require("../validation/schemas/transaction-token");

var TransactionTokens = function (_CRUDResource_1$CRUDR) {
    _inherits(TransactionTokens, _CRUDResource_1$CRUDR);

    function TransactionTokens() {
        _classCallCheck(this, TransactionTokens);

        return _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    TransactionTokens.prototype.create = function create(data, callback) {
        var validationSchema = transaction_token_1.getTransactionTokenSchema(data.type);
        return this._createRoute(null, data, callback, { validationSchema: validationSchema });
    };

    TransactionTokens.prototype.get = function get(id, callback, token) {
        var params = { id: id };
        return this._getRoute(params, null, callback, { token: token });
    };

    TransactionTokens.prototype.delete = function _delete(id, callback, token) {
        var params = { id: id };
        return this._deleteRoute(params, null, callback, { token: token });
    };

    return TransactionTokens;
}(CRUDResource_1.CRUDResource);

TransactionTokens.routeBase = "/tokens";
exports.TransactionTokens = TransactionTokens;
//# sourceMappingURL=TransactionTokens.js.map