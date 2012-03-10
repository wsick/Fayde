/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Runtime/EventArgs.js"/>
/// CODE

//#region PropertyChangedEventArgs

function PropertyChangedEventArgs() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(PropertyChangedEventArgs, "PropertyChangedEventArgs", EventArgs);

PropertyChangedEventArgs.prototype.GetPropertyName = function () {
    /// <returns type="String" />
    return this._PropertyName;
};
PropertyChangedEventArgs.prototype.SetPropertyName = function (value) {
    /// <param name="value" type="String"></param>
    this._PropertyName = value;
};

//#endregion
