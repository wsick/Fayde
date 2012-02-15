/// <reference path="Inline.js"/>
/// CODE

//#region Run

function Run() {
    Inline.call(this);
}
Run.InheritFrom(Inline);

//#region DEPENDENCY PROPERTIES

Run.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return Number; }, Run, FlowDirection.LeftToRight);
Run.prototype.GetFlowDirection = function () {
    return this.GetValue(Run.FlowDirectionProperty);
};
Run.prototype.SetFlowDirection = function (value) {
    this.SetValue(Run.FlowDirectionProperty, value);
};

Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);
Run.prototype.GetText = function () {
    /// <returns type="String" />
    return this.GetValue(Run.TextProperty);
};
Run.prototype.SetText = function (value) {
    /// <param name="value" type="String"></param>
    this.SetValue(Run.TextProperty, value);
};

//#endregion

Run.prototype._SerializeText = function (str) {
    /// <returns type="String" />
    var t = this.GetText();
    if (t != null)
        return str.concat(t);
    return str;
};

//#endregion