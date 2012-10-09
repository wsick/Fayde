/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

//#region Run
var Run = Nullstone.Create("Run", Inline);

//#region Dependency Properties

Run.FlowDirectionProperty = DependencyProperty.RegisterInheritable("FlowDirection", function () { return new Enum(FlowDirection); }, Run, FlowDirection.LeftToRight);
Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);

Nullstone.AutoProperties(Run, [
    Run.FlowDirectionProperty,
    Run.TextProperty
]);

//#endregion

Run.Instance._SerializeText = function () {
    /// <returns type="String" />
    return this.Text;
};

Nullstone.FinishCreate(Run);
//#endregion