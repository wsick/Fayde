/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/EventArgs.js"/>
/// CODE

//#region PropertyChangedEventArgs
var PropertyChangedEventArgs = Nullstone.Create("PropertyChangedEventArgs", EventArgs);

PropertyChangedEventArgs.Instance.GetPropertyName = function () {
    /// <returns type="String" />
    return this._PropertyName;
};
PropertyChangedEventArgs.Instance.SetPropertyName = function (value) {
    /// <param name="value" type="String"></param>
    this._PropertyName = value;
};

Nullstone.FinishCreate(PropertyChangedEventArgs);
//#endregion