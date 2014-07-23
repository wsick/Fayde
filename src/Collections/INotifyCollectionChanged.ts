/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Collections {
    export interface INotifyCollectionChanged {
        CollectionChanged: MulticastEvent<CollectionChangedEventArgs>;
    }
    export var INotifyCollectionChanged_ = Fayde.RegisterInterface<INotifyCollectionChanged>("INotifyCollectionChanged");
    INotifyCollectionChanged_.Is = (o: any): boolean => {
        return o && o.CollectionChanged instanceof MulticastEvent;
    };
}