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

        var routeBase = _this.constructor.routeBase;
        _this._listRoute = _this.defineRoute("GET", routeBase);
        _this._createRoute = _this.defineRoute("POST", routeBase);
        _this._getRoute = _this.defineRoute("GET", routeBase + "/:id");
        _this._updateRoute = _this.defineRoute("PATCH", routeBase + "/:id");
        _this._deleteRoute = _this.defineRoute("DELETE", routeBase + "/:id");
        return _this;
    }

    return CRUDResource;
}(Resource_1.Resource);

exports.CRUDResource = CRUDResource;
//# sourceMappingURL=CRUDResource.js.map