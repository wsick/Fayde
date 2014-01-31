/// <reference path="../Runtime/EventArgs.ts" />

module Fayde.Collections {
    export enum NotifyCollectionChangedAction {
        Add = 1,
        Remove = 2,
        Replace = 3,
        Reset = 4,
    }
    Fayde.RegisterEnum(NotifyCollectionChangedAction, "NotifyCollectionChangedAction");

    export class NotifyCollectionChangedEventArgs extends EventArgs {
        Action: NotifyCollectionChangedAction;
        OldStartingIndex: number;
        NewStartingIndex: number;
        OldItems: any[];
        NewItems: any[];

        static Reset(): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            Object.defineProperty(args, "Action", { value: NotifyCollectionChangedAction.Reset, writable: false });
            Object.defineProperty(args, "OldStartingIndex", { value: -1, writable: false });
            Object.defineProperty(args, "NewStartingIndex", { value: -1, writable: false });
            Object.defineProperty(args, "OldItems", { value: null, writable: false });
            Object.defineProperty(args, "NewItems", { value: null, writable: false });
            return args;
        }
        static Replace(newValue: any, oldValue: any, index: number): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            Object.defineProperty(args, "Action", { value: NotifyCollectionChangedAction.Replace, writable: false });
            Object.defineProperty(args, "OldStartingIndex", { value: -1, writable: false });
            Object.defineProperty(args, "NewStartingIndex", { value: index, writable: false });
            Object.defineProperty(args, "OldItems", { value: [oldValue], writable: false });
            Object.defineProperty(args, "NewItems", { value: [newValue], writable: false });
            return args;
        }
        static Add(newValue: any, index: number): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            Object.defineProperty(args, "Action", { value: NotifyCollectionChangedAction.Add, writable: false });
            Object.defineProperty(args, "OldStartingIndex", { value: -1, writable: false });
            Object.defineProperty(args, "NewStartingIndex", { value: index, writable: false });
            Object.defineProperty(args, "OldItems", { value: null, writable: false });
            Object.defineProperty(args, "NewItems", { value: [newValue], writable: false });
            return args;
        }
        static AddRange(newValues: any[], index: number): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            Object.defineProperty(args, "Action", { value: NotifyCollectionChangedAction.Add, writable: false });
            Object.defineProperty(args, "OldStartingIndex", { value: -1, writable: false });
            Object.defineProperty(args, "NewStartingIndex", { value: index, writable: false });
            Object.defineProperty(args, "OldItems", { value: null, writable: false });
            Object.defineProperty(args, "NewItems", { value: newValues, writable: false });
            return args;
        }
        static Remove(oldValue: any, index: number): NotifyCollectionChangedEventArgs {
            var args = new NotifyCollectionChangedEventArgs();
            Object.defineProperty(args, "Action", { value: NotifyCollectionChangedAction.Remove, writable: false });
            Object.defineProperty(args, "OldStartingIndex", { value: index, writable: false });
            Object.defineProperty(args, "NewStartingIndex", { value: -1, writable: false });
            Object.defineProperty(args, "OldItems", { value: [oldValue], writable: false });
            Object.defineProperty(args, "NewItems", { value: null, writable: false });
            return args;
        }
    }
}