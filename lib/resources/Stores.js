"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");

var Stores = function (_CRUDResource_1$CRUDR) {
    _inherits(Stores, _CRUDResource_1$CRUDR);

    function Stores() {
        _classCallCheck(this, Stores);

        return _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Stores.prototype.list = function list(data, callback, _params) {
        return this._listRoute()(_params, null, callback);
    };

    Stores.prototype.create = function create(data, callback, _params) {
        return this._createRoute(null, ["name"])(_params, data, callback);
    };

    Stores.prototype.get = function get(id, callback, _params) {
        var params = Object.assign({ id: id }, _params);
        return this._getRoute(["id"])(params, null, callback);
    };

    Stores.prototype.update = function update(id, data, callback, _params) {
        var params = Object.assign({ id: id }, _params);
        return this._updateRoute(["id"])(params, data, callback);
    };

    Stores.prototype.delete = function _delete(id, callback, _params) {
        var params = Object.assign({ id: id }, _params);
        return this._deleteRoute(["id"])(params, null, callback);
    };

    return Stores;
}(CRUDResource_1.CRUDResource);

Stores.routeBase = "/stores";
exports.Stores = Stores;
//# sourceMappingURL=Stores.js.map