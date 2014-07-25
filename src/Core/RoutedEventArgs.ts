/// <reference path="../Runtime/EventArgs.ts" />

module Fayde {
    export class RoutedEventArgs extends EventArgs {
        Handled: boolean = false;
        Source: any = null;
        OriginalSource: any = null;
    }
    Fayde.RegisterType(RoutedEventArgs, "Fayde", Fayde.XMLNS);
}