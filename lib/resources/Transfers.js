"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var Transfers = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(Transfers, _CRUDResource_1$CRUDR);

    function Transfers() {
        (0, _classCallCheck3.default)(this, Transfers);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Transfers.prototype.list = function list(data, callback) {
        return this._listRoute()(data, callback);
    };

    Transfers.prototype.get = function get(id, data, callback) {
        return this._getRoute()(data, callback, ["id"], id);
    };

    return Transfers;
}(CRUDResource_1.CRUDResource);

Transfers.routeBase = "/transfers";
exports.Transfers = Transfers;
//# sourceMappingURL=Transfers.js.map