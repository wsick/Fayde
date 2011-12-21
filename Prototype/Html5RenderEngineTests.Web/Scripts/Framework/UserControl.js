/// <reference path="Control.js"/>

UserControl.prototype = new Control();
UserControl.prototype.constructor = UserControl;
function UserControl() {
    Control.call(this);
}