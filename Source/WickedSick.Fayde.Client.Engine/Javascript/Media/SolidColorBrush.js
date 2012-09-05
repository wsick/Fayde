/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE
/// <reference path="../Primitives/Color.js"/>

//#region SolidColorBrush
var SolidColorBrush = Nullstone.Create("SolidColorBrush", Brush);

SolidColorBrush.Instance.Init = function (args) {
    this.Init$Brush();
    if (args.length === 1) {
        if (args[0] instanceof Color)
            this.Color = args[0];
    }
};

//#region Properties

SolidColorBrush.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, SolidColorBrush);

Nullstone.AutoProperties(SolidColorBrush, [
    SolidColorBrush.ColorProperty
]);

//#endregion

SolidColorBrush.Instance.CreateBrush = function (ctx, bounds) {
    var color = this.Color;
    if (color == null)
        return "#000000";
    return color.toString();
};

Nullstone.FinishCreate(SolidColorBrush);
//#endregion