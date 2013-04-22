var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/DependencyObject.ts" />
        /// <reference path="../../Core/XamlObjectCollection.ts" />
        /// CODE
        /// <reference path="../Animation/Storyboard.ts" />
        (function (VSM) {
            var VisualState = (function (_super) {
                __extends(VisualState, _super);
                function VisualState() {
                    _super.apply(this, arguments);

                }
                VisualState.StoryboardProperty = DependencyProperty.Register("Storyboard", function () {
                    return Media.Animation.Storyboard;
                }, VisualState);
                VisualState.Annotations = {
                    ContentProperty: VisualState.StoryboardProperty
                };
                return VisualState;
            })(Fayde.DependencyObject);
            VSM.VisualState = VisualState;            
            Nullstone.RegisterType(VisualState, "VisualState");
            var VisualStateCollection = (function (_super) {
                __extends(VisualStateCollection, _super);
                function VisualStateCollection() {
                    _super.apply(this, arguments);

                }
                return VisualStateCollection;
            })(Fayde.XamlObjectCollection);
            VSM.VisualStateCollection = VisualStateCollection;            
            Nullstone.RegisterType(VisualStateCollection, "VisualStateCollection");
        })(Media.VSM || (Media.VSM = {}));
        var VSM = Media.VSM;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=VisualState.js.map
