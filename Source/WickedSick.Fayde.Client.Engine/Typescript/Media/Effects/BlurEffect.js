var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="Effect.ts" />
        /// CODE
        (function (Effects) {
            var BlurEffect = (function (_super) {
                __extends(BlurEffect, _super);
                function BlurEffect() {
                    _super.apply(this, arguments);

                }
                BlurEffect.RadiusProperty = DependencyProperty.Register("Radius", function () {
                    return Number;
                }, BlurEffect, undefined, function (d, args) {
                    return (d)._EffectChanged(args);
                });
                return BlurEffect;
            })(Effects.Effect);
            Effects.BlurEffect = BlurEffect;            
            Nullstone.RegisterType(BlurEffect, "BlurEffect");
        })(Media.Effects || (Media.Effects = {}));
        var Effects = Media.Effects;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=BlurEffect.js.map
