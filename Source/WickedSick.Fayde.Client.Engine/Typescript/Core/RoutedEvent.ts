/// <reference path="../Runtime/MulticastEvent.ts" />
/// CODE
/// <reference path="RoutedEventArgs.ts" />

module Fayde {
    export class RoutedEvent extends MulticastEvent {
        Raise(sender: any, args: RoutedEventArgs) {
            //TODO: Implement
        }
    }
    Nullstone.RegisterType(RoutedEvent, "RoutedEvent");
}