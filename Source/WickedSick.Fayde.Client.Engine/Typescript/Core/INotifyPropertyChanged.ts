/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />

module Fayde {
    export interface INotifyPropertyChanged {
        PropertyChanged: MulticastEvent;
    }
    export var INotifyPropertyChanged_ = Nullstone.RegisterInterface("INotifyPropertyChanged");
}