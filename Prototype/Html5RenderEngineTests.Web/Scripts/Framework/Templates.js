/// <reference path="DependencyObject.js"/>

//#region FrameworkTemplate

FrameworkTemplate.prototype = new DependencyObject;
FrameworkTemplate.prototype.constructor = FrameworkTemplate;
function FrameworkTemplate() {
    DependencyObject.call(this);
}

FrameworkTemplate.prototype._GetVisualTreeWithError = function (templateBindingSource, error) {
    NotImplemented("FrameworkTemplate.GetVisualTree");
};

//#endregion

//#region ControlTemplate

ControlTemplate.prototype = new FrameworkTemplate;
ControlTemplate.prototype.constructor = ControlTemplate;
function ControlTemplate() {
    FrameworkTemplate.call(this);
}

ControlTemplate.TargetTypeProperty = DependencyProperty.Register("TargetType", ControlTemplate);
ControlTemplate.prototype.GetTargetType = function () {
    return this.GetValue(ControlTemplate.TargetTypeProperty);
};
ControlTemplate.prototype.SetTargetType = function (value) {
    this.SetValue(ControlTemplate.TargetTypeProperty, value);
};

//#endregion

//#region DataTemplate

DataTemplate.prototype = new FrameworkTemplate;
DataTemplate.prototype.constructor = DataTemplate;
function DataTemplate() {
    FrameworkTemplate.call(this);
}

//#endregion