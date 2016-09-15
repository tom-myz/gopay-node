"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RestAPI_1 = require("./api/RestAPI");

var PaymentsSDK = function PaymentsSDK(options) {
    (0, _classCallCheck3.default)(this, PaymentsSDK);

    this.api = new RestAPI_1.RestAPI(options);
};

exports.PaymentsSDK = PaymentsSDK;
//# sourceMappingURL=PaymentsSDK.js.map