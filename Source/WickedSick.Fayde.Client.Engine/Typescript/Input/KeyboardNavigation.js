var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// CODE
    (function (Input) {
        var KeyboardNavigation = (function () {
            function KeyboardNavigation() { }
            KeyboardNavigation.AcceptsReturnProperty = DependencyProperty.RegisterAttached("AcceptsReturn", function () {
                return Boolean;
            }, KeyboardNavigation);
            KeyboardNavigation.GetAcceptsReturn = function GetAcceptsReturn(d) {
                return d.GetValue(KeyboardNavigation.AcceptsReturnProperty);
            };
            KeyboardNavigation.SetAcceptsReturn = function SetAcceptsReturn(d, value) {
                d.SetValue(KeyboardNavigation.AcceptsReturnProperty, value);
            };
            KeyboardNavigation.ControlTabNavigationProperty = DependencyProperty.RegisterAttached("ControlTabNavigation", function () {
                return new Enum(Input.KeyboardNavigationMode);
            }, KeyboardNavigation);
            KeyboardNavigation.GetControlTabNavigation = function GetControlTabNavigation(d) {
                return d.GetValue(KeyboardNavigation.ControlTabNavigationProperty);
            };
            KeyboardNavigation.SetControlTabNavigation = function SetControlTabNavigation(d, value) {
                d.SetValue(KeyboardNavigation.ControlTabNavigationProperty, value);
            };
            KeyboardNavigation.DirectionalNavigationProperty = DependencyProperty.RegisterAttached("DirectionalNavigation", function () {
                return new Enum(Input.KeyboardNavigationMode);
            }, KeyboardNavigation);
            KeyboardNavigation.GetDirectionalNavigation = function GetDirectionalNavigation(d) {
                return d.GetValue(KeyboardNavigation.DirectionalNavigationProperty);
            };
            KeyboardNavigation.SetDirectionalNavigation = function SetDirectionalNavigation(d, value) {
                d.SetValue(KeyboardNavigation.DirectionalNavigationProperty, value);
            };
            KeyboardNavigation.IsTabStopProperty = DependencyProperty.RegisterAttached("IsTabStop", function () {
                return Boolean;
            }, KeyboardNavigation);
            KeyboardNavigation.GetIsTabStop = function GetIsTabStop(d) {
                return d.GetValue(KeyboardNavigation.IsTabStopProperty);
            };
            KeyboardNavigation.SetIsTabStop = function SetIsTabStop(d, value) {
                d.SetValue(KeyboardNavigation.IsTabStopProperty, value);
            };
            KeyboardNavigation.TabIndexProperty = DependencyProperty.RegisterAttached("TabIndex", function () {
                return Number;
            }, KeyboardNavigation);
            KeyboardNavigation.GetTabIndex = function GetTabIndex(d) {
                return d.GetValue(KeyboardNavigation.TabIndexProperty);
            };
            KeyboardNavigation.SetTabIndex = function SetTabIndex(d, value) {
                d.SetValue(KeyboardNavigation.TabIndexProperty, value);
            };
            KeyboardNavigation.TabNavigationProperty = DependencyProperty.RegisterAttached("TabNavigation", function () {
                return new Enum(Input.KeyboardNavigationMode);
            }, KeyboardNavigation);
            KeyboardNavigation.GetTabNavigation = function GetTabNavigation(d) {
                return d.GetValue(KeyboardNavigation.TabNavigationProperty);
            };
            KeyboardNavigation.SetTabNavigation = function SetTabNavigation(d, value) {
                d.SetValue(KeyboardNavigation.TabNavigationProperty, value);
            };
            return KeyboardNavigation;
        })();
        Input.KeyboardNavigation = KeyboardNavigation;        
        Nullstone.RegisterType(KeyboardNavigation, "KeyboardNavigation");
    })(Fayde.Input || (Fayde.Input = {}));
    var Input = Fayde.Input;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=KeyboardNavigation.js.map
