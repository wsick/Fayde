/// <reference path="../EventArgs.js"/>
/// CODE

//#region PropertyChangedEventArgs

function PropertyChangedEventArgs() {
    EventArgs.call(this);
}
PropertyChangedEventArgs.InheritFrom(EventArgs);

PropertyChangedEventArgs.prototype.GetPropertyName = function () {
    /// <returns type="String" />
    return this._PropertyName;
};
PropertyChangedEventArgs.prototype.SetPropertyName = function (value) {
    /// <param name="value" type="String"></param>
    this._PropertyName = value;
};

//#endregion