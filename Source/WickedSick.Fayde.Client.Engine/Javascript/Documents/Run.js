/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

//#region Run
var Run = Nullstone.Create("Run", Inline);

//#region DEPENDENCY PROPERTIES

Run.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return Number; }, Run, FlowDirection.LeftToRight);
Run.Instance.GetFlowDirection = function () {
    return this.GetValue(Run.FlowDirectionProperty);
};
Run.Instance.SetFlowDirection = function (value) {
    this.SetValue(Run.FlowDirectionProperty, value);
};

Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);
Run.Instance.GetText = function () {
    /// <returns type="String" />
    return this.GetValue(Run.TextProperty);
};
Run.Instance.SetText = function (value) {
    /// <param name="value" type="String"></param>
    this.SetValue(Run.TextProperty, value);
};

//#endregion

Run.Instance._SerializeText = function (str) {
    /// <returns type="String" />
    var t = this.GetText();
    if (t != null)
        return str.concat(t);
    return str;
};

Nullstone.FinishCreate(Run);
//#endregion