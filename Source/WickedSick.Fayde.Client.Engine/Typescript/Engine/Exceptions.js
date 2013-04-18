var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
var Exception = (function () {
    function Exception(message) {
        this.Message = message;
    }
    return Exception;
})();
Nullstone.RegisterType(Exception, "Exception");
var ArgumentException = (function (_super) {
    __extends(ArgumentException, _super);
    function ArgumentException(message) {
        _super.call(this, message);
    }
    return ArgumentException;
})(Exception);
Nullstone.RegisterType(ArgumentException, "ArgumentException");
var InvalidOperationException = (function (_super) {
    __extends(InvalidOperationException, _super);
    function InvalidOperationException(message) {
        _super.call(this, message);
    }
    return InvalidOperationException;
})(Exception);
Nullstone.RegisterType(InvalidOperationException, "InvalidOperationException");
var XamlParseException = (function (_super) {
    __extends(XamlParseException, _super);
    function XamlParseException(message) {
        _super.call(this, message);
    }
    return XamlParseException;
})(Exception);
Nullstone.RegisterType(XamlParseException, "XamlParseException");
var NotSupportedException = (function (_super) {
    __extends(NotSupportedException, _super);
    function NotSupportedException(message) {
        _super.call(this, message);
    }
    return NotSupportedException;
})(Exception);
Nullstone.RegisterType(NotSupportedException, "NotSupportedException");
//@ sourceMappingURL=Exceptions.js.map
