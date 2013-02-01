/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="Enums.js"/>
/// CODE

(function (namespace) {
    var TextOptions = Nullstone.Create("TextOptions");

    TextOptions.TextHintingModeProperty = DependencyProperty.RegisterAttached("TextHintingMode", function () { return new Enum(namespace.TextHintingMode); }, TextOptions);
    TextOptions.GetTextHintingMode = function (d) {
        ///<returns type="TextHintingMode"></returns>
        return d.GetValue(TextOptions.TextHintingModeProperty);
    };
    TextOptions.SetTextHintingMode = function (d, value) {
        ///<param name="value" type="TextHintingMode"></param>
        d.SetValue(TextOptions.TextHintingModeProperty, value);
    };

    namespace.TextOptions = Nullstone.FinishCreate(TextOptions);
})(Nullstone.Namespace("Fayde.Media"));