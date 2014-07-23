/// <reference path="../Runtime/EventArgs.ts" />

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