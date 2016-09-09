"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var application_token_1 = require("../validation/schemas/application-token");

var ApplicationTokens = function (_CRUDResource_1$CRUDR) {
    _inherits(ApplicationTokens, _CRUDResource_1$CRUDR);

    function ApplicationTokens() {
        _classCallCheck(this, ApplicationTokens);

        return _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    ApplicationTokens.prototype.list = function list(storeId, callback, data, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._listRoute(params, data, callback, { token: token });
    };

    ApplicationTokens.prototype.create = function create(storeId, callback, merchantId, token) {
        var params = { storeId: storeId, merchantId: merchantId };
        return this._createRoute(params, null, callback, { token: token });
    };

    ApplicationTokens.prototype.update = function update(storeId, id, data, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: application_token_1.applicationTokenUpdateSchema });
    };

    ApplicationTokens.prototype.delete = function _delete(storeId, id, callback, merchantId, token) {
        var params = { id: id, storeId: storeId, merchantId: merchantId };
        return this._deleteRoute(params, null, callback, { token: token });
    };

    return ApplicationTokens;
}(CRUDResource_1.CRUDResource);

ApplicationTokens.routeBase = "/(merchants/:merchantId/)stores/:storeId/app_tokens";
exports.ApplicationTokens = ApplicationTokens;
//# sourceMappingURL=ApplicationTokens.js.map
