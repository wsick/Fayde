/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Brush.js"/>
/// CODE
/// <reference path="../Primitives/Color.js"/>

//#region SolidColorBrush

function SolidColorBrush() {
    Brush.call(this);
    if (!IsDocumentReady())
        return;
    if (arguments.length === 1) {
        if (arguments[0] instanceof Color)
            this.SetColor(arguments[0]);
    }
}
SolidColorBrush.InheritFrom(Brush);

//#region DEPENDENCY PROPERTIES

SolidColorBrush.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, SolidColorBrush);
SolidColorBrush.prototype.GetColor = function () {
    ///<returns type="Color"></returns>
    return this.GetValue(SolidColorBrush.ColorProperty);
};
SolidColorBrush.prototype.SetColor = function (value) {
    ///<param name="value" type="Color"></param>
    this.SetValue(SolidColorBrush.ColorProperty, value);
};

//#endregion

SolidColorBrush.prototype._Translate = function (ctx) {
    return this._Color.toString();
};

//#endregion
