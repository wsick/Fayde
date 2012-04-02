/// <reference path="Exception.js"/>
/// CODE

//#region NotImplementedException
var NotImplementedException = Nullstone.Create("NotImplementedException", Exception, 2);

NotImplementedException.Instance.Init = function (type, parentType, methodName) {
    this.Type = type;
    this.ParentType = parentType;
    this.MethodName = methodName;
};

NotImplementedException.Instance.toString = function () {
    if (this.MethodName)
        return this.Type._TypeName + " does not implement " + this.ParentType._TypeName + "." + this.MethodName;
    return this.Type._TypeName + " does not implement " + this.ParentType._TypeName;
};

Nullstone.FinishCreate(NotImplementedException);
//#endregion