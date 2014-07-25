/// <reference path="TypeManagement.ts" />

module Fayde {
    export interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
    }
    export var IEnumerable_ = Fayde.RegisterInterface<IEnumerable<any>>("IEnumerable");
    IEnumerable_.Is = (o: any): boolean => {
        return o && o.getEnumerator && typeof o.getEnumerator === "function";
    };

    export interface IEnumerator<T> {
        current: T;
        moveNext(): boolean;
    }
    export var IEnumerator_ = Fayde.RegisterInterface<IEnumerator<any>>("IEnumerator");

    export class ArrayEx {
        static EmptyEnumerator: IEnumerator<any> = {
            moveNext: function () { return false; },
            current: undefined
        };
        static GetEnumerator<T>(arr: T[], isReverse?: boolean): IEnumerator<T> {
            var len = arr.length;
            var e = <IEnumerator<T>>{ moveNext: undefined, current: undefined };
            var index;
            if (isReverse) {
                index = len;
                e.moveNext = function () {
                    index--;
                    if (index < 0) {
                        e.current = undefined;
                        return false;
                    }
                    e.current = arr[index];
                    return true;
                };
            } else {
                index = -1;
                e.moveNext = function () {
                    index++;
                    if (index >= len) {
                        e.current = undefined;
                        return false;
                    }
                    e.current = arr[index];
                    return true;
                };
            }
            return e;
        }
        static GetNodeEnumerator<T extends XamlObject, U extends XamlNode>(arr: T[], isReverse?: boolean): IEnumerator<U> {
            var len = arr.length;
            var e = <IEnumerator<U>>{ moveNext: undefined, current: undefined };
            var index;
            if (isReverse) {
                index = len;
                e.moveNext = function () {
                    index--;
                    if (index < 0) {
                        e.current = undefined;
                        return false;
                    }
                    e.current = <U>arr[index].XamlNode;
                    return true;
                };
            } else {
                index = -1;
                e.moveNext = function () {
                    index++;
                    if (index >= len) {
                        e.current = undefined;
                        return false;
                    }
                    e.current = <U>arr[index].XamlNode;
                    return true;
                };
            }
            return e;
        }
    }
}