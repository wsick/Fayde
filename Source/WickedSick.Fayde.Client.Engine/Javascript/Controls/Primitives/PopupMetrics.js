/// <reference path="../../Core/FrameworkElementMetrics.js"/>

var Fayde;
(function (Fayde) {
    (function (Controls) {
        PopupMetrics.prototype = new Fayde.FrameworkElementMetrics();
        PopupMetrics.prototype.constructor = PopupMetrics;
        function PopupMetrics() {
            Fayde.FrameworkElementMetrics.call(this);
        }
        PopupMetrics.prototype.ComputeBounds = function (fe) { };
        Controls.PopupMetrics = PopupMetrics;
    })(Fayde.Controls || (Fayde.Controls = {}));
})(Fayde || (Fayde = {}));