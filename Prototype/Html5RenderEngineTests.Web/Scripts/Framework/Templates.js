/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="JsonParser.js"/>

//#region FrameworkTemplate

function FrameworkTemplate() {
    DependencyObject.call(this);
}
FrameworkTemplate.InheritFrom(DependencyObject);

FrameworkTemplate.prototype._GetVisualTreeWithError = function (/* FrameworkElement */templateBindingSource, error) {
    NotImplemented("FrameworkTemplate._GetVisualTreeWithError");
};
//#endregion

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

ControlTemplate.prototype._GetVisualTreeWithError = function (/* FrameworkElement */templateBindingSource, error) {
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

//#region DataTemplate

function DataTemplate() {
    FrameworkTemplate.call(this);
}
DataTemplate.InheritFrom(FrameworkTemplate);

DataTemplate.CreateTemplateFromJson = function (json) {
    var template = new DataTemplate();
    var namescope = new NameScope();
    var parser = new JsonParser();
    var root = parser.CreateObject(json, namescope);
    NameScope.SetNameScope(root, namescope);
    template._Hijack(root);
    return template;
};

//#endregion