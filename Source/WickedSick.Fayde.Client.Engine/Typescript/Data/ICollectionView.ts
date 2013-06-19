/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />

module Fayde.Data {
    export interface ICollectionView extends IEnumerable<any> {
        CurrentChanged: MulticastEvent;
        CurrentItem: any;
        MoveCurrentTo(item: any): bool;
    }
    export var ICollectionView_ = Nullstone.RegisterInterface("ICollectionView");
}