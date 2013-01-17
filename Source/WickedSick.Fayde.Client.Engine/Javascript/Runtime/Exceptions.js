/// <reference path="Nullstone.js"/>
/// CODE

(function (namespace) {
    //#region Exception
    var Exception = Nullstone.Create("Exception", undefined, 3);

    Nullstone.Property(Exception, "message", {
        get: function () {
            return this.Message;
        }
    });

    Exception.Instance.Init = function (message, charPosition, lineNumber) {
        this.Message = message;
        this.CharPosition = charPosition;
        this.LineNumber = lineNumber;
        this.name = this.constructor._TypeName;
    };

    Exception.Instance.toString = function () {
        return this.constructor._TypeName + ": " + this.Message;
    };

    namespace.Exception = Nullstone.FinishCreate(Exception);
    //#endregion

    //#region InvalidOperationException
    var InvalidOperationException = Nullstone.Create("InvalidOperationException", Exception, 3);
    namespace.InvalidOperationException = Nullstone.FinishCreate(InvalidOperationException);
    //#endregion

    //#region InterfaceNotImplementedException
    var InterfaceNotImplementedException = Nullstone.Create("InterfaceNotImplementedException", Exception, 3);

    InterfaceNotImplementedException.Instance.Init = function (type, parentType, methodName) {
        var msg;
        if (methodName)
            msg = type._TypeName + " does not implement " + parentType._TypeName + "." + this.MethodName;
        else
            msg = type._TypeName + " does not implement " + parentType._TypeName;
        this.Init$Exception(msg);

        this.Type = type;
        this.ParentType = parentType;
        this.MethodName = methodName;
    };

    namespace.InterfaceNotImplementedException = Nullstone.FinishCreate(InterfaceNotImplementedException);
    //#endregion

    //#region NotImplementedException
    var NotImplementedException = Nullstone.Create("NotImplementedException", Exception, 1);
    NotImplementedException.Instance.Init = function (methodName) {
        this.MethodName = methodName;
    };
    namespace.NotImplementedException = Nullstone.FinishCreate(NotImplementedException);
    //#endregion

    //#region NotSupportedException
    var NotSupportedException = Nullstone.Create("NotSupportedException", Exception, 3);
    namespace.NotSupportedException = Nullstone.FinishCreate(NotSupportedException);
    //#endregion

    //#region IndexOutOfRangeException
    var IndexOutOfRangeException = Nullstone.Create("IndexOutOfRangeException", Exception, 1);
    IndexOutOfRangeException.Instance.Init = function (index) {
        var msg = "Index is out of range: " + index;
        this.Init$Exception(msg);
    };
    namespace.IndexOutOfRangeException = Nullstone.FinishCreate(IndexOutOfRangeException);
    //#endregion

    //#region XamlParseException
    var XamlParseException = Nullstone.Create("XamlParseException", Exception, 3);
    namespace.XamlParseException = Nullstone.FinishCreate(XamlParseException);
    //#endregion

    //#region PropertyNotImplementedException
    var PropertyNotImplementedException = Nullstone.Create("PropertyNotImplementedException", Exception, 3);
    PropertyNotImplementedException.Instance.Init = function (baseClass, targetClass, propertyName) {
        var msg = "An abstract property '" + baseClass._TypeName + "." + propertyName + "' is not implemented in '" + targetClass._TypeName + "'.";
        this.Init$Exception(msg);

        this.BaseClass = baseClass;
        this.TargetClass = targetClass;
        this.PropertyName = propertyName;
    };
    namespace.PropertyNotImplementedException = Nullstone.FinishCreate(PropertyNotImplementedException);
    //#endregion

    //#region PropertyCollisionException
    var PropertyCollisionException = Nullstone.Create("PropertyCollisionException", Exception, 3);
    PropertyCollisionException.Instance.Init = function (baseClass, targetClass, propertyName) {
        var msg = "The requested property definition '" + targetClass._TypeName + "." + propertyName + "' is already defined on '" + baseClass._TypeName + "'. You must explicitly override this property.";
        this.Init$Exception(msg);

        this.BaseClass = baseClass;
        this.TargetClass = targetClass;
        this.PropertyName = propertyName;
    };
    namespace.PropertyCollisionException = Nullstone.FinishCreate(PropertyCollisionException);
    //#endregion

    //#region ArgumentException
    var ArgumentException = Nullstone.Create("ArgumentException", Exception, 3);
    namespace.ArgumentException = Nullstone.FinishCreate(ArgumentException);
    //#endregion
})(window);