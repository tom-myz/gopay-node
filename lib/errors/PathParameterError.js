"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PathParameterError = function (_Error) {
    _inherits(PathParameterError, _Error);

    function PathParameterError(parameter) {
        _classCallCheck(this, PathParameterError);

        var message = "[RequestError] Required url parameter '" + parameter + "' is not defined.";
        return _possibleConstructorReturn(this, _Error.call(this, message));
    }

    return PathParameterError;
}(Error);

exports.PathParameterError = PathParameterError;
//# sourceMappingURL=PathParameterError.js.map