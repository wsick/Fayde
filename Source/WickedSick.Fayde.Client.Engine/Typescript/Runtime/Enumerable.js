/// <reference path="Nullstone.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    Fayde.IEnumerable_ = Nullstone.RegisterInterface("IEnumerable");
    Fayde.IEnumerator_ = Nullstone.RegisterInterface("IEnumerator");
    var ArrayEx = (function () {
        function ArrayEx() { }
        ArrayEx.EmptyEnumerator = {
            MoveNext: function () {
                return false;
            },
            Current: undefined
        };
        ArrayEx.GetEnumerator = function GetEnumerator(arr, isReverse) {
            var len = arr.length;
            var e = {
                MoveNext: undefined,
                Current: undefined
            };
            var index;
            if(isReverse) {
                index = len;
                e.MoveNext = function () {
                    index--;
                    if(index < 0) {
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
                    if(index >= len) {
                        e.Current = undefined;
                        return false;
                    }
                    e.Current = arr[index];
                    return true;
                };
            }
            return e;
        };
        return ArrayEx;
    })();
    Fayde.ArrayEx = ArrayEx;    
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enumerable.js.map
