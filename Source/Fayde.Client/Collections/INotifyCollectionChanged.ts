/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Collections {
    export interface INotifyCollectionChanged {
        CollectionChanged: MulticastEvent<NotifyCollectionChangedEventArgs>;
    }
    export var INotifyCollectionChanged_ = Fayde.RegisterInterface<INotifyCollectionChanged>("INotifyCollectionChanged");
}