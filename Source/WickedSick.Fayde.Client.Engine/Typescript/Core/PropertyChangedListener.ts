/// CODE
/// <reference path="DependencyObject.ts" />

module Fayde {
    export function CreatePropertyChangedListener(func: Function, closure: any) {
        return {
            OnPropertyChanged: function (sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) { func.call(closure, sender, args); }
        };
    }
}