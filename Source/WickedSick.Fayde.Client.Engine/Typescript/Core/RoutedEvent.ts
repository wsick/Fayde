/// <reference path="../Runtime/MulticastEvent.ts" />
/// CODE
/// <reference path="RoutedEventArgs.ts" />

module Fayde {
    export class RoutedEvent extends MulticastEvent {
    }
    Nullstone.RegisterType(RoutedEvent, "RoutedEvent");
}