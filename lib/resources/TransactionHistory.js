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

var TransactionHistory = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(TransactionHistory, _CRUDResource_1$CRUDR);

    function TransactionHistory() {
        (0, _classCallCheck3.default)(this, TransactionHistory);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    TransactionHistory.prototype.list = function list(storeId, data, callback) {
        return this._listRoute()(data, callback, null, storeId);
    };

    return TransactionHistory;
}(CRUDResource_1.CRUDResource);

TransactionHistory.routeBase = "(/stores/:storeId)/transaction_history";
exports.TransactionHistory = TransactionHistory;
//# sourceMappingURL=TransactionHistory.js.map
//# sourceMappingURL=TransactionHistory.js.map
//# sourceMappingURL=TransactionHistory.js.map
//# sourceMappingURL=TransactionHistory.js.map
//# sourceMappingURL=TransactionHistory.js.map
//# sourceMappingURL=TransactionHistory.js.map