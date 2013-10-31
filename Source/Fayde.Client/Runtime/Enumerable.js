/// <reference path="../Runtime/TypeManagement.ts" />
var Fayde;
(function (Fayde) {
    Fayde.IEnumerable_ = Fayde.RegisterInterface("IEnumerable");

    Fayde.IEnumerator_ = Fayde.RegisterInterface("IEnumerator");

    var ArrayEx = (function () {
        function ArrayEx() {
        }
        ArrayEx.AsEnumerable = function (arr) {
            return arr;
        };
        ArrayEx.GetEnumerator = function (arr, isReverse) {
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
        };
        ArrayEx.GetNodeEnumerator = function (arr, isReverse) {
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
        };

        ArrayEx.RemoveIfContains = function (arr, item) {
            var index = arr.indexOf(item);
            if (index < 0)
                return false;
            arr.splice(index, 1);
            return true;
        };

        ArrayEx.Except = function (arr1, arr2) {
            var cur;
            var rarr = [];
            for (var i = 0; i < arr1.length; i++) {
                cur = arr1[i];
                if (arr2.indexOf(cur) < 0)
                    rarr.push(cur);
            }
            return rarr;
        };

        ArrayEx.Fill = function (arr, index, count, fill) {
            for (var i = index; i < index + count; i++) {
                arr.splice(i, 0, fill);
            }
        };
        ArrayEx.EmptyEnumerator = {
            MoveNext: function () {
                return false;
            },
            Current: undefined
        };
        return ArrayEx;
    })();
    Fayde.ArrayEx = ArrayEx;
})(Fayde || (Fayde = {}));

Object.defineProperty(Array.prototype, "GetEnumerator", {
    value: function (isReverse) {
        return Fayde.ArrayEx.GetEnumerator(this, isReverse);
    },
    enumerable: false
});
//# sourceMappingURL=Enumerable.js.map
