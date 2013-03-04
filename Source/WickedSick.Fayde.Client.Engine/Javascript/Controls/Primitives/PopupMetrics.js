/// <reference path="../../Core/FrameworkElementMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Controls) {
        PopupMetrics.prototype = new Fayde.FrameworkElementMetrics();
        PopupMetrics.prototype.constructor = PopupMetrics;
        function PopupMetrics() {
        }
        PopupMetrics.prototype.ComputeBounds = function (fe, absoluteXform) { };
        Controls.PopupMetrics = PopupMetrics;
    })(Fayde.Controls || (Fayde.Controls = {}));
})(Fayde || (Fayde = {}));