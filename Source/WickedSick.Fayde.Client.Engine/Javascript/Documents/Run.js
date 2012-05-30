/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

//#region Run
var Run = Nullstone.Create("Run", Inline);

//#region Dependency Properties

Run.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return new Enum(FlowDirection); }, Run, FlowDirection.LeftToRight);
Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);

Nullstone.AutoProperties(Run, [
    Run.FlowDirectionProperty,
    Run.TextProperty
]);

//#endregion

Run.Instance._SerializeText = function (str) {
    /// <returns type="String" />
    var t = this.Text;
    if (t != null)
        return str.concat(t);
    return str;
};

Nullstone.FinishCreate(Run);
//#endregion