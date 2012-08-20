/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="../Core/UIElement.js"/>
/// CODE

//#region ToolTipService
var ToolTipService = Nullstone.Create("ToolTipService");

ToolTipService.ToolTipProperty = DependencyProperty.RegisterAttached("ToolTip", function () { return DependencyObject; }, ToolTipService);
ToolTipService.PlacementTargetProperty = DependencyProperty.RegisterAttached("PlacementTarget", function () { return UIElement; }, ToolTipService);

Nullstone.FinishCreate(ToolTipService);
//#endregion