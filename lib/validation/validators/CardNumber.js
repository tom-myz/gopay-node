"use strict";
var utils_1 = require("../../utils");
var CardNumber = (function () {
    function CardNumber() {
        this.error = "INVALID_FORMAT_CARD_NUMBER";
    }
    CardNumber.prototype.valid = function (value) {
        if (utils_1.isEmpty(value)) {
            return true;
        }
        var v = value.toString();
        var regex = new RegExp("^(?:4[0-9]{12}(?:[0-9]{3})?|" +
            "5[1-5][0-9]{14}|3[47][0-9]{13}|" +
            "3(?:0[0-5]|[68][0-9])[0-9]{11}|" +
            "6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$");
        return v.match(regex) !== null;
    };
    return CardNumber;
}());
exports.CardNumber = CardNumber;
//# sourceMappingURL=CardNumber.js.map