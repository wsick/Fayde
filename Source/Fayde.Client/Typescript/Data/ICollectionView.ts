/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />

module Fayde.Data {
    export interface ICollectionView extends IEnumerable<any> {
        CurrentChanged: MulticastEvent<EventArgs>;
        CurrentItem: any;
        MoveCurrentTo(item: any): boolean;
    }
    export var ICollectionView_ = Nullstone.RegisterInterface("ICollectionView");
}