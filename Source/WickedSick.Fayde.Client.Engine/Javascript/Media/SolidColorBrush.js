/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE
/// <reference path="../Primitives/Color.js"/>

//#region SolidColorBrush

function SolidColorBrush() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    if (arguments.length === 1) {
        if (arguments[0] instanceof Color)
            this.SetColor(arguments[0]);
    }
}
Nullstone.Extend(SolidColorBrush, "SolidColorBrush", Brush);

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
    var color = this.GetColor();
    if (color == null)
        return "#000000";
    return color.toString();
};

//#endregion
