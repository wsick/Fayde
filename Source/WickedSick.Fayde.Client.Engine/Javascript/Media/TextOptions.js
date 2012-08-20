/// <reference path="../Runtime/Nullstone.js"/>
/// <reference path="Enums.js"/>
/// CODE

//#region TextOptions
var TextOptions = Nullstone.Create("TextOptions");

TextOptions.TextHintingModeProperty = DependencyProperty.RegisterAttached("TextHintingMode", function () { return new Enum(TextHintingMode); }, TextOptions);
TextOptions.GetTextHintingMode = function (d) {
    ///<returns type="TextHintingMode"></returns>
    return d.GetValue(TextOptions.TextHintingModeProperty);
};
TextOptions.SetTextHintingMode = function (d, value) {
    ///<param name="value" type="TextHintingMode"></param>
    d.SetValue(TextOptions.TextHintingModeProperty, value);
};

Nullstone.FinishCreate(TextOptions);
//#endregion