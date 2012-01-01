/// <reference path="FrameworkTemplate.js"/>

ControlTemplate.prototype = new FrameworkTemplate;
ControlTemplate.prototype.constructor = ControlTemplate;
function ControlTemplate() {
    FrameworkTemplate.call(this);
}