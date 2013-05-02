/// <reference path="../Runtime/EventArgs.ts" />
/// CODE

module Fayde.Collections {
    export enum NotifyCollectionChangedAction {
        Add = 1,
        Remove = 2,
        Replace = 3,
        Reset = 4,
    }

    export class NotifyCollectionChangedEventArgs extends EventArgs {
        private _Action: NotifyCollectionChangedAction;
        private _OldStartingIndex: number = -1;
        private _NewStartingIndex: number = -1;
        private _OldItems: any[] = null;
        private _NewItems: any[] = null;

        get Action(): NotifyCollectionChangedAction { return this._Action; }
        get OldStartingIndex() { return this._OldStartingIndex; }
        get NewStartingIndex() { return this._NewStartingIndex; }
        get OldItems(): any[] { return this._OldItems; }
        get NewItems(): any[] { return this._NewItems; }

        static Reset(): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            args._Action = NotifyCollectionChangedAction.Reset;
            return args;
        }
        static Replace(newValue: any, oldValue: any, index: number): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            args._Action = NotifyCollectionChangedAction.Replace;
            args._NewItems = [newValue];
            args._OldItems = [oldValue];
            args._NewStartingIndex = index;
            return args;
        }
        static Add(newValue: any, index: number): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            args._Action = NotifyCollectionChangedAction.Add;
            args._NewItems = [newValue];
            args._NewStartingIndex = index;
            return args;
        }
        static AddRange(newValues: any[], index: number): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            args._Action = NotifyCollectionChangedAction.Add;
            args._NewItems = newValues;
            args._NewStartingIndex = index;
            return args;
        }
        static Remove(oldValue: any, index: number): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            args._Action = NotifyCollectionChangedAction.Remove;
            args._OldItems = [oldValue];
            args._OldStartingIndex = index;
            return args;
        }
    }
}