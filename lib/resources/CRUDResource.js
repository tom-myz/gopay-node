"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource_1 = require("./Resource");

var CRUDResource = function (_Resource_1$Resource) {
    _inherits(CRUDResource, _Resource_1$Resource);

    function CRUDResource(api) {
        _classCallCheck(this, CRUDResource);

        var _this = _possibleConstructorReturn(this, _Resource_1$Resource.call(this, api));

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