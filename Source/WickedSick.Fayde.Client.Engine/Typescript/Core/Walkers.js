/// CODE
/// <reference path="Style.ts" />
var Fayde;
(function (Fayde) {
    function setterSort(setter1, setter2) {
        var a = setter1.Property;
        var b = setter2.Property;
        return (a === b) ? 0 : ((a._ID > b._ID) ? 1 : -1);
    }
    function mergeSetters(arr, dps, style) {
        var enumerator = style.Setters.GetEnumerator(true);
        var setter;
        while(enumerator.MoveNext()) {
            setter = enumerator.Current;
            if(!(setter instanceof Fayde.Setter)) {
                continue;
            }
            var propd = setter.Property;
            if(!propd) {
                continue;
            }
            if(dps[propd._ID]) {
                continue;
            }
            dps[propd._ID] = setter;
            arr.push(setter);
        }
    }
    function SingleStyleWalker(style) {
        var dps = [];
        var flattenedSetters = [];
        var cur = style;
        while(cur) {
            mergeSetters(flattenedSetters, dps, cur);
            cur = cur.BasedOn;
        }
        flattenedSetters.sort(setterSort);
        return {
            Step: function () {
                return flattenedSetters.shift();
            }
        };
    }
    Fayde.SingleStyleWalker = SingleStyleWalker;
    function MultipleStylesWalker(styles) {
        var flattenedSetters = [];
        if(styles) {
            var dps = [];
            var stylesSeen = [];
            var len = styles.length;
            for(var i = 0; i < length; i++) {
                var style = styles[i];
                while(style) {
                    if(stylesSeen.indexOf(style) > -1) {
                        continue;
                    }
                    mergeSetters(flattenedSetters, dps, style);
                    stylesSeen.push(style);
                    style = style.BasedOn;
                }
            }
            flattenedSetters.sort(setterSort);
        }
        return {
            Step: function () {
                return flattenedSetters.shift();
            }
        };
    }
    Fayde.MultipleStylesWalker = MultipleStylesWalker;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Walkers.js.map
