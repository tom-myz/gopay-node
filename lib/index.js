"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaymentsSDK_1 = require("./PaymentsSDK");

var SDK = function (_PaymentsSDK_1$Paymen) {
    _inherits(SDK, _PaymentsSDK_1$Paymen);

    function SDK(options) {
        _classCallCheck(this, SDK);

        return _possibleConstructorReturn(this, _PaymentsSDK_1$Paymen.call(this, options));
    }

    return SDK;
}(PaymentsSDK_1.PaymentsSDK);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SDK;
//# sourceMappingURL=index.js.map