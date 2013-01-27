/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="../Core/UIElement.js"/>
/// CODE

(function (namespace) {
    var ToolTipService = Nullstone.Create("ToolTipService");

    ToolTipService.ToolTipProperty = DependencyProperty.RegisterAttached("ToolTip", function () { return Fayde.DependencyObject; }, ToolTipService);
    ToolTipService.PlacementTargetProperty = DependencyProperty.RegisterAttached("PlacementTarget", function () { return Fayde.UIElement; }, ToolTipService);

    namespace.ToolTipService = Nullstone.FinishCreate(ToolTipService);
})(Nullstone.Namespace("Fayde.Controls"));