/// <reference path="../Runtime/MulticastEvent.ts" />
/// CODE
/// <reference path="RoutedEventArgs.ts" />

module Fayde {
    export class RoutedEvent<T extends RoutedEventArgs> extends MulticastEvent<T> {
    }
    Nullstone.RegisterType(RoutedEvent, "RoutedEvent");
}