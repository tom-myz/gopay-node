"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDResource_1 = require("./CRUDResource");

var Verification = function (_CRUDResource_1$CRUDR) {
    (0, _inherits3.default)(Verification, _CRUDResource_1$CRUDR);

    function Verification() {
        (0, _classCallCheck3.default)(this, Verification);
        return (0, _possibleConstructorReturn3.default)(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Verification.prototype.create = function create(data, callback) {
        return this._createRoute()(data, callback);
    };

    Verification.prototype.get = function get(data, callback) {
        return this.defineRoute("GET", this._routeBase)(data, callback);
    };

    Verification.prototype.update = function update(data, callback) {
        return this.defineRoute("PATCH", this._routeBase)(data, callback);
    };

    return Verification;
}(CRUDResource_1.CRUDResource);

Verification.routeBase = "/verification";
exports.Verification = Verification;
//# sourceMappingURL=Verification.js.map