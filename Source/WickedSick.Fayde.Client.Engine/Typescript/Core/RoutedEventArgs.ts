/// <reference path="../Runtime/EventArgs.ts" />
/// CODE

module Fayde {
    export class RoutedEventArgs extends EventArgs {
        Handled: boolean = false;
        Source: any = null;
        OriginalSource: any = null;
    }
    Nullstone.RegisterType(RoutedEventArgs, "RoutedEventArgs");
}