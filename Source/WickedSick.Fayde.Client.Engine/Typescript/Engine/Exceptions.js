var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Exception = (function () {
    function Exception(message) {
        this.Message = message;
    }
    return Exception;
})();
var ArgumentException = (function (_super) {
    __extends(ArgumentException, _super);
    function ArgumentException(message) {
        _super.call(this, message);
    }
    return ArgumentException;
})(Exception);
var InvalidOperationException = (function (_super) {
    __extends(InvalidOperationException, _super);
    function InvalidOperationException(message) {
        _super.call(this, message);
    }
    return InvalidOperationException;
})(Exception);
//@ sourceMappingURL=Exceptions.js.map
