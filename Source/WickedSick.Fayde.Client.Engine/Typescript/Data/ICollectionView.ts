/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />

module Fayde.Data {
    export interface ICollectionView {
        CurrentChanged: MulticastEvent;
    }
    export var ICollectionView_ = Nullstone.RegisterInterface("ICollectionView");
}