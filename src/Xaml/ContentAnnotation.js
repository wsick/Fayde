define(["require", "exports"], function(require, exports) {
    (function (Fayde) {
        (function (Xaml) {
            Xaml.Content = (function () {
                function ca(type, prop) {
                    Annotation(type, "Content", prop, true);
                }
                ca.Get = function (type) {
                    var cur = type;
                    while (cur) {
                        var cp = GetAnnotations(cur, "Content")[0];
                        if (cp)
                            return cp;
                        cur = GetTypeParent(cur);
                    }
                    return undefined;
                };
                return ca;
            })();
        })(Fayde.Xaml || (Fayde.Xaml = {}));
        var Xaml = Fayde.Xaml;
    })(exports.Fayde || (exports.Fayde = {}));
    var Fayde = exports.Fayde;
});
