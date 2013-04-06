/// CODE
/// <reference path="../Runtime/IEnumerator.ts" />
var Fayde;
(function (Fayde) {
    var InternalCollection = (function () {
        function InternalCollection() {
            this._ht = [];
        }
        InternalCollection.prototype.GetCount = function () {
            return this._ht.length;
        };
        InternalCollection.prototype.GetValueAt = function (index) {
            return this._ht[index];
        };
        InternalCollection.prototype.GetEnumerator = function () {
            var col = this;
            var len = col.GetCount();
            if(len < 1) {
                return;
            }
            var index = -1;
            var e = {
                MoveNext: undefined,
                Current: undefined
            };
            e.MoveNext = function () {
                index++;
                if(index >= len) {
                    return false;
                }
                e.Current = col.GetValueAt(index);
                return true;
            };
            return e;
        };
        return InternalCollection;
    })();
    Fayde.InternalCollection = InternalCollection;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=InternalCollection.js.map
