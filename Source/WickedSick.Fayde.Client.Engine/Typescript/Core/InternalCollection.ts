/// CODE
/// <reference path="../Runtime/IEnumerator.ts" />

module Fayde {
    export class InternalCollection {
        private _ht = [];
        GetCount(): number {
            return this._ht.length;
        }
        GetValueAt(index: number): any {
            return this._ht[index];
        }
        GetEnumerator(): IEnumerator {
            var col = this;
            var len = col.GetCount();
            if (len < 1)
                return;
            var index = -1;
            var e = { MoveNext: undefined, Current: undefined };
            e.MoveNext = function () {
                index++;
                if (index >= len)
                    return false;
                e.Current = col.GetValueAt(index);
                return true;
            };
            return e;
        }
    }
}