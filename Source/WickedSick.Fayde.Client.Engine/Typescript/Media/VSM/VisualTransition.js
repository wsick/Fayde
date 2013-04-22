var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/DependencyObject.ts" />
        /// CODE
        (function (VSM) {
            var VisualTransition = (function () {
                function VisualTransition() {
                    this.IsDefault = false;
                }
                return VisualTransition;
            })();
            VSM.VisualTransition = VisualTransition;            
        })(Media.VSM || (Media.VSM = {}));
        var VSM = Media.VSM;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=VisualTransition.js.map
