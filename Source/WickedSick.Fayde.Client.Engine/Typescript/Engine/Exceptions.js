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
    Exception.prototype.toString = function () {
        var typeName = (this).constructor._TypeName;
        if(typeName) {
            return typeName + ": " + this.Message;
        }
        return this.Message;
    };
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
var IndexOutOfRangeException = (function (_super) {
    __extends(IndexOutOfRangeException, _super);
    function IndexOutOfRangeException(index) {
        _super.call(this, index.toString());
    }
    return IndexOutOfRangeException;
})(Exception);
Nullstone.RegisterType(IndexOutOfRangeException, "IndexOutOfRangeException");
var AttachException = (function (_super) {
    __extends(AttachException, _super);
    function AttachException(message, data) {
        _super.call(this, message);
        this.Data = data;
    }
    return AttachException;
})(Exception);
Nullstone.RegisterType(AttachException, "AttachException");
var InvalidJsonException = (function (_super) {
    __extends(InvalidJsonException, _super);
    function InvalidJsonException(jsonText, innerException) {
        _super.call(this, "Invalid json.");
        this.JsonText = jsonText;
        this.InnerException = innerException;
    }
    return InvalidJsonException;
})(Exception);
Nullstone.RegisterType(InvalidJsonException, "InvalidJsonException");
var TargetInvocationException = (function (_super) {
    __extends(TargetInvocationException, _super);
    function TargetInvocationException(message, innerException) {
        _super.call(this, message);
        this.InnerException = innerException;
    }
    return TargetInvocationException;
})(Exception);
Nullstone.RegisterType(TargetInvocationException, "TargetInvocationException");
//@ sourceMappingURL=Exceptions.js.map
