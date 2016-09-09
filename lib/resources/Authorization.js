"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var authorization_1 = require("../validation/schemas/authorization");

var Authorization = function (_CRUDResource_1$CRUDR) {
    _inherits(Authorization, _CRUDResource_1$CRUDR);

    function Authorization() {
        _classCallCheck(this, Authorization);

        var _this = _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));

        _this._authorizeRoute = _this.defineRoute("POST", "/authenticate");
        return _this;
    }

    Authorization.prototype.authorize = function authorize(data, callback) {
        return this._authorizeRoute(null, data, callback, { validationSchema: authorization_1.authorizeSchema });
    };

    return Authorization;
}(CRUDResource_1.CRUDResource);

exports.Authorization = Authorization;
//# sourceMappingURL=Authorization.js.map