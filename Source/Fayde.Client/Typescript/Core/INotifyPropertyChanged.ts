/// <reference path="../Runtime/TypeManagement.ts" />
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
    Fayde.Register(PropertyChangedEventArgs)
        .Name("PropertyChangedEventArgs");

    export interface INotifyPropertyChanged {
        PropertyChanged: MulticastEvent<PropertyChangedEventArgs>;
    }
    export var INotifyPropertyChanged_ = Fayde.RegisterInterface("INotifyPropertyChanged");
}