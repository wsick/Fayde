/// <reference path="../Runtime/TypeManagement.ts" />
/// <reference path="../Runtime/EventArgs.ts" />

module Fayde {
    export class PropertyChangedEventArgs extends EventArgs {
        PropertyName: string;
        constructor(propertyName: string) {
            super();
            Object.defineProperty(this, "PropertyName", { value: propertyName, writable: false });
        }
    }
    Fayde.RegisterType(PropertyChangedEventArgs, "Fayde", Fayde.XMLNS);

    export interface INotifyPropertyChanged {
        PropertyChanged: MulticastEvent<PropertyChangedEventArgs>;
    }
    export var INotifyPropertyChanged_ = Fayde.RegisterInterface<INotifyPropertyChanged>("INotifyPropertyChanged");
}