/// <reference path="../Runtime/EventArgs.ts" />
/// CODE
/// <reference path="DependencyProperty.ts" />

interface IDependencyPropertyChangedEventArgs {
    Property: DependencyProperty;
    OldValue: any;
    NewValue: any;
}
class DependencyPropertyChangedEventArgs extends EventArgs implements IDependencyPropertyChangedEventArgs {
    Property: DependencyProperty;
    OldValue: any;
    NewValue: any;
}