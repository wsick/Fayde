/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde {
    export interface IEnumerable<T> {
        GetEnumerator(reverse?: boolean): IEnumerator<T>;
    }
    export var IEnumerable_ = Fayde.RegisterInterface<IEnumerable<any>>("IEnumerable");
    IEnumerable_.Is = (o: any): boolean => {
        return o && o.GetEnumerator && typeof o.GetEnumerator === "function";
    };

    export interface IEnumerator<T> {
        Current: T;
        moveNext(): boolean;
    }
    export var IEnumerator_ = Fayde.RegisterInterface<IEnumerator<any>>("IEnumerator");

    export class ArrayEx {
        static EmptyEnumerator: IEnumerator<any> = {
            moveNext: function () { return false; },
            Current: undefined
        };
        static AsEnumerable<T>(arr: T[]): IEnumerable<T> {
            return <IEnumerable<T>><any>arr;
        }
        static GetEnumerator<T>(arr: T[], isReverse?: boolean): IEnumerator<T> {
            var len = arr.length;
            var e = <IEnumerator<T>>{ moveNext: undefined, Current: undefined };
            var index;
            if (isReverse) {
                index = len;
                e.moveNext = function () {
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
                e.moveNext = function () {
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
            var e = <IEnumerator<U>>{ moveNext: undefined, Current: undefined };
            var index;
            if (isReverse) {
                index = len;
                e.moveNext = function () {
                    index--;
                    if (index < 0) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = <U>arr[index].XamlNode;
                    return true;
                };
            } else {
                index = -1;
                e.moveNext = function () {
                    index++;
                    if (index >= len) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = <U>arr[index].XamlNode;
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

    Object.defineProperty(Array.prototype, "GetEnumerator", {
        value: function <T>(isReverse?: boolean): IEnumerator<T> {
            return ArrayEx.GetEnumerator<T>(this, isReverse);
        },
        enumerable: false
    });
}