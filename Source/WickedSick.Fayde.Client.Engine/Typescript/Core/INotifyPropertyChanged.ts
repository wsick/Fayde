/// <reference path="../Runtime/Nullstone.ts" />
/// <reference path="../Runtime/EventArgs.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />

module Fayde {
    export class PropertyChangedEventArgs extends EventArgs {
        PropertyName: string;
        constructor(propertyName: string) {
            super();
            Object.defineProperty(this, "PropertyName", { value: propertyName, writable: false });
        }
    }
    Nullstone.RegisterType(PropertyChangedEventArgs, "PropertyChangedEventArgs");

    export interface INotifyPropertyChanged {
        PropertyChanged: MulticastEvent;
    }
    export var INotifyPropertyChanged_ = Nullstone.RegisterInterface("INotifyPropertyChanged");
}