/// <reference path="DependencyObject.js"/>
/// <reference path="JsonParser.js"/>

//#region FrameworkTemplate

FrameworkTemplate.prototype = new DependencyObject;
FrameworkTemplate.prototype.constructor = FrameworkTemplate;
function FrameworkTemplate() {
    DependencyObject.call(this);
    this._IsHijacked = false;
}
FrameworkTemplate.GetBaseClass = function () { return DependencyObject; };

FrameworkTemplate.prototype._GetVisualTreeWithError = function (templateBindingSource, error) {
    if (this._IsHijacked) {
        return this._HijackVisual;
    }
    NotImplemented("FrameworkTemplate._GetVisualTreeWithError");
};

FrameworkTemplate.prototype._Hijack = function (root) {
    this._IsHijacked = true;
    this._HijackVisual = root;
};
FrameworkTemplate.prototype._Unhijack = function () {
    this._IsHijacked = false;
    this._HijackVisual = undefined;
};

//#endregion

//#region ControlTemplate

ControlTemplate.prototype = new FrameworkTemplate;
ControlTemplate.prototype.constructor = ControlTemplate;
function ControlTemplate() {
    FrameworkTemplate.call(this);
}
ControlTemplate.GetBaseClass = function () { return FrameworkTemplate; };

ControlTemplate.TargetTypeProperty = DependencyProperty.Register("TargetType", ControlTemplate);
ControlTemplate.prototype.GetTargetType = function () {
    return this.GetValue(ControlTemplate.TargetTypeProperty);
};
ControlTemplate.prototype.SetTargetType = function (value) {
    this.SetValue(ControlTemplate.TargetTypeProperty, value);
};

ControlTemplate.CreateTemplateFromJson = function (json) {
    var template = new ControlTemplate();
    var namescope = new NameScope();
    var root = JsonParser.CreateObject(json, namescope);
    NameScope.SetNameScope(root, namescope);
    template._Hijack(root);
    return template;
};

//#endregion

//#region DataTemplate

DataTemplate.prototype = new FrameworkTemplate;
DataTemplate.prototype.constructor = DataTemplate;
function DataTemplate() {
    FrameworkTemplate.call(this);
}
DataTemplate.GetBaseClass = function () { return FrameworkTemplate; };

DataTemplate.CreateTemplateFromJson = function (json) {
    var template = new DataTemplate();
    var namescope = new NameScope();
    var root = JsonParser.CreateObject(json, namescope);
    NameScope.SetNameScope(root, namescope);
    template._Hijack(root);
    return template;
};

//#endregion