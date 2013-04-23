var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// CODE
    /// <reference path="../Runtime/Enum.ts" />
    /// <reference path="Enums.ts" />
    (function (Media) {
        var TextOptions = (function () {
            function TextOptions() { }
            TextOptions.TextHintingModeProperty = DependencyProperty.RegisterAttached("TextHintingMode", function () {
                return new Enum(Media.TextHintingMode);
            }, TextOptions);
            TextOptions.GetTextHintingMode = function GetTextHintingMode(d) {
                return d.GetValue(TextOptions.TextHintingModeProperty);
            };
            TextOptions.SetTextHintingMode = function SetTextHintingMode(d, value) {
                d.SetValue(TextOptions.TextHintingModeProperty, value);
            };
            return TextOptions;
        })();
        Media.TextOptions = TextOptions;        
        Nullstone.RegisterType(TextOptions, "TextOptions");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextOptions.js.map
