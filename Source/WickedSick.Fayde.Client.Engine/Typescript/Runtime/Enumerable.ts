/// <reference path="Nullstone.ts" />
/// CODE

module Fayde {
    export interface IEnumerable {
        GetEnumerator(reverse?: bool): IEnumerator;
    }
    export var IEnumerable_ = Nullstone.RegisterInterface("IEnumerable");

    export interface IEnumerator {
        Current: any;
        MoveNext(): bool;
    }
    export var IEnumerator_ = Nullstone.RegisterInterface("IEnumerator");

    export class ArrayEx {
        static EmptyEnumerator = {
            MoveNext: function () { return false; },
            Current: undefined
        };
        static AsEnumerable(arr: any[]): IEnumerable {
            return <IEnumerable><any>arr;
        }
        static GetEnumerator(arr: any[], isReverse?: bool): IEnumerator {
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
        static GetNodeEnumerator(arr: XamlObject[], isReverse?: bool): IEnumerator {
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
        static RemoveIfContains(arr: any[], item: any): bool {
            var index = arr.indexOf(item);
            if (index < 0)
                return false;
            arr.splice(index, 1);
            return true;
        }

        static Except(arr1: any[], arr2: any[]): any[] {
            var cur: any;
            var rarr: any[] = [];
            for (var i = 0; i < arr1.length; i++) {
                cur = arr1[i];
                if (arr2.indexOf(cur) < 0)
                    rarr.push(cur);
            }
            return rarr;
        }

        static Fill(arr: any[], index: number, count: number, fill: any) {
            for (var i = index; i < index + count; i++) {
                arr.splice(i, 0, fill);
            }
        }
    }
}

Object.defineProperty(Array.prototype, "GetEnumerator", {
    value: function (isReverse?: bool): Fayde.IEnumerator {
        return Fayde.ArrayEx.GetEnumerator(this, isReverse);
    },
    enumerable: false
});