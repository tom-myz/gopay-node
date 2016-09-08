"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CRUDResource_1 = require("./CRUDResource");
var ledger_1 = require("../validation/schemas/ledger");

var Ledger = function (_CRUDResource_1$CRUDR) {
    _inherits(Ledger, _CRUDResource_1$CRUDR);

    function Ledger() {
        _classCallCheck(this, Ledger);

        return _possibleConstructorReturn(this, _CRUDResource_1$CRUDR.apply(this, arguments));
    }

    Ledger.prototype.list = function list(callback, data, token) {
        return this._listRoute(null, data, callback, { token: token });
    };

    Ledger.prototype.update = function update(id, data, callback, token) {
        var params = { id: id };
        return this._updateRoute(params, data, callback, { token: token, validationSchema: ledger_1.ledgerUpdateSchema });
    };

    return Ledger;
}(CRUDResource_1.CRUDResource);

Ledger.routeBase = "/ledger";
exports.Ledger = Ledger;
//# sourceMappingURL=Ledger.js.map