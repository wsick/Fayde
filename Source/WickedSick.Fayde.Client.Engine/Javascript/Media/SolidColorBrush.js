/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE
/// <reference path="../Primitives/Color.js"/>

//#region SolidColorBrush
var SolidColorBrush = Nullstone.Create("SolidColorBrush", Brush);

SolidColorBrush.Instance.Init = function (args) {
    if (args.length === 1) {
        if (args[0] instanceof Color)
            this.SetColor(args[0]);
    }
};

//#region DEPENDENCY PROPERTIES

SolidColorBrush.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, SolidColorBrush);
SolidColorBrush.Instance.GetColor = function () {
    ///<returns type="Color"></returns>
    return this.GetValue(SolidColorBrush.ColorProperty);
};
SolidColorBrush.Instance.SetColor = function (value) {
    ///<param name="value" type="Color"></param>
    this.SetValue(SolidColorBrush.ColorProperty, value);
};

//#endregion

SolidColorBrush.Instance._Translate = function (ctx) {
    var color = this.GetColor();
    if (color == null)
        return "#000000";
    return color.toString();
};

Nullstone.FinishCreate(SolidColorBrush);
//#endregion