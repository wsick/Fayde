/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Data {
    export interface ICollectionView extends IEnumerable<any> {
        CurrentChanged: MulticastEvent<EventArgs>;
        CurrentItem: any;
        MoveCurrentTo(item: any): boolean;
    }
    export var ICollectionView_ = Fayde.RegisterInterface("ICollectionView");
}