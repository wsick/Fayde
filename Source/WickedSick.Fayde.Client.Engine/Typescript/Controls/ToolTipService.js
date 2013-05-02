var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// <reference path="../Core/DependencyObject.ts" />
    /// CODE
    /// <reference path="../Core/UIElement.ts" />
    (function (Controls) {
        var ToolTipService = (function () {
            function ToolTipService() { }
            ToolTipService.ToolTipProperty = DependencyProperty.RegisterAttached("ToolTip", function () {
                return Fayde.DependencyObject;
            }, ToolTipService);
            ToolTipService.PlacementTargetProperty = DependencyProperty.RegisterAttached("PlacementTarget", function () {
                return Fayde.UIElement;
            }, ToolTipService);
            return ToolTipService;
        })();
        Controls.ToolTipService = ToolTipService;        
        Nullstone.RegisterType(ToolTipService, "ToolTipService");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ToolTipService.js.map
