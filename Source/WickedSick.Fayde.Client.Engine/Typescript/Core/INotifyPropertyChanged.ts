/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="../Runtime/MulticastEvent.ts" />
/// <reference path="../Runtime/EventArgs.ts" />

module Fayde {
    export class PropertyChangedEventArgs extends EventArgs {
        private _PropertyName: string;
        get PropertyName(): string { return this._PropertyName; }

        constructor(propertyName: string) {
            super();
            this._PropertyName = propertyName;
        }
    }
    Nullstone.RegisterType(PropertyChangedEventArgs, "PropertyChangedEventArgs");

    export interface INotifyPropertyChanged {
        PropertyChanged: MulticastEvent;
    }
    export var INotifyPropertyChanged_ = Nullstone.RegisterInterface("INotifyPropertyChanged");
}