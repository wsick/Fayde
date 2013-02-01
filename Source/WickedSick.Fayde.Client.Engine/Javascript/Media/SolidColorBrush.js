/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE
/// <reference path="../Primitives/Color.js"/>

(function (namespace) {
    var SolidColorBrush = Nullstone.Create("SolidColorBrush", namespace.Brush);

    SolidColorBrush.Instance.Init = function (args) {
        this.Init$Brush();
        if (args.length === 1) {
            if (args[0] instanceof Color)
                this.Color = args[0];
        }
    };

    //#region Properties

    SolidColorBrush.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, SolidColorBrush, undefined, function (d, args) { d._InvalidateSurfaceCache(); });

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

    namespace.SolidColorBrush = Nullstone.FinishCreate(SolidColorBrush);
})(Nullstone.Namespace("Fayde.Media"));