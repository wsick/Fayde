/// <reference path="../Core/DependencyObject.ts" />
/// CODE

module Fayde.Input {
    export class KeyboardNavigation {
        static AcceptsReturnProperty: DependencyProperty = DependencyProperty.RegisterAttached("AcceptsReturn", () => Boolean, KeyboardNavigation);
        static GetAcceptsReturn(d: DependencyObject): bool { return d.GetValue(AcceptsReturnProperty); }
        static SetAcceptsReturn(d: DependencyObject, value: bool) { d.SetValue(AcceptsReturnProperty, value); }

        static ControlTabNavigationProperty: DependencyProperty = DependencyProperty.RegisterAttached("ControlTabNavigation", () => new Enum(KeyboardNavigationMode), KeyboardNavigation);
        static GetControlTabNavigation(d: DependencyObject): KeyboardNavigationMode { return d.GetValue(ControlTabNavigationProperty); }
        static SetControlTabNavigation(d: DependencyObject, value: KeyboardNavigationMode) { d.SetValue(ControlTabNavigationProperty, value); }

        static DirectionalNavigationProperty: DependencyProperty = DependencyProperty.RegisterAttached("DirectionalNavigation", () => new Enum(KeyboardNavigationMode), KeyboardNavigation);
        static GetDirectionalNavigation(d: DependencyObject): KeyboardNavigationMode { return d.GetValue(DirectionalNavigationProperty); }
        static SetDirectionalNavigation(d: DependencyObject, value: KeyboardNavigationMode) { d.SetValue(DirectionalNavigationProperty, value); }

        static IsTabStopProperty: DependencyProperty = DependencyProperty.RegisterAttached("IsTabStop", () => Boolean, KeyboardNavigation);
        static GetIsTabStop(d: DependencyObject): bool { return d.GetValue(IsTabStopProperty); }
        static SetIsTabStop(d: DependencyObject, value: bool) { d.SetValue(IsTabStopProperty, value); }

        static TabIndexProperty: DependencyProperty = DependencyProperty.RegisterAttached("TabIndex", () => Number, KeyboardNavigation);
        static GetTabIndex(d: DependencyObject): number { return d.GetValue(TabIndexProperty); }
        static SetTabIndex(d: DependencyObject, value: number) { d.SetValue(TabIndexProperty, value); }

        static TabNavigationProperty: DependencyProperty = DependencyProperty.RegisterAttached("TabNavigation", () => new Enum(KeyboardNavigationMode), KeyboardNavigation);
        static GetTabNavigation(d: DependencyObject): KeyboardNavigationMode { return d.GetValue(TabNavigationProperty); }
        static SetTabNavigation(d: DependencyObject, value: KeyboardNavigationMode) { d.SetValue(TabNavigationProperty, value); }
    }
    Nullstone.RegisterType(KeyboardNavigation, "KeyboardNavigation");
}