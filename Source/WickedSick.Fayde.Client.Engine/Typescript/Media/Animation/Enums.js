var Fayde;
(function (Fayde) {
    (function (Media) {
        (function (Animation) {
            (function (EasingMode) {
                EasingMode._map = [];
                EasingMode.EaseOut = 0;
                EasingMode.EaseIn = 1;
                EasingMode.EaseInOut = 2;
            })(Animation.EasingMode || (Animation.EasingMode = {}));
            var EasingMode = Animation.EasingMode;
            (function (FillBehavior) {
                FillBehavior._map = [];
                FillBehavior.HoldEnd = 0;
                FillBehavior.Stop = 1;
            })(Animation.FillBehavior || (Animation.FillBehavior = {}));
            var FillBehavior = Animation.FillBehavior;
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
