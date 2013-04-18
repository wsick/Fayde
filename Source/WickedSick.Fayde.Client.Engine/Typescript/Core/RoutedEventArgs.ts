/// <reference path="../Runtime/EventArgs.ts" />
/// CODE

module Fayde {
    export class RoutedEventArgs extends EventArgs {
        Handled: bool = false;
        Source: any = null;
    }
    Nullstone.RegisterType(RoutedEventArgs, "RoutedEventArgs");
}