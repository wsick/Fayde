/// <reference path="DependencyObject.js"/>

FrameworkTemplate.prototype = new DependencyObject;
FrameworkTemplate.prototype.constructor = FrameworkTemplate;
function FrameworkTemplate() {
    DependencyObject.call(this);
}

FrameworkTemplate.prototype.GetVisualTree = function (bindingSource) {
    NotImplemented("FrameworkTemplate.GetVisualTree");
};