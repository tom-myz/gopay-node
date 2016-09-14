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

    Stores.prototype.list = function list(data, callback) {
        return this._listRoute()(null, callback);
    };

    Stores.prototype.create = function create(data, callback) {
        return this._createRoute(["name"])(data, callback);
    };

    Stores.prototype.get = function get(id, callback) {
        return this._getRoute()(null, callback, ["id"]);
    };

    Stores.prototype.update = function update(id, data, callback) {
        return this._updateRoute()(data, callback, ["id"]);
    };

    Stores.prototype.delete = function _delete(id, callback) {
        return this._deleteRoute()(null, callback, ["id"]);
    };

    return Stores;
}(CRUDResource_1.CRUDResource);

Stores.routeBase = "/stores";
exports.Stores = Stores;
//# sourceMappingURL=Stores.js.map