/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Core/FrameworkTemplate.js"/>
/// CODE
/// <reference path="../Core/NameScope.js"/>
/// <reference path="../Markup/JsonParser.js"/>

//#region ControlTemplate

function ControlTemplate(targetType, json) {
    FrameworkTemplate.call(this);
    this.SetTargetType(targetType);
    this._TempJson = json;
}
ControlTemplate.InheritFrom(FrameworkTemplate);

//#region DEPENDENCY PROPERTIES

ControlTemplate.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, ControlTemplate);
ControlTemplate.prototype.GetTargetType = function () {
    return this.GetValue(ControlTemplate.TargetTypeProperty);
};
ControlTemplate.prototype.SetTargetType = function (value) {
    this.SetValue(ControlTemplate.TargetTypeProperty, value);
};

//#endregion

ControlTemplate.prototype._GetVisualTreeWithError = function (templateBindingSource, error) {
    /// <param name="templateBindingSource" type="FrameworkElement"></param>
    /// <returns type="DependencyObject" />
    if (this._TempJson) {
        var namescope = new NameScope();
        var parser = new JsonParser();
        parser._TemplateBindingSource = templateBindingSource;
        var root = parser.CreateObject(this._TempJson, namescope);
        NameScope.SetNameScope(root, namescope);
        return root;
    }
    FrameworkTemplate.prototype._GetVisualTreeWithError.call(this, templateBindingSource, error);
};

//#endregion
