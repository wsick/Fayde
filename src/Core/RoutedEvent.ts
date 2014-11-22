module Fayde {
    export class RoutedEvent<T extends RoutedEventArgs> extends nullstone.Event<T> {
    }
    Fayde.RegisterType(RoutedEvent, Fayde.XMLNS);
}