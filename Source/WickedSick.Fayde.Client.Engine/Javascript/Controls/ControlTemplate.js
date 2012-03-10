/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkTemplate.js"/>
/// CODE
/// <reference path="../Core/NameScope.js"/>
/// <reference path="../Markup/JsonParser.js"/>

//#region ControlTemplate
var ControlTemplate = Nullstone.Create("ControlTemplate", FrameworkTemplate, 2);

ControlTemplate.Instance.Init = function (targetType, json) {
    this.Init$super();
    this.SetTargetType(targetType);
    this._TempJson = json;
};

//#region DEPENDENCY PROPERTIES

ControlTemplate.TargetTypeProperty = DependencyProperty.Register("TargetType", function () { return Function; }, ControlTemplate);
ControlTemplate.Instance.GetTargetType = function () {
    return this.GetValue(ControlTemplate.TargetTypeProperty);
};
ControlTemplate.Instance.SetTargetType = function (value) {
    this.SetValue(ControlTemplate.TargetTypeProperty, value);
};

//#endregion

ControlTemplate.Instance._GetVisualTreeWithError = function (templateBindingSource, error) {
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
    this._GetVisualTreeWithError$super(templateBindingSource, error);
};

Nullstone.FinishCreate(ControlTemplate);
//#endregion