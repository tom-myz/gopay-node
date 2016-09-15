"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resource_1 = require("./Resource");

var CRUDResource = function (_Resource_1$Resource) {
    (0, _inherits3.default)(CRUDResource, _Resource_1$Resource);

    function CRUDResource(api) {
        (0, _classCallCheck3.default)(this, CRUDResource);

        var _this = (0, _possibleConstructorReturn3.default)(this, _Resource_1$Resource.call(this, api));

        _this._routeBase = _this.constructor.routeBase;
        return _this;
    }

    CRUDResource.prototype._listRoute = function _listRoute(required) {
        return this.defineRoute("GET", this._routeBase, required);
    };

    CRUDResource.prototype._createRoute = function _createRoute(required) {
        return this.defineRoute("POST", this._routeBase, required);
    };

    CRUDResource.prototype._getRoute = function _getRoute(required) {
        return this.defineRoute("GET", this._routeBase + "/:id", required);
    };

    CRUDResource.prototype._updateRoute = function _updateRoute(required) {
        return this.defineRoute("PATCH", this._routeBase + "/:id", required);
    };

    CRUDResource.prototype._deleteRoute = function _deleteRoute(required) {
        return this.defineRoute("DELETE", this._routeBase + "/:id", required);
    };

    return CRUDResource;
}(Resource_1.Resource);

exports.CRUDResource = CRUDResource;
//# sourceMappingURL=CRUDResource.js.map