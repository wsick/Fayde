/// <reference path="../Runtime/TypeManagement.ts" />
/// CODE
/// <reference path="../Core/XamlObject.ts" />

module Fayde {
    export interface IEnumerable<T> {
        GetEnumerator(reverse?: boolean): IEnumerator<T>;
    }
    export var IEnumerable_ = Fayde.RegisterInterface("IEnumerable");

    export interface IEnumerator<T> {
        Current: T;
        MoveNext(): boolean;
    }
    export var IEnumerator_ = Fayde.RegisterInterface("IEnumerator");

    export class ArrayEx {
        static EmptyEnumerator: IEnumerator<any> = {
            MoveNext: function () { return false; },
            Current: undefined
        };
        static AsEnumerable<T>(arr: T[]): IEnumerable<T> {
            return <IEnumerable<T>><any>arr;
        }
        static GetEnumerator<T>(arr: T[], isReverse?: boolean): IEnumerator<T> {
            var len = arr.length;
            var e = { MoveNext: undefined, Current: undefined };
            var index;
            if (isReverse) {
                index = len;
                e.MoveNext = function () {
                    index--;
                    if (index < 0) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index];
                    return true;
                };
            } else {
                index = -1;
                e.MoveNext = function () {
                    index++;
                    if (index >= len) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index];
                    return true;
                };
            }
            return e;
        }
        static GetNodeEnumerator<T extends XamlObject, U extends XamlNode>(arr: T[], isReverse?: boolean): IEnumerator<U> {
            var len = arr.length;
            var e = { MoveNext: undefined, Current: undefined };
            var index;
            if (isReverse) {
                index = len;
                e.MoveNext = function () {
                    index--;
                    if (index < 0) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index].XamlNode;
                    return true;
                };
            } else {
                index = -1;
                e.MoveNext = function () {
                    index++;
                    if (index >= len) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index].XamlNode;
                    return true;
                };
            }
            return e;
        }

        static RemoveIfContains<T>(arr: T[], item: T): boolean {
            var index = arr.indexOf(item);
            if (index < 0)
                return false;
            arr.splice(index, 1);
            return true;
        }

        static Except<T>(arr1: T[], arr2: T[]): T[] {
            var cur: T;
            var rarr: T[] = [];
            for (var i = 0; i < arr1.length; i++) {
                cur = arr1[i];
                if (arr2.indexOf(cur) < 0)
                    rarr.push(cur);
            }
            return rarr;
        }

        static Fill<T>(arr: T[], index: number, count: number, fill: T) {
            for (var i = index; i < index + count; i++) {
                arr.splice(i, 0, fill);
            }
        }
    }
}

interface Array<T> {
    GetEnumerator(reverse?: boolean): Fayde.IEnumerator<T>;
}

Object.defineProperty(Array.prototype, "GetEnumerator", {
    value: function <T>(isReverse?: boolean): Fayde.IEnumerator<T> {
        return Fayde.ArrayEx.GetEnumerator<T>(this, isReverse);
    },
    enumerable: false
});