/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Brush.js"/>

//#region SolidColorBrush

function SolidColorBrush(color) {
    Brush.call(this);
    this._Color = color;
}
SolidColorBrush.InheritFrom(Brush);

SolidColorBrush.prototype._Translate = function (ctx) {
    return this._Color.toString();
};

//#endregion
