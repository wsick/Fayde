/// <reference path="../DependencyObject.js"/>
/// CODE

(function (namespace) {
    var KeyboardNavigation = Nullstone.Create("KeyboardNavigation", DependencyObject);

    KeyboardNavigation.AcceptsReturnProperty = DependencyProperty.RegisterAttached("AcceptsReturn", function () { return Boolean; }, KeyboardNavigation);
    KeyboardNavigation.GetAcceptsReturn = function (d) {
        ///<returns type="Boolean"></returns>
        return d.GetValue(KeyboardNavigation.AcceptsReturnProperty);
    };
    KeyboardNavigation.SetAcceptsReturn = function (d, value) {
        ///<param name="value" type="Boolean"></param>
        d.SetValue(KeyboardNavigation.AcceptsReturnProperty, value);
    };

    KeyboardNavigation.ControlTabNavigationProperty = DependencyProperty.RegisterAttached("ControlTabNavigation", function () { return new Enum(KeyboardNavigationMode); }, KeyboardNavigation);
    KeyboardNavigation.GetControlTabNavigation = function (d) {
        ///<returns type="new Enum(KeyboardNavigationMode)"></returns>
        return d.GetValue(KeyboardNavigation.ControlTabNavigationProperty);
    };
    KeyboardNavigation.SetControlTabNavigation = function (d, value) {
        ///<param name="value" type="new Enum(KeyboardNavigationMode)"></param>
        d.SetValue(KeyboardNavigation.ControlTabNavigationProperty, value);
    };

    KeyboardNavigation.DirectionalNavigationProperty = DependencyProperty.RegisterAttached("DirectionalNavigation", function () { return new Enum(KeyboardNavigationMode); }, KeyboardNavigation);
    KeyboardNavigation.GetDirectionalNavigation = function (d) {
        ///<returns type="new Enum(KeyboardNavigationMode)"></returns>
        return d.GetValue(KeyboardNavigation.DirectionalNavigationProperty);
    };
    KeyboardNavigation.SetDirectionalNavigation = function (d, value) {
        ///<param name="value" type="new Enum(KeyboardNavigationMode)"></param>
        d.SetValue(KeyboardNavigation.DirectionalNavigationProperty, value);
    };

    KeyboardNavigation.IsTabStopProperty = DependencyProperty.RegisterAttached("IsTabStop", function () { return Boolean; }, KeyboardNavigation);
    KeyboardNavigation.GetIsTabStop = function (d) {
        ///<returns type="Boolean"></returns>
        return d.GetValue(KeyboardNavigation.IsTabStopProperty);
    };
    KeyboardNavigation.SetIsTabStop = function (d, value) {
        ///<param name="value" type="Boolean"></param>
        d.SetValue(KeyboardNavigation.IsTabStopProperty, value);
    };

    KeyboardNavigation.TabIndexProperty = DependencyProperty.RegisterAttached("TabIndex", function () { return Number; }, KeyboardNavigation);
    KeyboardNavigation.GetTabIndex = function (d) {
        ///<returns type="Number"></returns>
        return d.GetValue(KeyboardNavigation.TabIndexProperty);
    };
    KeyboardNavigation.SetTabIndex = function (d, value) {
        ///<param name="value" type="Number"></param>
        d.SetValue(KeyboardNavigation.TabIndexProperty, value);
    };

    KeyboardNavigation.TabNavigationProperty = DependencyProperty.RegisterAttached("TabNavigation", function () { return new Enum(KeyboardNavigationMode); }, KeyboardNavigation);
    KeyboardNavigation.GetTabNavigation = function (d) {
        ///<returns type="new Enum(KeyboardNavigationMode)"></returns>
        return d.GetValue(KeyboardNavigation.TabNavigationProperty);
    };
    KeyboardNavigation.SetTabNavigation = function (d, value) {
        ///<param name="value" type="new Enum(KeyboardNavigationMode)"></param>
        d.SetValue(KeyboardNavigation.TabNavigationProperty, value);
    };

    namespace.KeyboardNavigation = Nullstone.FinishCreate(KeyboardNavigation);
})(window);