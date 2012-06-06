/// <reference path="Nullstone.js"/>
/// CODE

//#region Exception
var Exception = Nullstone.Create("Exception", undefined, 3);

Exception.Instance.Init = function (message, charPosition, lineNumber) {
    this.Message = message;
    this.CharPosition = charPosition;
    this.LineNumber = lineNumber;
    this.name = this.constructor._TypeName;
};

Exception.Instance.toString = function () {
    return this.constructor._TypeName + ": " + this.Message;
};

Nullstone.FinishCreate(Exception);
//#endregion

//#region InvalidOperationException
var InvalidOperationException = Nullstone.Create("InvalidOperationException", Exception);
Nullstone.FinishCreate(InvalidOperationException);
//#endregion

//#region NotImplementedException
var NotImplementedException = Nullstone.Create("NotImplementedException", Exception, 3);

NotImplementedException.Instance.Init = function (type, parentType, methodName) {
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

Nullstone.FinishCreate(NotImplementedException);
//#endregion

//#region NotSupportedException
var NotSupportedException = Nullstone.Create("NotSupportedException", Exception);
Nullstone.FinishCreate(NotSupportedException);
//#endregion

//#region IndexOutOfRangeException
var IndexOutOfRangeException = Nullstone.Create("IndexOutOfRangeException", Exception, 1);

IndexOutOfRangeException.Instance.Init = function (index) {
    var msg = "Index is out of range: " + index;
    this.Init$Exception(msg);
};

Nullstone.FinishCreate(IndexOutOfRangeException);
//#endregion

//#region XamlParseException
var XamlParseException = Nullstone.Create("XamlParseException", Exception);
Nullstone.FinishCreate(XamlParseException);
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

Nullstone.FinishCreate(PropertyNotImplementedException);
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

Nullstone.FinishCreate(PropertyCollisionException);
//#endregion