/// CODE
/// <reference path="UIElement.ts" />
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
            for(var i = 0; i < len; i++) {
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
    function DeepTreeWalker(top, direction) {
        var last = undefined;
        var dir = Fayde.VisualTreeDirection.Logical;
        var walkList = [
            top.XamlNode
        ];
        if(direction) {
            dir = direction;
        }
        return {
            Step: function () {
                if(last) {
                    var enumerator = last.GetVisualTreeEnumerator(dir);
                    var insertIndex = 0;
                    while(enumerator.MoveNext()) {
                        walkList.splice(insertIndex, 0, enumerator.Current);
                        insertIndex++;
                    }
                }
                var next = walkList[0];
                if(!next) {
                    last = undefined;
                    return;
                }
                var curNode;
                return curNode;
            },
            SkipBranch: function () {
                last = undefined;
            }
        };
    }
    Fayde.DeepTreeWalker = DeepTreeWalker;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Walkers.js.map
