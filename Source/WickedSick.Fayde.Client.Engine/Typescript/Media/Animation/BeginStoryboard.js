var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/Triggers.ts" />
        /// CODE
        /// <reference path="Storyboard.ts" />
        (function (Animation) {
            var BeginStoryboard = (function (_super) {
                __extends(BeginStoryboard, _super);
                function BeginStoryboard() {
                    _super.apply(this, arguments);

                }
                BeginStoryboard.StoryboardProperty = DependencyProperty.Register("Storyboard", function () {
                    return Media.Animation.Storyboard;
                }, BeginStoryboard);
                BeginStoryboard.Annotations = {
                    ContentProperty: BeginStoryboard.StoryboardProperty
                };
                BeginStoryboard.prototype.Fire = function () {
                    var sb = this.Storyboard;
                    if(sb) {
                        sb.Begin();
                    }
                };
                return BeginStoryboard;
            })(Fayde.TriggerAction);
            Animation.BeginStoryboard = BeginStoryboard;            
            Nullstone.RegisterType(BeginStoryboard, "BeginStoryboard");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BeginStoryboard.js.map
