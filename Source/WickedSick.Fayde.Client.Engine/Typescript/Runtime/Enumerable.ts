module Fayde {
    export interface IEnumerable {
        GetEnumerator(): IEnumerator;
    }
    export interface IEnumerator {
        Current: any;
        MoveNext(): bool;
    }
    export class ArrayEx {
        static GetEnumerator(arr: any[], isReverse?: bool) {
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
    }
}