"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RestAPI_1 = require("./api/RestAPI");

var PaymentsSDK = function PaymentsSDK(options) {
    _classCallCheck(this, PaymentsSDK);

    this.api = new RestAPI_1.RestAPI(options);
};

exports.PaymentsSDK = PaymentsSDK;
//# sourceMappingURL=PaymentsSDK.js.map